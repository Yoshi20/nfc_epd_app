import React, { useState } from 'react';
import { Image } from 'react-native';
import {
  Container, Header, Content, Footer, FooterTab,
  Button,
  Icon,   // https://ionicframework.com/docs/v3/ionicons/
  Text,
  Root,
  Toast,
  Card, CardItem,
  Left, Body, Right, View,
  Grid, Row, Col,
} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import ImageLoad from 'react-native-image-placeholder';
import ImageTools from 'react-native-image-tool';
import RNFS from 'react-native-fs';

import { PATHS, DIMENSIONS } from '../constants';

function AddImage({ navigation, route }) {
  const [currentImagePath, setCurrentImagePath] = useState('');

  if (route.params.croppedImageFilePath) {
    console.log('blup');

    // setCurrentImagePath(route.params.croppedImageFilePath);
    // route.params.croppedImageFilePath = "";

    const threshold = 100;  // 0-255
    const base64 = false;
    const frontColorString = "000000ff";
    const backColorString = "ffffffff";
    ImageTools.createBinaryImage(route.params.croppedImageFilePath, 1, threshold, 'JPEG', 1, base64, frontColorString, backColorString)
    .then((response) => {
      console.log('blup2');
      // response.uri is the URI of the new image that can now be displayed, uploaded...
      // response.path is the path of the new image
      // response.name is the name of the new image with the extension
      // response.size is the size of the new image
      // while bOutputBase64 is true, response.base64 is the base64 string of the new image

      setCurrentImagePath(response.uri);
      route.params.croppedImageFilePath = "";
    }).catch((err) => {
      console.log('create binary image failed! err =', err);
      // Oops, something went wrong. Check that the filename is correct and
      // inspect err to get more details.
    });
  }

  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            {currentImagePath != "" &&
              <Image
                style={{width: '100%', height: 200, resizeMode: 'stretch'}}
                source={{ uri: Platform.OS === 'ios' ? currentImagePath : `file://${currentImagePath}` }}
              />
            }
            {currentImagePath == "" &&
              <ImageLoad
                style={{ width: '100%', height: 200 }}
                source={{ uri: Platform.OS === 'ios' ? currentImagePath : `file://${currentImagePath}` }}
              />
            }
          </Row>
          <Button block
            onPress={() => {
              // get a list of files and directories in the main bundle
              // RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
              RNFS.readDir(PATHS.APP_FILES)
              .then((result) => {
                console.log('GOT RESULT', result);
                // stat the first file
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
              })
              .then((statResult) => {
                console.log('statResult.length =', statResult.length);
                if (statResult[0].isFile()) {
                  // if we have a file, read it
                  // setCurrentImagePath(statResult[0].path);

                  const fileName = '/2020-05-04T13-54-26.822Z.jpg';
                  setCurrentImagePath(PATHS.APP_FILES + fileName);

                  // return RNFS.readFile(statResult[1], 'utf8');
                  // return RNFS.readFile(statResult[1], 'base64');
                }
                // return 'no file';
              })
              // .then((contents) => {
              //   // log the file contents
              //   console.log(contents);
              // })
              // .catch((err) => {
              //   console.log(err.message, err.code);
              // });
            }}
          >
            <Text>Read Dir</Text>
          </Button>

          <Button block
            onPress={() => {
              // get a list of files and directories in the main bundle
              // RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
              // RNFS.readFile(PATHS.APP_FILES + '/test.txt', 'ascii')
              const fileName = '/2020-05-04T13-54-26.822Z.jpg';
              RNFS.readFile(PATHS.APP_FILES + fileName, 'base64')
              .then((result) => {
                console.log('GOT RESULT:');
                console.log(result);
                setCurrentImagePath(PATHS.APP_FILES + fileName);
              })
              .catch((err) => {
                console.log(err.message, err.code);
              });
            }}
          >
            <Text>Read File</Text>
          </Button>

          <Button transparent />

          <Button block
            onPress={() => {
              /* Create app files dir if it doesn't exist yet */
              RNFS.mkdir(PATHS.APP_FILES, {NSURLIsExcludedFromBackupKey: true});
              /* Write file */
              var path = PATHS.APP_FILES + '/test.txt';
              RNFS.writeFile(path, 'Lorem ipsum dolor sit amet blup', 'utf8')
              .then((success) => {
                console.log('FILE WRITTEN!');
              })
              .catch((err) => {
                console.log(err.message);
              });
            }}
          >
            <Text>Add</Text>
          </Button>

          <Button block
            onPress={() => {
              var path = PATHS.APP_FILES + '/test.txt';
              return RNFS.unlink(path)  // `unlink` will throw an error, if the item to unlink does not exist
              .then(() => {
                console.log('FILE DELETED');
              })
              .catch((err) => {
                console.log(err.message);
              });
            }}
          >
            <Text>Delete</Text>
          </Button>

          <Button transparent />

          <Button block
            onPress={() => {
              const options = {
                title: 'Load Photo',
                customButtons: [
                  { name: 'button_id_1', title: 'CustomButton 1' },
                  { name: 'button_id_2', title: 'CustomButton 2' }
                ],
                storageOptions: {
                  skipBackup: true,
                  path: 'Images',
                },
                // maxWidth: DIMENSIONS.IMAGES.DEFAULT_WIDTH,
                // maxHeight: DIMENSIONS.IMAGES.DEFAULT_HEIGHT,
              };
              ImagePicker.showImagePicker(options, (response) => {
                // console.log('Response = ', response);

                if (response.didCancel) {
                  console.log('User cancelled image picker');
                } else if (response.error) {
                  console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                  console.log('User tapped custom button: ', response.customButton);
                } else {

                  ImageResizer.createResizedImage(response.uri, DIMENSIONS.IMAGES.DEFAULT_WIDTH, DIMENSIONS.IMAGES.DEFAULT_HEIGHT, 'JPEG', 100, 0, undefined, false)
                  .then((response) => {
                    console.log('Resized image in cache', response.uri);

                    /* With image cropper */
                    navigation.navigate('CropImage', {imageUri: response.uri, hideTabBar: true});

                    // /* Without image cropper */
                    // const imagePath = `${PATHS.APP_FILES}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
                    // if(Platform.OS === 'ios') {
                    //   RNFS.copyAssetsFileIOS(response.origURL, imagePath, 0, 0)
                    //   .then(res => {
                    //     console.log('FILE WRITTEN')
                    //     console.log(imagePath)
                    //   })
                    //   .catch(err => {
                    //       console.log('ERROR: image file write failed!!!');
                    //       console.log(err.message, err.code);
                    //   });
                    // } else if(Platform.OS === 'android') {
                    //   RNFS.copyFile(response.uri, imagePath)
                    //   .then(res => {
                    //     console.log('FILE WRITTEN')
                    //   })
                    //   .catch(err => {
                    //       console.log('ERROR: image file write failed!!!');
                    //       console.log(err.message, err.code);
                    //   });
                    // }
                    // setCurrentImagePath(imagePath);

                  })
                  .catch((err) => {
                    console.log('Error resizing image', err);
                  });

                }
              });
            }}
          >
            <Text>ImagePicker</Text>
          </Button>

          <Button transparent />

        </Grid>
      </Content>
    </Container>
  );
}

export default AddImage;
