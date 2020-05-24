import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import RootStackNavigator from './navigators/RootStackNavigator';

const Router = () => {
  return (
    <NavigationContainer>
      <RootStackNavigator />
    </NavigationContainer>
  );
};

export default Router;
