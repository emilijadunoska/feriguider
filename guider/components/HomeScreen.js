import * as React from 'react';
import {useState} from "react";
import {
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
import flags from '../assets/flags.json';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import { en, si } from '../assets/strings.js';

function HomeScreen({ navigation }) {

  const [data, setData] = React.useState(0);
  const [lang, setLang] = React.useState('en');

  function loadData() {
    let url = 'https://api.npoint.io/1ec8a81bbd7f294a1e85';
    try {
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((newData) => {
          setData(newData);
        });
    } catch (err) {
      console.log('there was an error', err);
    }
  }

  React.useEffect(() => {
    i18n.locale = lang;
  },[lang]);

  loadData();

  /**  <TouchableOpacity onPress={() => {
        i18n.locale = Localization.locale;
      }}>
        <Text style={styles.languageBtn}>sys</Text>
      </TouchableOpacity> */

  return (
    <SafeAreaView style={{marginTop: 0,}}>
      <StatusBar background="gray" />
      <ImageBackground
        source={require('../assets/white.png')}
        style={styles.background}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setLang('si');
              }}>
              <Text style={styles.languageBtn}>{flags.SI.emoji} </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setLang('en');
              }}>
              <Text style={styles.languageBtn}>{flags.GB.emoji}</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('../assets/Location_preview.jpg')}
              style={{ alignSelf: 'center', width: 300, height: 290, top: 35 }}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#2b3858',
                fontSize: 15,
              }}>
              {i18n.t('welcomeTo')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#2b3858',
                fontSize: 50,
              }}>
              FERI UM
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                color: '#79a1f8',
                fontSize: 25,
              }}>
              {i18n.t('g2EntranceGuider')}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#2b3858',
                fontSize: 11,
                padding: 10,
              }}>
              {i18n.t('moto')}
            </Text>
          </View>
        </View>

        <View
          style={{ right: 10, left: 10, position: 'absolute', bottom: 30 }}>
          <View style={{ bottom: 28 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GalleryScreen');
              }}>
              <Text style={styles.galleryBtn}>{i18n.t('gallery')} </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              if (data != 0) navigation.navigate('ChooseScreen', { data });
            }}>
            <Text style={styles.getstartedBtn}>
              {data != 0 ? i18n.t('getStarted') : i18n.t('loading') + '...'}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default HomeScreen;
