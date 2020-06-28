import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

function NavigationFooter({ state, navigation }) {
  return (
    <Footer>
      <FooterTab>

        <Button
          vertical
          active={state.index === 0}
          onPress={() => { navigation.navigate('HomeTab', { screen: 'HomeScreen' }); }}
        >
          <Icon name="images" />
          <Text>Meine E-Signs</Text>
        </Button>

        <Button
          vertical
          active={state.index === 1}
          onPress={() => { navigation.navigate('VorlagenTab', { screen: 'VorlagenScreen' }); }}
        >
          <Icon name="easel" />
          <Text>Vorlagen</Text>
        </Button>

        <Button
          vertical
          active={state.index === 3}
          onPress={() => { navigation.navigate('SettingsTab', { screen: 'SettingsScreen' }); }}
        >
          <Icon name="settings" />
          <Text>Einstellungen</Text>
        </Button>

      </FooterTab>
    </Footer>
  );
}

export default NavigationFooter;
