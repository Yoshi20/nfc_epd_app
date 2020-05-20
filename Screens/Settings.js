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

export function SettingsScreen({ navigation, route }) {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     alert("Settings screen is focused");
  //     return () => {
  //       alert("Settings screen is unfocused");
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );

  return (
    <Container>
      <Content>

        <Text>Settings Screen</Text>

      </Content>
    </Container>
  );
}
