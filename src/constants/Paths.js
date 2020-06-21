import RNFS from 'react-native-fs';

const PROJECT_NAME = 'E-Signs';

const PATHS = Object.freeze({
  // APP_FILES: `${RNFS.DocumentDirectoryPath}/${PROJECT_NAME}`,
  IMAGES: `${RNFS.PicturesDirectoryPath}/${PROJECT_NAME}`,
  STATIC_ANDORID_IMAGES: 'images', // => android/app/src/main/assets/...
});

export default PATHS;
