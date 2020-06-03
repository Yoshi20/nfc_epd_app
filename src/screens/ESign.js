import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TextInput, Alert, TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text, View} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageCard from '../components/ImageCard';

import image1Raw from '../assets/images/testRaw/image1';
import image5Raw from '../assets/images/testRaw/image5';

const ninjaJpgSrc = require('../assets/images/testJpg/ninja.jpg');
const mobyJpgSrc = require('../assets/images/testJpg/moby.jpg');

function ESign({ navigation, route }) { // route.params: name, images
  const [name, setName] = useState(route.params?.name);
  const [uploadActivated, setUploadActivated] = useState(false);

  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: route.params?.name,
      // headerTitle: <TextInput>{name}</TextInput>,
      headerTitle: (
        <TextInput
          style={{ display: 'block', height: '100%', width: '100%', borderColor: 'white'}}
          placeholder="Type here to translate!"
          onChangeText={text => setName(text)}
          defaultValue={name}
        />
      ),
      headerRight: () => (
        <Grid style={{ marginTop: 5 }}>
          <Col style={{ marginRight: 30 }}>
            <TouchableOpacity onPress={() => {
              Alert.alert(
                'E-Signe wirklich löschen?',
                'Dieser Schritt kann nicht rückgängig gemacht werden.',
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
              <Icon name="trash" style={{ color: 'white', fontSize: 40 }} />
            </TouchableOpacity>
          </Col>
          <Col style={{ marginRight: 20 }}>
            <TouchableOpacity onPress={() => Alert.alert('Alert', 'Touched')}>
              <Icon name="paper-plane" style={{ color: 'white', fontSize: 40 }} />
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

        <ImageCard
          isImageUploadAllowed={!uploadActivated}
          uploadActivatedCallback={uploadActivatedCallback}
          uploadFinishedCallback={uploadFinishedCallback}
          imagePath={mobyJpgSrc}
          imageData={image5Raw}
          navigation={navigation}
          route={route}

        />
        <ImageCard
          isImageUploadAllowed={!uploadActivated}
          uploadActivatedCallback={uploadActivatedCallback}
          uploadFinishedCallback={uploadFinishedCallback}
          imagePath={ninjaJpgSrc}
          imageData={image1Raw}
          navigation={navigation}
          route={route}
        />

        <Button block transparent>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddImage', {});
            }}
          >
            <Icon name="add-circle" style={{ color: 'orange', fontSize: 40 }} />
          </TouchableOpacity>
        </Button>

      </Content>
    </Container>
  );
}

export default ESign;
