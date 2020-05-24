import React, { useState } from 'react';
import {
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';
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

import { ST25DV } from '../services';

function ImageCard(props) {
  const [uploading, setUploading] = useState(false);
  const [uploadingStarted, setUploadingStarted] = useState(false);

  function uploadStarted() {
    Toast.show({ text: 'Übertragung gestartet. Bitte warten...', duration: 60000 });
    setUploadingStarted(true);
  }

  function uploadOk() {
    Toast.show({
      text: 'Übertragung war erfolgreich!',
      duration: 3000,
      type: 'success',
    });
    setUploading(false);
    setUploadingStarted(false);
    props.uploadFinishedCallback();
  }

  function uploadFailed() {
    Toast.show({
      text: 'Übertragung ist fehlgeschlagen! Versuche es erneut',
      duration: 3000,
      type: 'danger',
    });
    setUploading(false);
    setUploadingStarted(false);
    props.uploadFinishedCallback();
  }

  return (
    <Card>
      <CardItem cardBody style={{ padding: 5 }}>
        <Grid>
          <Col size={90}>
            <Image source={props.imagePath} style={{ height: 200, width: '100%' }} />
            {uploadingStarted && <UIActivityIndicator style={{ position: 'absolute', top: '39%', left: '43%' }} color="orange" />}
            {/* {uploadingStarted && <PacmanIndicator style={{position: 'absolute', top: '37%', left: '40%'}} color='orange'></PacmanIndicator>} */}
            {/* {uploadingStarted && <BallIndicator style={{position: 'absolute', top: '37%', left: '40%'}} color='orange'></BallIndicator>} */}
            {/* {uploadingStarted && <BarIndicator style={{position: 'absolute', top: '37%', left: '40%'}} color='orange'></BarIndicator>} */}
            {/* {uploadingStarted && <SkypeIndicator style={{position: 'absolute', top: '37%', left: '40%'}} color='orange'></SkypeIndicator>} */}
            {/* {uploadingStarted && <MaterialIndicator style={{position: 'absolute', top: '37%', left: '40%'}} color='orange'></MaterialIndicator>} */}

          </Col>
          <Col size={10} style={{ paddingLeft: 5 }}>
            <Row>
              <Button transparent>
                {!uploading
                  && (
                  <TouchableOpacity
                    disabled={!props.isImageUploadAllowed}
                    onPress={() => {
                      props.uploadActivatedCallback();
                      ST25DV.uploadImage(props.imageData, uploadStarted, uploadOk, uploadFailed);
                      setUploading(true);
                      Toast.show({ text: 'Bild kann nun via NFC aufs Display geladen werden', duration: 3000 });
                    }}
                  >
                    <Icon name="paper-plane" style={{ color: props.isImageUploadAllowed ? 'black' : 'grey', fontSize: 40, marginTop: 20, marginLeft: 0, marginRight: 0 }} />
                    {/* <Icon name="paw" style={{color: "black", fontSize: 40, marginTop: 20, marginLeft: 1, marginRight: 0}} /> */}
                    {/* <Icon name="color-wand" style={{color: "black", fontSize: 40, marginTop: 20, marginLeft: 2, marginRight: 0}} /> */}
                    {/* <Icon name="wifi" style={{color: "black", fontSize: 40, marginTop: 20, marginLeft: 1, marginRight: 0}} /> */}
                    {/* <Image source={ images/nfc-icon.jpg } style={{marginTop: 7, marginBottom: 'auto', marginLeft: -2}} /> */}
                  </TouchableOpacity>
                  )}
                {uploading
                  && (
                  <TouchableOpacity
                    onPress={() => {
                      ST25DV._cancel();
                      setUploading(false);
                      setUploadingStarted(false);
                      props.uploadFinishedCallback();
                      Toast.show({ text: 'Übertragung wurde abgebrochen' });
                    }}
                  >
                    {/* <Icon name="close" style={{color: "black", fontSize: 40, marginTop: 20, marginLeft: 6, marginRight: 0}} /> */}
                    <Icon name="close-circle" style={{ color: 'black', fontSize: 40, marginTop: 20, marginLeft: 1, marginRight: 0 }} />
                  </TouchableOpacity>
                  )}
              </Button>
            </Row>
            <Row>
              <Button transparent>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('EditImage', { imagePath: props.imagePath });
                  }}
                >
                  <Icon name="create" style={{ color: 'black', fontSize: 40, marginTop: 20, marginLeft: 3, marginRight: 0 }} />
                </TouchableOpacity>
              </Button>
            </Row>
            <Row>
              <Button transparent>
                <TouchableOpacity onPress={() => {
                  Alert.alert(
                    'Bild wirklich löschen?',
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
                  <Icon name="trash" style={{ color: 'black', fontSize: 40, marginTop: 20, marginLeft: 5, marginRight: 0 }} />
                </TouchableOpacity>
              </Button>
            </Row>
          </Col>
        </Grid>
      </CardItem>
    </Card>
  );
}

export default ImageCard;
