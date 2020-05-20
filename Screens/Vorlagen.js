import React from 'react';
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
} from 'native-base';
import { useFocusEffect } from '@react-navigation/native';

export function VorlagenScreen({ navigation, route }) {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     alert("Vorlagen screen is focused");
  //     return () => {
  //       alert("Vorlagen screen is unfocused");
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  return (
    <Container>
      <Content>

        <Text>Vorlagen Screen</Text>

      </Content>
    </Container>
  );
}
