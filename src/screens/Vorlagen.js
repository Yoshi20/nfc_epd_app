import React, { useState } from 'react';
import { Button, Icon, Container, Content, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ESignCard from '../components/ESignCard';
import { LocalStorage } from '../services';

const babyJpgSrc = require('../assets/images/testJpg/baby.jpg');
const mobyJpgSrc = require('../assets/images/testJpg/moby.jpg');
const ninjaJpgSrc = require('../assets/images/testJpg/ninja.jpg');

import imageDataNinja from '../assets/images/testRaw/image1';
import imageDataMoby from '../assets/images/testRaw/image5';

function Vorlagen({ navigation, route }) {
  const [eSigns, setESigns] = useState([]);

  // LocalStorage.setString('test', 'test123');
  // const test = LocalStorage.getString('test');
  // console.log('test: ', test);

  // LocalStorage.setObject('eSigns', { name: 'E-Sign Vorlage #1', images: [mobyJpgSrc, babyJpgSrc] });

  // const eSigns = LocalStorage.getObject('eSigns');
  // console.log('eSigns: ', eSigns.name);

  const eSign1 = {
    name: 'E-Sign Vorlage #1',
    images: [{ path: '/images/moby.jpg', byteArray: imageDataMoby, pos: 0 }],
  };
  const eSign2 = {
    name: 'E-Sign Vorlage #2',
    images: [
      { path: '/images/ninja.jpg', byteArray: imageDataNinja, pos: 0 },
      { path: '/images/moby.jpg', byteArray: imageDataMoby, pos: 1 }
    ],
  };
  const eSign3 = {
    name: 'E-Sign Vorlage #3',
    images: [
      { path: '/images/baby.jpg', pos: 0 },
      { path: '/images/ninja.jpg', byteArray: imageDataNinja, pos: 1 },
      { path: '/images/moby.jpg', byteArray: imageDataMoby, pos: 2 }
    ],
  };

  return (
    <Container>
      <Content>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <ESignCard
            navigation={navigation}
            eSign={eSign1}
            originScreen="Vorlagen"
          />
          <ESignCard
            navigation={navigation}
            eSign={eSign2}
            originScreen="Vorlagen"
          />
          <ESignCard
            navigation={navigation}
            eSign={eSign3}
            originScreen="Vorlagen"
          />
        </View>

      </Content>
    </Container>
  );
}

export default Vorlagen;
