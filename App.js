// npx react-native start
// npx react-native run-android
import 'react-native-gesture-handler';

import React from 'react';
import {
  Image,
  TouchableOpacity
} from 'react-native'
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
// https://reactnavigation.org/docs/getting-started
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomeScreen } from './Screens/Home.js';
import { EditImageScreen } from './Screens/EditImage.js';
import { AddImageScreen } from './Screens/AddImage.js';
import { AmazingCropperScreen } from './Screens/AmazingCropper.js';
import { VorlagenScreen } from './Screens/Vorlagen.js';
import { KameraScreen } from './Screens/Kamera.js';
import { SettingsScreen } from './Screens/Settings.js';

import { NavigationFooter } from './NavigationFooter.js';

require('./Globals.js');

const Stack = createStackNavigator();
export default function App() {
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator tabBar={props => <NavigationFooter {...props} />} screenOptions={headerScreenOptions}>
          <Stack.Screen name="Tabs" component={Tabs} options={{headerShown: false}}/>
          {/* Screens without a tab footer */}
          <Stack.Screen name="EditImage" component={EditImageScreen} options={{headerTitle: 'Bild bearbeiten'}}/>
          <Stack.Screen name="AddImage" component={AddImageScreen} options={{headerTitle: 'Bild hinzufügen'}}/>
          <Stack.Screen name="AmazingCropper" component={AmazingCropperScreen} options={{headerTitle: 'Bild zuschneiden'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator tabBar={props => <NavigationFooter {...props} />}>
      <Tab.Screen name="Home" component={HomeStackScreen}/>
      <Tab.Screen name="Vorlagen" component={VorlagenStackScreen}/>
      <Tab.Screen name="Kamera" component={KameraStackScreen}/>
      <Tab.Screen name="Settings" component={SettingsStackScreen}/>
    </Tab.Navigator>
  );
}

// ---------------------------------------

const headerScreenOptions = {
  headerStyle: {backgroundColor: '#3F51B5'},
  headerTintColor: '#fff',
  headerTitleAlign: 'center',
  headerTitleStyle: {fontSize: 24},
  headerBackImage: () => (
    <Icon name="arrow-round-back" style={{color: "white", fontSize: 40}} />
  )
}

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={headerScreenOptions}>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{headerTitle: 'E-Türschilder'}}/>
      {/* <HomeStack.Screen name="EditImage" component={EditImageScreen} options={{headerTitle: 'Bild bearbeiten'}}/> */}
      {/* <HomeStack.Screen name="AddImage" component={AddImageScreen} options={{headerTitle: 'Bild hinzufügen'}}/> */}
      {/* <HomeStack.Screen name="AmazingCropper" component={AmazingCropperScreen} options={{headerTitle: 'Bild zuschneiden'}}/> */}
    </HomeStack.Navigator>
  );
}

const VorlagenStack = createStackNavigator();
function VorlagenStackScreen() {
  return (
    <VorlagenStack.Navigator screenOptions={headerScreenOptions}>
      <VorlagenStack.Screen name="Vorlagen" component={VorlagenScreen} 
        options={{
          headerRight: () => (
            <Button vertical
              onPress={() => {alert('blup');}}
            >
              <Icon name="checkmark" style={{color: "white", fontSize: 40}} />
            </Button>
          ),
        }}
      />
    </VorlagenStack.Navigator>
  );
}

const KameraStack = createStackNavigator();
function KameraStackScreen() {
  return (
    <KameraStack.Navigator screenOptions={headerScreenOptions}>
      <KameraStack.Screen name="Kamera" component={KameraScreen}/>
    </KameraStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();
function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={headerScreenOptions}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen}/>
    </SettingsStack.Navigator>
  );
}