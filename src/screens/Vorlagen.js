import React, { useState, useEffect, useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, Content, Button, Icon, Text, Toast, View } from 'native-base';

import ESignCard from '../components/ESignCard';
import image1Raw from '../assets/imgs/testRaw/image1';
import image5Raw from '../assets/imgs/testRaw/image5';


const babyJpgSrc = require('../assets/imgs/testJpg/baby.jpg');
const mobyJpgSrc = require('../assets/imgs/testJpg/moby.jpg');
const ninjaJpgSrc = require('../assets/imgs/testJpg/ninja.jpg');



function Vorlagen() {
  return (
    <Container>
      <Content>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <ESignCard name={'E-Sign Vorlage #1'} image1={babyJpgSrc} />
          <ESignCard name={'E-Sign Vorlage #2'} image1={mobyJpgSrc} image2={babyJpgSrc} />
          <ESignCard name={'E-Sign Vorlage #3'} image1={mobyJpgSrc} image2={babyJpgSrc} image3={ninjaJpgSrc} />
        </View>
      </Content>
    </Container>
  );
}

export default Vorlagen;
