import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

function NavigationFooter({ state, navigation }) {
  return (
    <Footer>
      <FooterTab>

        <Button
          vertical
          active={state.index === 0}
          onPress={() => { navigation.navigate('HomeTab', { screen: 'Home' }); }}
        >
          <Icon name="images" />
          <Text>Meine E-Signs</Text>
        </Button>

        <Button
          vertical
          active={state.index === 1}
          onPress={() => { navigation.navigate('VorlagenTab', { screen: 'Vorlagen' }); }}
        >
          <Icon name="easel" />
          <Text>Vorlagen</Text>
        </Button>

        <Button
          vertical
          active={state.index === 3}
          onPress={() => { navigation.navigate('SettingsTab', { screen: 'Settings' }); }}
        >
          <Icon name="settings" />
          <Text>Einstellungen</Text>
        </Button>

      </FooterTab>
    </Footer>
  );
}

export default NavigationFooter;
