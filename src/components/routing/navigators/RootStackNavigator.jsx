import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import EditImage from '../../../screens/EditImage';
import AddImage from '../../../screens/AddImage';
import CropImage from '../../../screens/CropImage';
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
        name="EditImage"
        options={{ headerTitle: 'Bild bearbeiten' }}
        component={EditImage}
      />
      <Stack.Screen
        name="AddImage"
        options={{ headerTitle: 'Bild hinzufügen' }}
        component={AddImage}
      />
      <Stack.Screen
        name="CropImage"
        options={{ headerTitle: 'Bild zuschneiden' }}
        component={CropImage}
      />
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
