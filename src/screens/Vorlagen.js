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
  
  return (
    <Container>
      <Content>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <ESignCard
            navigation={navigation}
            route={route}
            name="E-Sign Vorlage #1"
            // images={[babyJpgSrc]}
            images={[{ path: '/images/moby.jpg', byteArray: imageDataMoby, pos: 0 }]}
            screen="Vorlagen"
          />
          <ESignCard
            navigation={navigation}
            route={route}
            name="E-Sign Vorlage #2"
            // images={[mobyJpgSrc, babyJpgSrc]}
            images={[{ path: '/images/ninja.jpg', byteArray: imageDataNinja, pos: 0 }, { path: '/images/moby.jpg', byteArray: imageDataMoby, pos: 1 }]}
            screen="Vorlagen"
          />
          <ESignCard
            navigation={navigation}
            route={route}
            name="E-Sign Vorlage #3"
            // images={[mobyJpgSrc, babyJpgSrc, ninjaJpgSrc]}
            images={[{ path: '/images/baby.jpg', pos: 0 }, { path: '/images/ninja.jpg', byteArray: imageDataNinja, pos: 1 }, { path: '/images/moby.jpg', byteArray: imageDataMoby, pos: 2 }]}
            screen="Vorlagen"
          />
        </View>

      </Content>
    </Container>
  );
}

export default Vorlagen;
