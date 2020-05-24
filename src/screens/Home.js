import React from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container, Header, Content, Footer, FooterTab,
  Button,
  Icon, // https://ionicframework.com/docs/v3/ionicons/
  Text,
  Root,
  Toast,
  Card, CardItem,
  Left, Body, Right, View,
  Grid, Row, Col,
} from 'native-base';
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

import ImageCard from '../components/ImageCard';
import image1Raw from '../assets/imgs/testRaw/image1';
import image5Raw from '../assets/imgs/testRaw/image5';

const ninjaJpgSrc = require('../assets/imgs/testJpg/ninja.jpg');
const mobyJpgSrc = require('../assets/imgs/testJpg/moby.jpg');

function Home({ navigation, route }) {
  const [uploadActivated, setUploadActivated] = React.useState(false);

  React.useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

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

export default Home;
