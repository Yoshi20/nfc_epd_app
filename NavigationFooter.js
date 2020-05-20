import React from 'react';
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

export function NavigationFooter({ state, descriptors, navigation }) {
  return (
    <Footer>
      <FooterTab>

        <Button vertical active={state.index === 0}
          onPress={() => {navigation.navigate('Home', { });}}
        >
          <Icon name="images" />
          <Text>Bilder</Text>
        </Button>

        <Button vertical active={state.index === 1}
          onPress={() => {navigation.navigate('Vorlagen', { });}}
        >
          <Icon name="easel" />
          <Text>Vorlagen</Text>
        </Button>

        <Button vertical active={state.index === 2}
          onPress={() => {navigation.navigate('Kamera', { });}}
        >
          <Icon name="camera" />
          <Text>Kamera</Text>
        </Button>

        <Button vertical active={state.index === 3}
          onPress={() => {navigation.navigate('Settings', { });}}
        >
          <Icon name="settings" />
          <Text>Settings</Text>
        </Button>

      </FooterTab>
    </Footer>
  );
}
