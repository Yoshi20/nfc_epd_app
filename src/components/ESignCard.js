/* eslint-disable max-len */
import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text, Toast, Card, CardItem, Grid, Row, Col } from 'native-base';

function ESignCard({ navigation, route, name, images }) {

  const imagesList = [];
  for (let i = 0; i < images.length; i += 1) {
    imagesList.push(
      <Image source={images[i]} style={{ height: 100, width: `${100 / images.size}%` }} />
    );
  }

  return (
    <Card style={{ width: '49%' }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ESign', { name: 'E-Sign Vorlage #1', images });
        }}
      >
        <CardItem cardBody style={{ padding: 5, paddingBottom: 5 }}>
          <Grid>
            <Row size={20} style={{ paddingBottom: 5 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontWeight: 'bold' }}>{name}</Text>
              </View>
            </Row>

            <Row size={80}>
              {imagesList}
            </Row>

          </Grid>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}

export default ESignCard;
