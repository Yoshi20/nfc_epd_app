/* eslint-disable max-len */
import React, { useState } from 'react';
import { Platform, Alert, Image, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text, Toast, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageLoad from 'react-native-image-placeholder';
import RNFS from 'react-native-fs';

import { PATHS } from '../constants';

function ESignCard({ navigation, route, eSign, name, images, screen }) {

  return (
    <Card style={{ width: '48%' }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ESign', { navigation, route, eSign, name, images, screen });
        }}
      >
        <CardItem cardBody style={{ padding: 5, paddingBottom: 5 }}>
          <Grid>
            <Row size={20} style={{ paddingBottom: 5 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontWeight: 'bold' }}>{eSign.name}</Text>
              </View>
            </Row>

            {/* blup: */}
            {/* <Text>{images.length}</Text>
            <Text>{'paths:'}</Text>
            {images.map(image => (
              <Text>{Platform.OS === 'ios' ? image.path : `${screen === 'Vorlagen' ? 'asset:/' : 'file:/'}${image.path}` }</Text>
            ))} */}

            <Row size={80}>
              {(images.length === 0)
                && (
                  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  //   <Icon name="laptop" style={{ height: 100, paddingTop: 35 }} />
                  // </View>
                  <ImageLoad
                    source={{ uri: 'file' }}
                    style={{ height: 100, width: '100%' }}
                  />
                )}
              {(images.length > 0)
                && (
                  images.map(image => (
                    <Image
                      source={{ uri: Platform.OS === 'ios' ? image.path : `${screen === 'Vorlagen' ? 'asset://' : 'file://'}${image.path}` }}
                      style={{ height: 100, width: `${100 / images.length}%` }}
                    />
                  ))
                )}
            </Row>
          </Grid>
        </CardItem>
      </TouchableOpacity>
    </Card>
  );
}

export default ESignCard;
