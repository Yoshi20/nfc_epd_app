// import { Platform } from 'react-native';
// import { Client, Configuration } from 'rollbar-react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import DeviceInfo from 'react-native-device-info';

import { COLORS } from '../constants';
// import { version } from '../app.json';

// const ROLLBAR_TOKEN = '';
class Logger {
//  static rollbar = new Client(new Configuration(ROLLBAR_TOKEN, { captureDeviceInfo: !__DEV__ }));;

  static shutUpRollBar = __DEV__;

  // static async initRollbar() {
  //   const deviceName = await DeviceInfo.getDeviceName();
  //   const isLandscape = await DeviceInfo.isLandscape();

  //   const config = new Configuration(
  //     ROLLBAR_TOKEN,
  //     {
  //       captureDeviceInfo: !__DEV__,
  //       payload: {
  //         version,
  //         environment_server: environment || 'unknown',
  //         apiToken,
  //         userId,
  //         os: Platform.OS,
  //         deviceName,
  //         isLandscape,
  //       },
  //     }
  //   );
  //   this.rollbar = new Client(config);
  // }

  /* eslint-disable no-console */
  static debug(message) {
    if (__DEV__) {
      console.debug(`%cDEBUG: ${message}`, `color: ${COLORS.debug}`);
    }
  }

  static warn(message, rollbar = false) {
    if (rollbar && !Logger.shutUpRollBar) {
      this.rollbar.warning(message);
    }
    if (__DEV__) {
      console.debug(`%cWARNING: ${message}`, `color: ${COLORS.warning}`);
    }
  }

  static error(errorOrMessage, message = null) {
    if (!Logger.shutUpRollBar) {
      if (message) {
        this.rollbar.error(errorOrMessage, message);
      } else {
        this.rollbar.error(errorOrMessage);
      }
    }
    if (__DEV__) {
      console.debug(`%cERROR: ${errorOrMessage} ${message ? `\n${message}` : ''}`, `color: ${COLORS.error}`);
    }
  }
}
/* eslint-enable */
export default Logger;
