/* eslint-disable max-len */
import React, { useState } from 'react';
import { Platform, Alert, Image, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Text, Toast, Card, CardItem } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import ImageLoad from 'react-native-image-placeholder';
import RNFS from 'react-native-fs';
import { eSignsStorage } from '../services';

import { PATHS } from '../constants';

function ESignCard(props) {
  const {
    navigation,
    eSign,
    originScreen
  } = props;

  const [selected, setSelected] = useState(false);

  return (
    <Card style={{ width: '48%' }}>
      <TouchableOpacity
        onPress={() => {
          if (selected) setSelected(false);
          else navigation.navigate('ESignScreen', { eSign, originScreen });
        }}
        onLongPress={() => {
          if (originScreen === 'Vorlagen') {
            navigation.navigate('ESignScreen', { eSign, originScreen });
          } else {
            setSelected(!selected);
            Alert.alert(
              'Dieses E-Sign löschen?',
              'Alle Bilder dieses E-Singes werden gelöscht. Dieser Schritt kann nicht rückgängig gemacht werden.',
              [
                {
                  text: 'Nein',
                  style: 'cancel',
                  onPress: () => {
                    setSelected(false);
                  }
                },
                {
                  text: 'Ja',
                  onPress: async () => {
                    setSelected(false);
                    await eSignsStorage.deleteESign(eSign.id);
                    navigation.navigate(`${originScreen}Screen`); // ugly workaround to trigger a reload
                  }
                }
              ],
              { cancelable: false }
            );
          }
        }}
      >
        <CardItem cardBody style={{ padding: 5, paddingBottom: 5, backgroundColor: selected ? 'lightblue' : 'white' }}>
          <Grid>
            <Row size={20} style={{ paddingBottom: 5 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text adjustsFontSizeToFit numberOfLines={1} style={{ fontWeight: 'bold' }}>{eSign.name}</Text>
              </View>
            </Row>

            {/* blup: */}
            {/* <Text>{eSign.images.length}</Text>
            <Text>{'paths:'}</Text>
            {eSign.images.map(image => (
              <Text>{Platform.OS === 'ios' ? image.path : `${originScreen === 'Vorlagen' ? 'asset:/' : 'file:/'}${image.path}` }</Text>
            ))} */}

            <Row size={80}>
              {(eSign.images.length === 0) && (
                // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                //   <Icon name="laptop" style={{ height: 100, paddingTop: 35 }} />
                // </View>
                <ImageLoad
                  style={{ height: 100, width: '100%' }}
                  source={{ uri: 'file' }}
                />
              )}
              {(eSign.images.length > 0) && (
                eSign.images.map(image => (
                  <Image
                    style={{ height: 100, width: `${100 / eSign.images.length}%` }}
                    source={{ uri: Platform.OS === 'ios' ? image.path : `${originScreen === 'Vorlagen' ? 'asset://' : 'file://'}${image.path}` }}
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
