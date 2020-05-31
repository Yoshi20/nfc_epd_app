import { Vibration } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';
// import NfcManager, { Ndef, NfcTech, NfcEvents, NfcAdapter, ByteParser } from 'react-native-nfc-manager';

import hs from './heatshrink';

function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}

class ST25DV {
  init = () => {
    NfcManager.start({
      onSessionClosedIOS: () => {
        console.log('ios session closed');
      }
    })
      .then(() => console.log('NfcManager started'))
      .catch(err => console.warn(err));
  }

  cancel = () => {
    NfcManager.unregisterTagEvent().catch(() => 0);
  }

  cleanUpTransceive = () => {
    NfcManager.cancelTechnologyRequest().catch(() => 0);
  }

  requestTechnology = async () => {
    const tech = NfcTech.NfcV; // Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcV;
    return await NfcManager.requestTechnology(tech);
  }

  sendDefaultPw = async () => {
    const resetPassword = [0x02, 0xB3, 0x02, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00];
    return await NfcManager.transceive(resetPassword);
  }

  setEHMode = async (mode) => {
    if (mode > 1) mode = 1;
    const bytes = [0x02, 0xA1, 0x02, 0x02, mode]; // 1=onDemandOnly; 0=EhForcedAfterBoot
    return await NfcManager.transceive(bytes);
  }

  getEHMode = async () => {
    const bytes = [0x02, 0xA0, 0x02, 0x02];
    return await NfcManager.transceive(bytes);
  }

  enableEnergyHarvesting = async (enable) => {
    if (enable > 1) enable = 1;
    const bytes = [0x02, 0xAE, 0x02, 0x02, enable]; // 1=enable; 0=disable
    return await NfcManager.transceive(bytes);
  }

  configureGPO = async (conf) => {
    const configGPO = [0x02, 0xA1, 0x02, 0x00, conf];
    return await NfcManager.transceive(configGPO);
  }

  setGPOLevel = async (level) => {
    const resp = this.configureGPO(0x81); // GPO_EN & RF_USER_EN
    if (resp[0] != 0) console.warn('configGPO failed! Resp: ', resp);
    if (level > 1) level = 1;
    const bytes = [0x02, 0xA9, 0x02, level]; // 1=GPOLow; 0=GPOHigh
    return await NfcManager.transceive(bytes);
  }

  writeSystemRegister = async (addr, byte) => { // addr = '00'... '0F'
    let bytes = [0x02, 0xA1, 0x02]; // ST25DV_REQUEST_HEADER, WRITE_COMMAND
    bytes = bytes.concat(hexToBytes(addr), [byte]);
    return await NfcManager.transceive(bytes);
  }

  readSystemRegister = async (addr) => { // addr = '00'... '0F'
    let bytes = [0x02, 0xA0, 0x02]; // ST25DV_REQUEST_HEADER, READ_COMMAND
    bytes = bytes.concat(hexToBytes(addr));
    return await NfcManager.transceive(bytes);
  }

  writeDynamicRegister = async (addr, byte) => { // addr: '00' = GPO_CTRL_Dyn, '02' = EH_CTRL_Dyn, '0D' = MB_CTRL_Dyn
    let bytes = [0x02, 0xAE, 0x02];
    bytes = bytes.concat(hexToBytes(addr), [byte]);
    return await NfcManager.transceive(bytes);
  }

  readDynamicRegister = async (addr) => { // addr: '00' = GPO_CTRL_Dyn, '02' = EH_CTRL_Dyn, '0D' = MB_CTRL_Dyn
    let bytes = [0x02, 0xAD, 0x02];
    bytes = bytes.concat(hexToBytes(addr));
    return await NfcManager.transceive(bytes);
  }

  writeMemory = async (addr, byteArray) => { // addr: '0000'... '007F'
    let bytes = [0x02, 0x31]; // ST25DV_REQUEST_HEADER, WRITE_COMMAND
    if (byteArray.length > 4) byteArray = byteArray.slice(0, 4);
    bytes = bytes.concat(hexToBytes(addr), byteArray);
    return await NfcManager.transceive(bytes);
  }

  readMemory = async (addr) => { // addr: '0000'... '007F'
    let bytes = [0x02, 0x30]; // ST25DV_REQUEST_HEADER, READ_COMMAND
    bytes = bytes.concat(hexToBytes(addr));
    return await NfcManager.transceive(bytes);
  }

  writeMailboxMessage = async (byteArray) => {
    // if (byteArray.length > 256) byteArray = byteArray.slice(0, 256);
    let bytes = [0x02, 0xAA, 0x02, byteArray.length - 1];
    bytes = bytes.concat(byteArray);
    return await NfcManager.transceive(bytes);
  }

  readMailboxMessage = async () => {
    const bytes = [0x02, 0xAC, 0x02, 0x00, 0x00];
    return await NfcManager.transceive(bytes);
  }

  readMailboxMessageLength = async () => {
    const bytes = [0x02, 0xAB, 0x02];
    return await NfcManager.transceive(bytes);
  }

  registerTransceive = async (cmd, addr, value) => {
    if (cmd === 0) {
      console.warn('missing cmd!');
    } else if (addr === 0) {
      console.warn('missing addr!');
    } else {
      try {
        const tech = NfcTech.NfcV; // Platform.OS === 'ios' ? NfcTech.MifareIOS : NfcTech.NfcV;
        const techResp = await NfcManager.requestTechnology(tech);
        // console.warn(techResp);

        // send default pw to read the tag
        let resp = await this.sendDefaultPw();
        if (resp[0] != 0) console.warn('sendDefaultPw failed! Resp: ', resp);

        if (cmd === 0xA1) {
          const configGPO = [0x02, 0xA1, 0x02, 0x00, 0x81];
          resp = await NfcManager.transceive(configGPO);
          if (resp[0] != 0) console.warn('configGPO failed! Resp: ', resp);
        }

        let bytes = [0x02]; // ST25DV_REQUEST_HEADER
        bytes = bytes.concat(hexToBytes(cmd), hexToBytes(addr), hexToBytes(value));
        // console.warn(bytes);

        if (Platform.OS === 'ios') {
          resp = await NfcManager.sendMifareCommandIOS(bytes);
        } else {
          // resp = await NfcManager.getMaxTransceiveLength(); // console.warn('max transc length: ', resp);
          // resp = await setTimeout(timeout); // console.warn('set timeout resp: ', resp);
          resp = await NfcManager.transceive(bytes);
        }
        if (resp[0] != 0) {
          console.warn('transceive failed! Resp: ', resp);
          this.cleanUpTransceive();
        }
        return resp[1];
      } catch (ex) {
        console.warn('ex', ex);
        this.cleanUpTransceive();
        return null;
      }
    }
  }

  // ----------------------------------------------------

  _cancel = async () => {
    Vibration.vibrate();
    try {
      this.cancel();
      this.cleanUpTransceive();
    } catch (e) {
      console.warn('cleanUpTransceive failed!');
    }
    // this.setState({running: false});
    // this.setState({uploading: false});
    // this.setState({progress: 0});
  }

  uploadImage = async (image, startedCallback, successCallback, errorCallback) => {
    // this.setState({running: true});

    let resp;

    try {
      resp = await this.requestTechnology();
      console.log('requested technology: ', resp);
    } catch (e) {
      console.warn('requestTechnology failed!');
      // if (errorCallback) errorCallback();
      this._cancel();
      return;
    }

    // this.setState({uploading: true});
    if (startedCallback) startedCallback();

    try {
      /* init FTM procedure */

      resp = await this.sendDefaultPw();
      if (resp[0] != 0) console.log('sendDefaultPw failed! Resp: ', resp);

      // resp = await this.setEHMode(1);
      // resp = await this.getEHMode();

      console.log('waiting for VCC_ON...');
      do {
        resp = await this.readDynamicRegister('02'); // '02' = EH_CTRL_Dyn
        console.log('EH_CTRL_Dyn: ', resp);
      } while (!(resp[0] == 0 && (resp[1] & (1 << 3)))); // VCC_ON
      console.log('VCC_ON detected');

      console.log('conf GPO');
      // resp = await this.configureGPO(0xB0);  // GPO_EN & RF_PUT_MSG & RF_GET_MSG
      resp = await this.configureGPO(0x90); // GPO_EN & RF_PUT_MSG
      if (resp[0] != 0) console.warn('configureGPO failed! Resp: ', resp);

      console.log('set MB_WDG');
      resp = await this.writeSystemRegister('0E', 0); // MB_WDG
      if (resp[0] != 0) console.warn('disable MB_WDG failed! Resp: ', resp);

      console.log('waiting for MB_EN...');
      do {
        resp = await this.readDynamicRegister('0D'); // 0D' = MB_CTRL_Dyn
        console.log('MB_CTRL_Dyn: ', resp);
      } while (!(resp[0] == 0 && (resp[1] & (1 << 0)))); // MB_EN
      console.log('MB_EN detected');

      resp = await this.readMailboxMessageLength(); // 0 means 1 byte
      console.log('msgLen resp: ', resp);

      resp = await this.readMailboxMessage();
      console.log('read resp: ', resp);
    } catch (e) {
      console.warn('init FTM procedure failed!');
      if (errorCallback) errorCallback();
      this._cancel();
      return;
    }

    /* build messages procedure */
    const NUMBER_OF_BYTES_PER_MESSAGE = 240;
    // let compressedBytesHash = hs.compress(this.state.image());
    const compressedBytesHash = hs.compress(image);
    const compressedBytesArray = new Array();
    for (const key in compressedBytesHash) {
      compressedBytesArray.push(compressedBytesHash[key]);
    }
    const compressedBytesArrayLength = compressedBytesArray.length;
    const NUMBER_OF_MESSAGES = Math.ceil(compressedBytesArrayLength / NUMBER_OF_BYTES_PER_MESSAGE);
    const compressedBytesArrays = new Array(NUMBER_OF_MESSAGES);
    for (let i = 0; i < NUMBER_OF_MESSAGES; i++) {
      const slicedBytesArray = compressedBytesArray.slice(i * NUMBER_OF_BYTES_PER_MESSAGE, (i + 1) * NUMBER_OF_BYTES_PER_MESSAGE);
      /* first byte of each message must be the msgNumber; very first message also contains the compressed array length (bytes 2 & 3) */
      if (i == 0) compressedBytesArrays[i] = [i + 1, (compressedBytesArrayLength >> 8) & 0xFF, compressedBytesArrayLength & 0xFF].concat(slicedBytesArray);
      else compressedBytesArrays[i] = [i + 1].concat(slicedBytesArray);
    }
    // let imageLength = this.state.image().length;
    const imageLength = image.length;
    console.log('-> Compressed image from', imageLength, 'to', compressedBytesArrayLength, 'bytes (', Math.round(100 * compressedBytesArrayLength / imageLength), '% )');
    console.log('NUMBER_OF_MESSAGES = ', NUMBER_OF_MESSAGES);

    /* send FTM procedure */
    console.warn('Start transmission...');

    let msgSent = 0;
    let msgReceived = 0;
    let error = false;
    const date1 = Date.now();

    /* put first message into the mailbox */
    try {
      console.log('sentMsgNr: ', msgReceived + 1);// blup
      resp = await this.writeMailboxMessage(compressedBytesArrays[msgReceived]); // takes about 100ms
      // console.warn("write resp: ", resp);
    } catch (e) {
      console.warn('writeMailboxMessage failed!');
      error = true;
    }
    msgSent++;

    const MAX_NUMBER_OF_MESSAGES = NUMBER_OF_MESSAGES * 1.2;
    while (msgReceived < NUMBER_OF_MESSAGES && msgSent < MAX_NUMBER_OF_MESSAGES) { // stop when all messages received or 120% sent
      /* get status */
      try {
        var mbCtrl = await this.readDynamicRegister('0D'); // 0D' = MB_CTRL_Dyn
        // console.warn("MB_CTRL_Dyn: ", mbCtrl);
      } catch (e) {
        console.warn('readDynamicRegister failed!');
        error = true;
        break;
      }
      if (mbCtrl[0] == 0) {
        if (mbCtrl[1] & 0x02) { // HOST_PUT_MSG (1 << 1)
          /* receive a message */
          try {
            // resp = await this.readMailboxMessageLength(); // 0 means 1 byte; takes about 12ms
            // console.warn("msgLen = ", resp);
            resp = await this.readMailboxMessage(); // takes about 13ms
            /* try up to two more times if reading the mailbox failed */
            if (resp[0] != 0) resp = await this.readMailboxMessage();
            if (resp[0] != 0) resp = await this.readMailboxMessage();
          } catch (e) {
            console.warn('readMailboxMessage failed!');
            error = true;
            break;
          }
          // check if received message is correct
          // console.warn("resp[0]: ", resp[0]);
          // console.warn("resp[1]: ", resp[1]);
          console.log('receivedMsgNr: ', resp[1]);// blup
          if (resp[0] != 0) {
            error = true;
            break;
          }
          if (resp[1] == msgReceived + 1) {
            msgReceived++;
            // this.setState({progress: Math.round(100*msgReceived/NUMBER_OF_MESSAGES)});//blup: this makes an upload significant longer!
          }
        } else if (mbCtrl[1] & 0x40) { // !HOST_PUT_MSG && HOST_CURRENT_MSG (1 << 6)
          /* send a message */
          try {
            console.log('sentMsgNr: ', msgReceived + 1);// blup
            resp = await this.writeMailboxMessage(compressedBytesArrays[msgReceived]); // takes about 100ms
            // console.warn("write resp: ", resp);
          } catch (e) {
            console.warn('writeMailboxMessage failed!');
            error = true;
            break;
          }
          msgSent++;
          console.log('totalSent: ', msgSent);// blup
        }
      }
    }

    const dt = (Date.now() - date1).toString();
    if (error) {
      console.warn(`error! (dt = ${dt}ms)`);
      if (errorCallback) errorCallback();
    } else {
      console.warn(`done (dt = ${dt}ms)`);
      if (successCallback) successCallback();
    }
    this._cancel();
  }
}

export default ST25DV;
