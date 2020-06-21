import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Platform, Alert, Image, TouchableOpacity, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageLoad from 'react-native-image-placeholder';
import ImagePicker0 from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import { PATHS, DIMENSIONS } from '../constants';

function EditImage({ navigation, route }) { // route.params: title, image
  const [image, setImage] = useState(route.params.image);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.title,
    });
  }, []);

  function copyAndUpdateCroppedImage(croppedImage) {
    /* Create images dir if it doesn't exist yet */
    RNFS.mkdir(PATHS.IMAGES, { NSURLIsExcludedFromBackupKey: true });

    /* Copy cropped image into the images dir */
    const newImageFilePath = `${PATHS.IMAGES}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
    if (Platform.OS === 'ios') {
      RNFS.copyAssetsFileIOS(croppedImage.path, newImageFilePath, 0, 0)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          console.log('FILE WRITTEN');
          console.log(newImageFilePath);
        })
        .catch((err) => {
          console.log('ERROR: image file write failed!!!');
          console.log(err.message, err.code);
        });
    } else if (Platform.OS === 'android') {
      RNFS.copyFile(croppedImage.path, newImageFilePath)
      // eslint-disable-next-line no-unused-vars
        .then((res) => {
          console.log('FILE WRITTEN');
          console.log(newImageFilePath);
        })
        .catch((err) => {
          console.log('ERROR: image file write failed!!!');
          console.log(err.message, err.code);
        });
    }

    /* Update the image object */
    const newImage = {
      id: image.id,
      path: newImageFilePath,
      width: croppedImage.width,
      height: croppedImage.height,
      mime: croppedImage.mime,
    };
    setImage(newImage);
  }

  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            <ImageLoad
              style={{ width: '100%', height: 200 }}
              source={{ uri: Platform.OS === 'ios' ? image.path : `file://${image.path}` }}
              // source={image}
              // source={{ uri: image.path }}
            />
          </Row>

          {/* blup: */}
          <Row>
            <Text>{image.id}</Text>
          </Row>
          <Row>
            <Text>{Platform.OS === 'ios' ? image.path : `file://${image.path}` }</Text>
          </Row>

          <Row>
            <Col size={50}>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openPicker({
                    width: DIMENSIONS.IMAGES.DEFAULT_WIDTH,
                    height: DIMENSIONS.IMAGES.DEFAULT_HEIGHT,
                    compressImageMaxWidth: DIMENSIONS.IMAGES.DEFAULT_WIDTH,
                    compressImageMaxHeight: DIMENSIONS.IMAGES.DEFAULT_HEIGHT,
                    cropping: true,
                    hideBottomControls: true,
                    // includeBase64: true,
                  }).then((croppedImage) => {
                    copyAndUpdateCroppedImage(croppedImage);
                  });
                }}
              >
                <Text>{image.path ? 'Ersetzen' : 'Auswählen'}</Text>
                <Icon type="MaterialCommunityIcons" name="folder-multiple-image" style={{ color: 'black', fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
            <Col size={50}>
              <TouchableOpacity
                onPress={() => {
                  ImagePicker.openCamera({
                    width: DIMENSIONS.IMAGES.DEFAULT_WIDTH,
                    height: DIMENSIONS.IMAGES.DEFAULT_HEIGHT,
                    compressImageMaxWidth: DIMENSIONS.IMAGES.DEFAULT_WIDTH,
                    compressImageMaxHeight: DIMENSIONS.IMAGES.DEFAULT_HEIGHT,
                    cropping: true,
                    hideBottomControls: true,
                    // includeBase64: true,
                  }).then((croppedImage) => {
                    copyAndUpdateCroppedImage(croppedImage);
                  });
                }}
              >
                <Text>Kamera</Text>
                <Icon type="MaterialCommunityIcons" name="camera" style={{ color: 'black', fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
          </Row>

          {(image.path !== '')
            && (
              <Row>
                <Col>
                  <TouchableOpacity>
                    <Text>Invertieren</Text>
                    <Icon name="contrast" style={{ color: 'black', fontSize: 40 }} />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity>
                    <Text>Löschen</Text>
                    <Icon name="trash" style={{ color: 'black', fontSize: 40 }} />
                  </TouchableOpacity>
                </Col>
                <Col>
                  <TouchableOpacity>
                    <Text>Drehen</Text>
                    <Icon name="refresh" style={{ color: 'black', fontSize: 40 }} />
                  </TouchableOpacity>
                </Col>
              </Row>
            )}

        </Grid>
      </Content>
    </Container>
  );
}

export default EditImage;
