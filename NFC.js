// // npx react-native start
// // npx react-native run-android

// import React from 'react'
// import {
//   Text,
//   TouchableOpacity,
//   Vibration,
//   View,
//   // TextInput,
//   // Platform,
// } from 'react-native'
// import {
//   BallIndicator,
//   BarIndicator,
//   DotIndicator,
//   MaterialIndicator,
//   PacmanIndicator,
//   PulseIndicator,
//   SkypeIndicator,
//   UIActivityIndicator,
//   WaveIndicator,
// } from 'react-native-indicators'; // https://github.com/n4kz/react-native-indicators
// import ST25DV from './ST25DV.js'
// import Camera from './Camera.js'
// var hs = require('./heatshrink.js');
// import {image1} from './image1.js';
// import {image2} from './image2.js';
// import {image3} from './image3.js';
// import {image4} from './image4.js';
// import {image5} from './image5.js';
// import {image6} from './image6.js';

// class NFC extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       running: false,
//       uploading: false,
//       progress: 0,
//       image: image6,
//     };
//   }

//   componentDidMount() {
//     ST25DV.init();
//     setInterval(() => {
//       if (!this.state.running) this._specific();
//     }, 1000);
//   }

//   componentWillUnmount() {
//     this._cancel();
//   }

//   render() {
//     return (
//       // <Camera></Camera>

//       <View style={{padding: 20}}>

//         {/* ---------------------------------------------------- */}

//         <Text>Enable NFC and put your phone on the ST25DV antenna to transmit an image</Text>

//         {/* ---------------------------------------------------- */}

//         {this.state.uploading && <PacmanIndicator style={{position: 'absolute', top: 50, left: '46%'}} color='orange'></PacmanIndicator>}
//         {/* {this.state.uploading && <Text style={{position: 'absolute', top: 65, left: '60%'}}>{this.state.progress}%</Text>} */}
        
//         <View style={{marginTop: 50, flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row',}}>

//           <TouchableOpacity
//               style={{padding: 10, width: 65, margin: 20, marginTop: 0, borderWidth: 1, borderColor: 'black', flexDirection:'column'}}
//               onPress={this._setImage6}
//             >
//               <Text style={{textAlign: 'center'}}>Demo</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{padding: 10, width: 65, margin: 20, marginTop: 0, borderWidth: 1, borderColor: 'black', flexDirection:'column'}}
//             onPress={this._setImage1}
//           >
//             <Text style={{textAlign: 'center'}}>Ninja</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{padding: 10, width: 65, margin: 20, marginTop: 0, borderWidth: 1, borderColor: 'black', flexDirection:'column'}}
//             onPress={this._setImage2}
//           >
//             <Text style={{textAlign: 'center'}}>Baby</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{padding: 10, width: 65, margin: 20, marginTop: 0, borderWidth: 1, borderColor: 'black', flexDirection:'column'}}
//             onPress={this._setImage3}
//           >
//             <Text style={{textAlign: 'center'}}>Deku</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{padding: 10, width: 65, margin: 20, marginTop: 0, borderWidth: 1, borderColor: 'black', flexDirection:'column'}}
//             onPress={this._setImage4}
//           >
//             <Text style={{textAlign: 'center'}}>Meme</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{padding: 10, width: 65, margin: 20, marginTop: 0, borderWidth: 1, borderColor: 'black', flexDirection:'column'}}
//             onPress={this._setImage5}
//           >
//             <Text style={{textAlign: 'center'}}>Moby</Text>
//           </TouchableOpacity>

//         </View>

//         <TouchableOpacity
//           style={{padding: 10, width: 270, margin: 20, borderWidth: 1, borderColor: 'black'}}
//           onPress={this._cancel}
//         >
//           <Text style={{textAlign: 'center'}}>Cancel Transceive</Text>
//         </TouchableOpacity>

//       </View>
//     )
//   }

//   _setImage1 =  async () => {
//     this.setState({image: image1});
//   }
//   _setImage2 =  async () => {
//     this.setState({image: image2});
//   }
//   _setImage3 =  async () => {
//     this.setState({image: image3});
//   }
//   _setImage4 =  async () => {
//     this.setState({image: image4});
//   }
//   _setImage5 =  async () => {
//     this.setState({image: image5});
//   }
//   _setImage6 =  async () => {
//     this.setState({image: image6});
//   }
//   _cancel = async () => {
//     Vibration.vibrate();
//     try {
//       ST25DV.cancel();
//       ST25DV.cleanUpTransceive();
//     } catch (e) {
//       console.warn("cleanUpTransceive failed!");
//     }
//     this.setState({running: false});
//     this.setState({uploading: false});
//     this.setState({progress: 0});
//   }

//   _specific = async () => {
//     this.setState({running: true});

//     let resp = await ST25DV.requestTechnology();
//     console.log('requested technology: ', resp);


//     this.setState({uploading: true});

//     resp = await ST25DV.sendDefaultPw();
//     if (resp[0] != 0) console.log('sendDefaultPw failed! Resp: ', resp);

//     /* init FTM procedure */

//     // resp = await ST25DV.setEHMode(1);
//     // resp = await ST25DV.getEHMode();

//     console.log("waiting for VCC_ON...");
//     do {
//       resp = await ST25DV.readDynamicRegister('02');  // '02' = EH_CTRL_Dyn
//       console.log("EH_CTRL_Dyn: ", resp);
//     } while(!(resp[0] == 0 && (resp[1] & (1 << 3))) ) // VCC_ON
//     console.log("VCC_ON detected");

//     console.log("conf GPO");
//     // resp = await ST25DV.configureGPO(0xB0);  // GPO_EN & RF_PUT_MSG & RF_GET_MSG
//     resp = await ST25DV.configureGPO(0x90);  // GPO_EN & RF_PUT_MSG
//     if (resp[0] != 0) console.warn('configureGPO failed! Resp: ', resp);

//     console.log("set MB_WDG");
//     resp = await ST25DV.writeSystemRegister('0E', 0); // MB_WDG
//     if (resp[0] != 0) console.warn('disable MB_WDG failed! Resp: ', resp);

//     console.log("waiting for MB_EN...");
//     do {
//       resp = await ST25DV.readDynamicRegister('0D');  // 0D' = MB_CTRL_Dyn
//       console.log("MB_CTRL_Dyn: ", resp);
//     } while(!(resp[0] == 0 && (resp[1] & (1 << 0)))) // MB_EN
//     console.log("MB_EN detected");

//     resp = await ST25DV.readMailboxMessageLength(); // 0 means 1 byte
//     console.log("msgLen resp: ", resp);

//     resp = await ST25DV.readMailboxMessage();
//     console.log("read resp: ", resp);

//     /* build messages procedure */
//     const NUMBER_OF_BYTES_PER_MESSAGE = 240;
//     let compressedBytesHash = hs.compress(this.state.image());
//     const compressedBytesArray = new Array();
//     for (var key in compressedBytesHash) {
//       compressedBytesArray.push(compressedBytesHash[key]);
//     }
//     const compressedBytesArrayLength = compressedBytesArray.length;
//     const NUMBER_OF_MESSAGES = Math.ceil(compressedBytesArrayLength/NUMBER_OF_BYTES_PER_MESSAGE);
//     let compressedBytesArrays = new Array(NUMBER_OF_MESSAGES);
//     for (let i = 0; i < NUMBER_OF_MESSAGES; i++) {
//       let slicedBytesArray = compressedBytesArray.slice(i*NUMBER_OF_BYTES_PER_MESSAGE, (i+1)*NUMBER_OF_BYTES_PER_MESSAGE);
//       /* first byte of each message must be the msgNumber; very first message also contains the compressed array length (bytes 2 & 3) */
//       if (i == 0) compressedBytesArrays[i] = [i+1, (compressedBytesArrayLength >> 8) & 0xFF, compressedBytesArrayLength & 0xFF].concat(slicedBytesArray);
//       else compressedBytesArrays[i] = [i+1].concat(slicedBytesArray);
//     }
//     let imageLength = this.state.image().length;
//     console.log("-> Compressed image from", imageLength, "to", compressedBytesArrayLength, "bytes (", Math.round(100*compressedBytesArrayLength/imageLength), "% )");
//     console.log("NUMBER_OF_MESSAGES = ", NUMBER_OF_MESSAGES);

//     /* send FTM procedure */
//     console.warn("Start transmission...");

//     let msgSent = 0;
//     let msgReceived = 0;
//     let error = false;
//     let date1 = Date.now();

//     /* put first message into the mailbox */
//     try {
//       console.log("sentMsgNr: ", msgReceived+1);//blup
//       resp = await ST25DV.writeMailboxMessage(compressedBytesArrays[msgReceived]); // takes about 100ms
//       //console.warn("write resp: ", resp);
//     } catch (e) {
//       console.warn("writeMailboxMessage failed!");
//       error = true;
//     }
//     msgSent++;

//     const MAX_NUMBER_OF_MESSAGES = NUMBER_OF_MESSAGES * 1.2;
//     while(msgReceived < NUMBER_OF_MESSAGES && msgSent < MAX_NUMBER_OF_MESSAGES) { // stop when all messages received or 120% sent
//       /* get status */
//       try {
//         var mbCtrl = await ST25DV.readDynamicRegister('0D');  // 0D' = MB_CTRL_Dyn
//         //console.warn("MB_CTRL_Dyn: ", mbCtrl);
//       } catch (e) {
//         console.warn("readDynamicRegister failed!");
//         error = true;
//         break;
//       }
//       if (mbCtrl[0] == 0) {
//         if (mbCtrl[1] & 0x02) { // HOST_PUT_MSG (1 << 1)
//           /* receive a message */
//           try {
//             //resp = await ST25DV.readMailboxMessageLength(); // 0 means 1 byte; takes about 12ms
//             //console.warn("msgLen = ", resp);
//             resp = await ST25DV.readMailboxMessage(); // takes about 13ms
//             /* try up to two more times if reading the mailbox failed */
//             if (resp[0] != 0) resp = await ST25DV.readMailboxMessage();
//             if (resp[0] != 0) resp = await ST25DV.readMailboxMessage();
//           } catch (e) {
//             console.warn("readMailboxMessage failed!");
//             error = true;
//             break;
//           }
//           // check if received message is correct
//           //console.warn("resp[0]: ", resp[0]);
//           //console.warn("resp[1]: ", resp[1]);
//           console.log("receivedMsgNr: ", resp[1]);//blup
//           if (resp[0] != 0) {
//             error = true;
//             break;
//           }
//           if (resp[1] == msgReceived+1) {
//             msgReceived++;
//             // this.setState({progress: Math.round(100*msgReceived/NUMBER_OF_MESSAGES)});//blup: this makes an upload significant longer!
//           }
//         }
//         else if (mbCtrl[1] & 0x40) {  // !HOST_PUT_MSG && HOST_CURRENT_MSG (1 << 6)
//           /* send a message */
//           try {
//             console.log("sentMsgNr: ", msgReceived+1);//blup
//             resp = await ST25DV.writeMailboxMessage(compressedBytesArrays[msgReceived]); // takes about 100ms
//             //console.warn("write resp: ", resp);
//           } catch (e) {
//             console.warn("writeMailboxMessage failed!");
//             error = true;
//             break;
//           }
//           msgSent++;
//           console.log("totalSent: ", msgSent);//blup
//         }
//       }
//     }
//     let dt = (Date.now() - date1).toString();
//     if(error) {
//       console.warn("error! (dt = " + dt + "ms)");
//     } else {
//       console.warn("done (dt = " + dt + "ms)");
//     }
//     this._cancel();
//   }

// }

// export default NFC
