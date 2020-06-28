/* eslint-disable max-len */
import React, { useState } from 'react';
import { Platform, Alert, Image, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text, Toast, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageLoad from 'react-native-image-placeholder';
import RNFS from 'react-native-fs';

import { PATHS } from '../constants';

function ESignCard({ navigation, route, name, images, screen }) {

  return (
    <Card style={{ width: '48%' }}>


      <Button block
        onPress={() => {
          /* Create app files dir if it doesn't exist yet */
          RNFS.mkdir(PATHS.APP_FILES, { NSURLIsExcludedFromBackupKey: true });
          /* Write file */
          const path = `${PATHS.APP_FILES}/test.txt`;
          RNFS.writeFile(path, 'Lorem ipsum dolor sit amet blup', 'utf8')
            .then(() => {
              console.log('FILE WRITTEN!');
            })
            .catch((err) => {
              console.log(err.message);
            });


          RNFS.mkdir(PATHS.IMAGES, { NSURLIsExcludedFromBackupKey: true });

        }}
      >
        <Text>Add</Text>
      </Button>

      <Button block
        onPress={() => {

          // blup on Android:
          // RNFS.MainBundlePath                => not working
          // RNFS.CachesDirectoryPath           => /data/user/0/com.nfc_epd_app/cache/image_cache und /data/user/0/com.nfc_epd_app/cache/http-cache
          // RNFS.ExternalCachesDirectoryPath   => empty
          // RNFS.DownloadDirectoryPath         => /storage/emulated/0/Download/...
          // RNFS.DocumentDirectoryPath         => /data/user/0/com.nfc_epd_app/files
          // RNFS.ExternalDirectoryPath         => empty
          // RNFS.ExternalStorageDirectoryPath  => /storage/emulated/0/... (Music, Pictures, Documents, ...)
          // RNFS.TemporaryDirectoryPath        => /data/user/0/com.nfc_epd_app/cache/image_cache und /data/user/0/com.nfc_epd_app/cache/http-cache
          // RNFS.LibraryDirectoryPath          => not working
          // RNFS.PicturesDirectoryPath         => /storage/emulated/0/Pictures/... (FairyTail, WoW, Zelda, ...)
          // RNFS.FileProtectionKeys            => not working

          RNFS.readDir(RNFS.PicturesDirectoryPath+'/Zelda')

          // RNFS.readDir(PATHS.APP_FILES)
          // RNFS.readDir(PATHS.IMAGES)
          // RNFS.readDirAssets(PATHS.STATIC_ANDORID_IMAGES)
          // RNFS.readFileAssets('test.txt', 'ascii')
            .then((result) => {
              console.log('GOT RESULT', result);
              console.warn('path = ', result[0].path);
              return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
              console.log('statResult.length =', statResult.length);
              if (statResult[0].isFile()) {
                // if we have a file, read it
                return RNFS.readFile(statResult[1], 'utf8');
                // return RNFS.readFile(statResult[1], 'base64');
              }
              return 'no file';
            })
            .then((contents) => {
              // log the file contents
              console.log(contents);
            })
            .catch((err) => {
              console.log(err.message, err.code);
            });
        }}
      >
        <Text>Read Dir</Text>
      </Button>

      <Button block
        onPress={() => {
          const path = `${PATHS.APP_FILES}/test.txt`;
          return RNFS.unlink(path) // `unlink` will throw an error, if the item to unlink does not exist
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


      <Button block
        onPress={() => {


          // if (Platform.OS == 'android') {
          //   // for android
          //   RNFS.copyFileAssets('', destPath);
          // } else {
          //   // for ios
          //   RNFS.copyFile(RNFS.MainBundlePath + '', destPath);
          // }


          RNFS.copyFileAssets(`${PATHS.STATIC_ANDORID_IMAGES}/moby.jpg`, `${PATHS.IMAGES}/moby.jpg`)
          // RNFS.copyFileAssets('test.txt', PATHS.APP_FILES + '/test.txt')
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              console.log(error);
            });


      //     const imagePath = `${PATHS.APP_FILES}/${new Date().toISOString()}.jpg`.replace(/:/g, '-');
      //     if(Platform.OS === 'ios') {
      //       RNFS.copyAssetsFileIOS(response.origURL, imagePath, 0, 0)
      //         .then(res => {
      //           console.log('FILE WRITTEN')
      //           console.log(imagePath)
      //         })
      //         .catch(err => {
      //           console.log('ERROR: image file write failed!!!');
      //           console.log(err.message, err.code);
      //         });
      //     } else if(Platform.OS === 'android') {
      //       RNFS.copyFile(response.uri, imagePath)
      //         .then(res => {
      //           console.log('FILE WRITTEN')
      //         })
      //         .catch(err => {
      //           console.log('ERROR: image file write failed!!!');
      //           console.log(err.message, err.code);
      //         });
      //     }

        }}
      >
        <Text>Copy</Text>
      </Button>


      <Button block
        onPress={() => {
          // const path = `${PATHS.APP_FILES}/test.txt`;
          // return RNFS.unlink(path) // `unlink` will throw an error, if the item to unlink does not exist
          //   .then(() => {
          //     console.log('FILE DELETED');
          //   })
          //   .catch((err) => {
          //     console.log(err.message);
          //   });
        }}
      >
        <Text>Show</Text>
      </Button>

      {/* const blupImage = {
        photoSource: {
          uri: 'file://' + filePath,
          type: res.headers['content-type'],
          name: file.Name()
      }}); */}

      {/* <Image source={{ uri: `file:${RNFS.PicturesDirectoryPath}/Zelda/zelda.jpg` }} style={{ height: 100, width: `${100 / images.size}%` }} />
      <Image source={{ uri: `file:${PATHS.IMAGES}/moby.jpg` }} style={{ height: 100, width: `${100 / images.size}%` }} />
      <Image source={{ uri: 'asset:/images/moby.jpg' }} style={{ width: 40, height: 40 }} /> */}









      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ESignScreen', { navigation, route, name, images, screen });
        }}
      >
        <CardItem cardBody style={{ padding: 5, paddingBottom: 5 }}>
          <Grid>
            <Row size={20} style={{ paddingBottom: 5 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontWeight: 'bold' }}>{name}</Text>
              </View>
            </Row>

            {/* blup: */}
            {/* <Text>{images.length}</Text>
            <Text>{'paths:'}</Text>
            {images.map(image => (
              <Text>{Platform.OS === 'ios' ? image.path : `${screen === 'Vorlagen' ? 'asset:/' : 'file:/'}${image.path}` }</Text>
            ))} */}

            <Row size={80}>
              {(images.length === 0) && (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //   <Icon name="laptop" style={{ height: 100, paddingTop: 35 }} />
                // </View>
                <ImageLoad
                  style={{ height: 100, width: '100%' }}
                  source={{ uri: 'file' }}
                />
              )}
              {(images.length > 0) && (
                images.map(image => (
                  <Image
                    style={{ height: 100, width: `${100 / images.length}%` }}
                    source={{ uri: Platform.OS === 'ios' ? image.path : `${screen === 'Vorlagen' ? 'asset://' : 'file://'}${image.path}` }}
                  />
                ))
              )}
            </Row>

          </Grid>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}

export default ESignCard;
