import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Platform, Alert, Image, TouchableOpacity, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageLoad from 'react-native-image-placeholder';
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { PATHS, DIMENSIONS } from '../constants';
import Logger from '../services';

function EditImageScreen({ navigation, route }) { // route.params: title, image, updateImage
  const [image, setImage] = useState(route.params.image);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.title,
    });
  }, []);

  async function copyAndUpdateCroppedImage(croppedImage) {
    /* Create images dir if it doesn't exist yet */
    await RNFS.mkdir(PATHS.IMAGES, { NSURLIsExcludedFromBackupKey: true }).catch((e) => {
      Logger.error('mkdir failed! Error:', e);
    });
    /* Delete last image if its present */
    const oldImageId = image.id;
    if (image.path) {
      try {
        await RNFS.unlink(image.path).catch((e) => {
          Logger.error('delete file failed! Error:', e);
        });
      } catch {
        // ignore File not found error
      }
    }
    /* Create new image object */
    const newImageId = (Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10));
    const newImage = {
      // random hex string id with 16 characters:
      id: newImageId,
      path: `${PATHS.IMAGES}/${newImageId}.jpg`,
      width: croppedImage.width,
      height: croppedImage.height,
      mime: croppedImage.mime,
    };
    /* Copy cropped image into the images dir */
    try {
      if (Platform.OS === 'ios') {
        await RNFS.copyAssetsFileIOS(croppedImage.path, newImage.path, 0, 0);
      } else if (Platform.OS === 'android') {
        await RNFS.copyFile(croppedImage.path, newImage.path);
      }
    } catch (e) {
      Logger.error('copy file failed! Error:', e);
    }
    /* Update image */
    setImage(newImage);
    route.params.updateImage(oldImageId, newImage);
  }

  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            {(image.path === '') && (
              <ImageLoad
                style={{ width: '100%', height: 200 }}
                source={{ uri: 'file' }}
              />
            )}
            {(image.path !== '') && (
              <Image
                style={{ width: '100%', height: 200 }}
                source={{
                  uri: Platform.OS === 'ios' ? image.path : `file://${image.path}`,
                  mime: image.mime
                }}
              />
            )}
          </Row>

          {/* blup: */}
          <Row>
            <Text>id: </Text>
            <Text>{image.id}</Text>
          </Row>
          <Row>
            <Text>path: </Text>
            <Text>{Platform.OS === 'ios' ? image.path : `file://${image.path}` }</Text>
          </Row>

          <Row>
            <Col>
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
                  }).then(async (croppedImage) => {
                    await copyAndUpdateCroppedImage(croppedImage);
                  });
                }}
              >
                <Text>{image.path ? 'Ersetzen' : 'Auswählen'}</Text>
                <Icon type="MaterialCommunityIcons" name="folder-multiple-image" style={{ fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
            <Col>
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
                  }).then(async (croppedImage) => {
                    await copyAndUpdateCroppedImage(croppedImage);
                  });
                }}
              >
                <Text>Kamera</Text>
                <Icon type="MaterialCommunityIcons" name="camera" style={{ fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
          </Row>

          {(image.path !== '') && (
            <Row>
              <Col>
                <TouchableOpacity>
                  <Text>Invertieren</Text>
                  <Icon name="contrast" style={{ fontSize: 40 }} />
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity>
                  <Text>Löschen</Text>
                  <Icon name="trash" style={{ fontSize: 40 }} />
                </TouchableOpacity>
              </Col>
              <Col>
                <TouchableOpacity>
                  <Text>Drehen</Text>
                  <Icon name="refresh" style={{ fontSize: 40 }} />
                </TouchableOpacity>
              </Col>
            </Row>
          )}

        </Grid>
      </Content>
    </Container>
  );
}

export default EditImageScreen;
