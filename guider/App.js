import * as React from 'react';
import { Button, View, Text, Image, AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './components/styles';
import HomeScreen from './components/HomeScreen';
import ChooseScreen from './components/ChooseScreen';
import EnterDataScreen from './components/EnterDataScreen';
import StepsScreen from './components/StepsScreen';
import FinishScreen from './components/FinishScreen';
import GalleryScreen from './components/GalleryScreen';
import Ionicons from 'react-native-ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, si } from './assets/strings.js';

import {
  createAppContainer,
  createSwitchNavigator,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createNativeStackNavigator();

i18n.fallbacks = true;
i18n.translations = { en, si };

function App() {
  //options={{ headerShown: false }}

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            headerTransparent: true,
            cardOverlay: true,
            headerTitleStyle: {
              color: 'white',
            },
          },
        }}
        initialRouteName="Home">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="ChooseScreen"
          component={ChooseScreen}
          options={{
            title: '',
            headerTitleAlign: 'center',
            fontFamily: 'OpenSans',
            headerTintColor: 'black',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="GalleryScreen"
          component={GalleryScreen}
          options={{
            title: '',
            headerTitleAlign: 'center',
            fontFamily: 'OpenSans',
            headerTintColor: 'black',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="EnterDataScreen"
          component={EnterDataScreen}
          options={{
            title: '',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTransparent: true,
          }}
        />

     
        <Stack.Screen
          name="StepsScreen"
          component={StepsScreen}
          options={{
             title: '',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTransparent: true,
          }}
        />
        <Stack.Screen
          name="FinishScreen"
          component={FinishScreen}
          options={{
          title: '',
           headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerTransparent: true,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
