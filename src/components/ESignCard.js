/* eslint-disable max-len */
import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text, Toast, Card, CardItem, Grid, Row, Col } from 'native-base';

function ESignCard({ name, image1, image2, image3, image4, image5 }) {
  return (
    <Card style={{ width: '49%' }}>
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('ESign', {name: 'E-Sign Vorlage #1', image1: image1, image2: image2, image3: image3, image4: image4, image5: image5});
        }}
      >
        <CardItem cardBody style={{ padding: 5, paddingBottom: 5 }}>
          <Grid>
            <Row size={20} style={{ paddingBottom: 5 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontWeight: 'bold' }}>{name}</Text>
              </View>
            </Row>

            {image5 && (
              <Row size={80}>
                <Image source={image1} style={{ height: 100, width: '20%' }} />
                <Image source={image2} style={{ height: 100, width: '20%' }} />
                <Image source={image3} style={{ height: 100, width: '20%' }} />
                <Image source={image4} style={{ height: 100, width: '20%' }} />
                <Image source={image5} style={{ height: 100, width: '20%' }} />
              </Row>
            )}

            {image4 && !image5 && (
              <Row size={80}>
                <Image source={image1} style={{ height: 100, width: '25%' }} />
                <Image source={image2} style={{ height: 100, width: '25%' }} />
                <Image source={image3} style={{ height: 100, width: '25%' }} />
                <Image source={image4} style={{ height: 100, width: '25%' }} />
              </Row>
            )}

            {image3 && !image4 && !image5 && (
              <Row size={80}>
                <Image source={image1} style={{ height: 100, width: '33.33%' }} />
                <Image source={image2} style={{ height: 100, width: '33.33%' }} />
                <Image source={image3} style={{ height: 100, width: '33.33%' }} />
              </Row>
            )}

            {image2 && !image3 && !image4 && !image5 && (
              <Row size={80}>
                <Image source={image1} style={{ height: 100, width: '50%' }} />
                <Image source={image2} style={{ height: 100, width: '50%' }} />
              </Row>
            )}

            {image1 && !image2 && !image3 && !image4 && !image5 && (
              <Row size={80}>
                <Image source={image1} style={{ height: 100, width: '100%' }} />
              </Row>
            )}
          </Grid>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}

export default ESignCard;
