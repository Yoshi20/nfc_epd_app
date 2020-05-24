import React, {useState} from 'react';
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

function EditImage({ navigation, route }) {

  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            <Image source={route.params.imagePath} style={{height: 200, width: '100%'}}/>
          </Row>
          <Row>
            <Col>
              <TouchableOpacity>
                <Text>Invertieren</Text>
                <Icon name="contrast" style={{color: "black", fontSize: 40}} />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity>
                <Text>Ersetzen</Text>
                <Icon name="construct" style={{color: "black", fontSize: 40}} />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity>
                <Text>Drehen</Text>
                <Icon name="refresh" style={{color: "black", fontSize: 40}} />
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}

export default EditImage;
