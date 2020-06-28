import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ESignScreen from '../../../screens/ESignScreen';
import EditImageScreen from '../../../screens/EditImageScreen';
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
        name="EditImageScreen"
        options={{ headerTitle: 'Bild bearbeiten' }}
        component={EditImageScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
