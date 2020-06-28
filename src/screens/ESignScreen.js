import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TextInput, Alert, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text, View} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-community/async-storage';
import RNFS from 'react-native-fs';
import ImageCard from '../components/ImageCard';
import { eSignsStorage, Logger } from '../services';

import image1Raw from '../assets/images/testRaw/image1';
import image5Raw from '../assets/images/testRaw/image5';

const ninjaJpgSrc = require('../assets/images/testJpg/ninja.jpg');
const mobyJpgSrc = require('../assets/images/testJpg/moby.jpg');

function ESignScreen({ navigation, route }) { // route.params: eSign, originScreen, deleteESign
  // const [name, setName] = useState(route.params?.name);
  const [imagesArray, setImagesArray] = useState(route.params?.eSign.images);
  const [uploadActivated, setUploadActivated] = useState(false);

  // useEffect(() => {
  //   // console.warn(JSON.stringify(route.params)); // blup
  //   if (route.params?.post) {
  //     console.warn(JSON.stringify(route.params.post)); // blup
  //     // Post updated, do something with `route.params.post`
  //     // For example, send the post to the server
  //   }
  // }, [route.params?.post]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.eSign.name,
      // headerTitle: (
      //   <TextInput
      //     style={{height: 40, borderColor: 'white', borderWidth: 1}}
      //     onChangeText={text => setName(text)}
      //     value={eSign.name}
      //   />
      // ),
      headerRight: () => (
        <Grid style={{ marginTop: 5 }}>
          {(route.params?.originScreen !== 'Vorlagen') && (
            <Col style={{ marginTop: 4, marginRight: 30 }}>
              <TouchableOpacity onPress={() => {
                Alert.alert(
                  'E-Sign wirklich löschen?',
                  'Alle Bilder dieses E-Singes werden gelöscht. Dieser Schritt kann nicht rückgängig gemacht werden.',
                  [
                    {
                      text: 'Nein',
                      style: 'cancel'
                    },
                    {
                      text: 'Ja',
                      onPress: async () => {
                        await eSignsStorage.deleteESign(route.params?.eSign.id);
                        navigation.navigate(`${route.params.originScreen}Screen`);
                      }
                    }
                  ],
                  { cancelable: true }
                );
              }}
              >
                <Icon name="trash" style={{ color: 'white', fontSize: 36 }} />
              </TouchableOpacity>
            </Col>
          )}
          <Col style={{ marginRight: 10 }}>
            <TouchableOpacity
              // disabled={(imagesArray.length === 0)}
              onPress={() => {
                Alert.alert(
                  'Alle Bilder aufs E-Sign laden?',
                  'Schalte die NFC Funktion ein und lege dein Handy auf die Mitte des E-Signs.',
                  [
                    {
                      text: 'Nein',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                    {
                      text: 'Ja',
                      onPress: () => console.log('OK Pressed')
                    }
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Icon type="MaterialCommunityIcons" name="nfc" style={{ color: 'white', fontSize: 40 }} />
              {/* <Icon type="MaterialCommunityIcons" name="nfc" style={{ color: (imagesArray.length === 0) ? 'grey' : 'white', fontSize: 40 }} /> */}
            </TouchableOpacity>
          </Col>
        </Grid>
      ),
    });
  }, []);

  function uploadActivatedCallback() {
    setUploadActivated(true);
  }

  function uploadFinishedCallback() {
    setUploadActivated(false);
  }

  const updateCurrentImage = async (oldImageId, image) => {
    try {
      const eSign = await eSignsStorage.updateImage(route.params?.eSign.id, oldImageId, image);
      setImagesArray(eSign.images);
    } catch (e) {
      Logger.error('updateCurrentImage failed! Error:', e);
    }
  };

  return (
    <Container>
      <Content>

        {/* <Button warning vertical
          onPress={() =>
            Toast.show({
              text: "This is a toast test!",
              buttonText: "Okay",
              position: "center", // "bottom", "top", "center"
              duration: 2000,
              type: "danger",   // "default", "success", "danger", "warning"
              onClose: (reason) => {  // reason can be "user" or "timeout"
                console.warn(reason);
              },
              // style,
              // textStyle,
              // buttonTextStyle,
              // buttonStyle
            })}
        >
          <Text>Toast test</Text>
        </Button> */}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {
            imagesArray.map(image => (
              <ImageCard
                navigation={navigation}
                route={route}
                eSignId={route.params?.eSign.id}
                image={image}
                updateImage={updateCurrentImage}
                originScreen={route.params?.originScreen}
                setImagesArray={setImagesArray}
                isImageUploadAllowed={!uploadActivated}
                uploadActivatedCallback={uploadActivatedCallback}
                uploadFinishedCallback={uploadFinishedCallback}
                // imageData={image1Raw}
                imageData={image.byteArray}
              />
            ))
          }
        </View>

        {(route.params?.originScreen !== 'Vorlagen') && (
          <Button block transparent style={{ marginTop: 20 }}>
            <TouchableOpacity
              onPress={async () => {
                const newImage = await eSignsStorage.addImage(route.params?.eSign.id);
                // setImagesArray(eSign.images); // blup
                navigation.navigate('EditImageScreen', {
                  title: 'Neues Bild',
                  image: newImage,
                  updateImage: updateCurrentImage.bind(),
                });
              }}
            >
              <Icon name="add-circle" style={{ color: 'orange', fontSize: 40 }} />
            </TouchableOpacity>
          </Button>
        )}
        {/* {(route.params?.originScreen !== 'Vorlagen') && (
          <Button block transparent>
            <TouchableOpacity
              onPress={async () => {
                const eSign = await eSignsStorage.deleteImage(route.params?.eSign.id);
                setImagesArray(eSign.images);
              }}
            >
              <Icon name="remove-circle" style={{ color: 'red', fontSize: 40 }} />
            </TouchableOpacity>
          </Button>
        )} */}

      </Content>
    </Container>
  );
}

export default ESignScreen;
