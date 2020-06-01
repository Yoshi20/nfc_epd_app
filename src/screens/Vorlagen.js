import React, { useState } from 'react';
import { Button, Icon, Container, Content, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ESignCard from '../components/ESignCard';
import { LocalStorage } from '../services';

const babyJpgSrc = require('../assets/imgs/testJpg/baby.jpg');
const mobyJpgSrc = require('../assets/imgs/testJpg/moby.jpg');
const ninjaJpgSrc = require('../assets/imgs/testJpg/ninja.jpg');

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
            images={[babyJpgSrc]}
          />
          <ESignCard
            navigation={navigation}
            route={route}
            name="E-Sign Vorlage #2"
            images={[mobyJpgSrc, babyJpgSrc]}
          />
          <ESignCard
            navigation={navigation}
            route={route}
            name="E-Sign Vorlage #3"
            images={[mobyJpgSrc, babyJpgSrc, ninjaJpgSrc]}
          />
        </View>

      </Content>
    </Container>
  );
}

export default Vorlagen;
