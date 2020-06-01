import RNFS from 'react-native-fs';

const PROJECT_NAME = 'My E-Signs';

const PATHS = Object.freeze({
  APP_FILES: `${RNFS.DocumentDirectoryPath}/myAppFiles`,
  IMAGES: `${RNFS.DocumentDirectoryPath}/myAppFiles/images`,
  STATIC_ANDORID_IMAGES: 'images', // => android/app/src/main/assets/...
});

export default PATHS;
