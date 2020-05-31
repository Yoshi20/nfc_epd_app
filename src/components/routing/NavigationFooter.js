import React from 'react';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

function NavigationFooter({ state, navigation }) {
  return (
    <Footer>
      <FooterTab>

        <Button
          vertical
          active={state.index === 0}
          onPress={() => { navigation.navigate('Home', { }); }}
        >
          <Icon name="images" />
          <Text>Meine E-Signs</Text>
        </Button>

        <Button
          vertical
          active={state.index === 1}
          onPress={() => { navigation.navigate('Vorlagen', { }); }}
        >
          <Icon name="easel" />
          <Text>Vorlagen</Text>
        </Button>

        <Button
          vertical
          active={state.index === 3}
          onPress={() => { navigation.navigate('Settings', { }); }}
        >
          <Icon name="settings" />
          <Text>Einstellungen</Text>
        </Button>

      </FooterTab>
    </Footer>
  );
}

export default NavigationFooter;
