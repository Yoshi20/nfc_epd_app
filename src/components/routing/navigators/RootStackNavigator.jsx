import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ESignScreen from '../../../screens/ESignScreen';
import ImageScreen from '../../../screens/ImageScreen';
import BottomTabNavigator from './BottomTabNavigator';

const RootStackNavigator = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3F51B5' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="BottomTabNavigator"
        options={{ headerShown: false }}
        component={BottomTabNavigator}
      />
      <Stack.Screen
        name="ESignScreen"
        component={ESignScreen}
      />
      <Stack.Screen
        name="ImageScreen"
        options={{ headerTitle: 'Bild bearbeiten' }}
        component={ImageScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
