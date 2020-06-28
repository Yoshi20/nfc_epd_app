import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'native-base';

import HomeScreen from '../../../screens/HomeScreen';
import VorlagenScreen from '../../../screens/VorlagenScreen';
import SettingsScreen from '../../../screens/SettingsScreen';
import NavigationFooter from '../NavigationFooter';

// since this navigator is set to headerMode: none,
// each screen must be wrapped with withStackNavigator for a header to be rendered
const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator tabBar={props => <NavigationFooter {...props} />}>
      <Tab.Screen
        name="HomeTab"
        component={withStackNavigator('HomeScreen', 'Meine E-Signs', HomeScreen)}
      />
      <Tab.Screen
        name="VorlagenTab"
        component={withStackNavigator('VorlagenScreen', 'E-Signs Vorlagen', VorlagenScreen)}
      />
      <Tab.Screen
        name="SettingsTab"
        component={withStackNavigator('SettingsScreen', 'Einstellungen', SettingsScreen, {
          headerRight: () => (
            <TouchableOpacity onPress={() => Alert.alert('Alert', 'Touched')}>
              <Icon name="checkmark" style={{ color: 'white', fontSize: 40, marginRight: 10 }} />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

const withStackNavigator = (name, headerTitle, component, extraOptions) => () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3F51B5' },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name={name}
        options={{ headerTitle, ...extraOptions }}
        component={component}
      />
    </Stack.Navigator>
  );
};

export default BottomTabNavigator;
