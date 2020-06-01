import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

function EditImage({ route }) {
  return (
    <Container>
      <Content>
        <Grid>
          <Row>
            <Image source={route.params.imagePath} style={{ height: 200, width: '100%' }} />
          </Row>
          <Row>
            <Col>
              <TouchableOpacity>
                <Text>Invertieren</Text>
                <Icon name="contrast" style={{ color: 'black', fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity>
                <Text>Ersetzen</Text>
                <Icon name="construct" style={{ color: 'black', fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
            <Col>
              <TouchableOpacity>
                <Text>Drehen</Text>
                <Icon name="refresh" style={{ color: 'black', fontSize: 40 }} />
              </TouchableOpacity>
            </Col>
          </Row>
        </Grid>
      </Content>
    </Container>
  );
}

export default EditImage;
