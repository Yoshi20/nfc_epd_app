import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TextInput, Alert, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text, View} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageCard from '../components/ImageCard';

import image1Raw from '../assets/images/testRaw/image1';
import image5Raw from '../assets/images/testRaw/image5';

const ninjaJpgSrc = require('../assets/images/testJpg/ninja.jpg');
const mobyJpgSrc = require('../assets/images/testJpg/moby.jpg');

function ESign({ navigation, route }) { // route.params: name, images, screen
  // const [name, setName] = useState(route.params?.name);
  const [imagesArray, setImagesArray] = useState(route.params?.images);
  const [uploadActivated, setUploadActivated] = useState(false);

  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: route.params?.name,
      // headerTitle: (
      //   <TextInput
      //     style={{height: 40, borderColor: 'white', borderWidth: 1}}
      //     onChangeText={text => setName(text)}
      //     value={name}
      //   />
      // ),
      headerRight: () => (
        <Grid style={{ marginTop: 5 }}>
          {route.params?.screen !== 'Vorlagen'
            && (
              <Col style={{ marginTop: 4, marginRight: 30 }}>
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    'E-Signe wirklich löschen?',
                    'Alle Bilder dieses E-Singes werden gelöscht. Dieser Schritt kann nicht rückgängig gemacht werden.',
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
                  <Icon name="trash" style={{ color: 'white', fontSize: 36 }} />
                </TouchableOpacity>
              </Col>
            )}
          <Col style={{ marginRight: 10 }}>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'Alle Bilder aufs E-Signe laden?',
                'Schalte die NFC Funktion ein und lege dein Handy auf die Mitte des E-Signes.',
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

  const addImage = async () => {
    try {
      const newImage = {
        pos: imagesArray.length,
        path: '',
      };
      const newImagesArray = imagesArray.slice(); // copy the state array
      newImagesArray.push(newImage);
      // await AsyncStorage.setItem('imagesArray', JSON.stringify(newImagesArray));
      setImagesArray(newImagesArray);
    } catch (e) {
      Logger.error('AddImage failed! Error:', e);
    }
  };

  const deleteImage = async () => {
    try {
      const newImagesArray = imagesArray.slice(); // copy the state array
      newImagesArray.pop();
      // await AsyncStorage.setItem('imagesArray', JSON.stringify(newImagesArray));
      setImagesArray(newImagesArray);
    } catch (e) {
      Logger.error('deleteImage failed! Error:', e);
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
                image={image}
                screen={route.params?.screen}
                isImageUploadAllowed={!uploadActivated}
                uploadActivatedCallback={uploadActivatedCallback}
                uploadFinishedCallback={uploadFinishedCallback}
                // imageData={image1Raw}
                imageData={image.byteArray}
              />
            ))
          }
        </View>

        {route.params?.screen !== 'Vorlagen'
          && (
            <Button block transparent>
              <TouchableOpacity
                onPress={() => {
                  // navigation.navigate('AddImage', {});
                  addImage();
                }}
              >
                <Icon name="add-circle" style={{ color: 'orange', fontSize: 40 }} />
              </TouchableOpacity>
            </Button>
          )}
        {route.params?.screen !== 'Vorlagen'
          && (
            <Button block transparent>
              <TouchableOpacity
                onPress={() => {
                  deleteImage();
                }}
              >
                <Icon name="remove-circle" style={{ color: 'red', fontSize: 40 }} />
              </TouchableOpacity>
            </Button>
          )}

      </Content>
    </Container>
  );
}

export default ESign;
