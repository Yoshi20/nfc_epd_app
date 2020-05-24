import React from 'react';
import AmazingCropper, { DefaultFooter } from 'react-native-amazing-cropper';
import RNFS from 'react-native-fs';

import { PATHS, DIMENSIONS } from '../constants';

function CropImage({ navigation, route }) {
  function onDone(croppedImageUri) {
    console.log('croppedImageUri = ', croppedImageUri);// blup
    const croppedImageFilePath = `${PATHS.APP_FILES}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');

    if (Platform.OS === 'ios') {
      RNFS.copyAssetsFileIOS(croppedImageUri, croppedImageFilePath, 0, 0)
        .then((res) => {
          console.log('FILE WRITTEN');
          console.log(croppedImageFilePath);
        })
        .catch((err) => {
          console.log('ERROR: image file write failed!!!');
          console.log(err.message, err.code);
        });
    } else if (Platform.OS === 'android') {
      RNFS.copyFile(croppedImageUri, croppedImageFilePath)
        .then((res) => {
          console.log('FILE WRITTEN');
          console.log(croppedImageFilePath);
        })
        .catch((err) => {
          console.log('ERROR: image file write failed!!!');
          console.log(err.message, err.code);
        });
    }

    navigation.navigate('AddImage', { croppedImageFilePath });
  }

  function onCancel() {
    console.log('Cancel button was pressed');
    navigation.navigate('AddImage', {});
  }

  return (
    <AmazingCropper
      onDone={onDone}
      onCancel={onCancel}
      imageUri={route.params.imageUri}
      // imageUri='https://www.lifeofpix.com/wp-content/uploads/2018/09/manhattan_-11-1600x2396.jpg'
      imageWidth={DIMENSIONS.IMAGES.DEFAULT_WIDTH}
      imageHeight={DIMENSIONS.IMAGES.DEFAULT_HEIGHT}
      NOT_SELECTED_AREA_OPACITY={0.5}
      BORDER_WIDTH={20}
      footerComponent={<DefaultFooter doneText="Speichern" rotateText="Rotieren" cancelText="Zurück" />}
    />
  );
}

export default CropImage;
