import React from 'react';
import { Root } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Router from './components/routing/Router';

export default function App() {
  return (
    <SafeAreaProvider>
      <Root>
        <Router />
      </Root>
    </SafeAreaProvider>
  );
}