import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native'
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
import { useFocusEffect } from '@react-navigation/native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators'; // https://github.com/n4kz/react-native-indicators
import ST25DV from '../ST25DV.js'
import {ImageCardComponent} from '../Components/ImageCard.js';
import {image1} from '../image1.js';
import {image5} from '../image5.js';

export function HomeScreen({ navigation, route }) {

  const [uploadActivated, setUploadActivated] = React.useState(false);

  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);


  // useFocusEffect(
  //   React.useCallback(() => {
  //     alert("Home screen is focused");
  //     return () => {
  //       alert("Home screen is unfocused");
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );


  const [count, setCount] = React.useState(0);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      ),
    });
  }, [navigation, setCount]);

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

        <ImageCardComponent
          isImageUploadAllowed={!uploadActivated}
          uploadActivatedCallback={uploadActivatedCallback}
          uploadFinishedCallback={uploadFinishedCallback}
          imagePath={require('../images/moby.jpg')}
          imageData={image5()}
          navigation={navigation}
          route={route}

        />
        <ImageCardComponent
          isImageUploadAllowed={!uploadActivated}
          uploadActivatedCallback={uploadActivatedCallback}
          uploadFinishedCallback={uploadFinishedCallback}
          imagePath={require('../images/ninja.jpg')}
          imageData={image1()}
          navigation={navigation}
          route={route}
        />

        <Button block transparent>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AddImage', {});
            }}
          >
            <Icon name="add-circle" style={{color: "orange", fontSize: 40}} />
          </TouchableOpacity>
        </Button>

      </Content>
    </Container>
  );
}
