import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon } from 'native-base';

function ESign({ navigation, route }) {
  const [uploadActivated, setUploadActivated] = useState(false);

  useEffect(() => {
    if (route.params?.post) {
      // Post updated, do something with `route.params.post`
      // For example, send the post to the server
    }
  }, [route.params?.post]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => console.log('ESign screen button pressed')} title="Update count" />
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
