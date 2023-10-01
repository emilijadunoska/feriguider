import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';
import i18n from 'i18n-js';

export default function FinishScreen({
  navigation,
  goBack,
  vsebina,
  currentIndex,
  index,
}) {
  return (
    <SafeAreaView
      style={{
        marginTop: 0,
      }}>
      <StatusBar background="gray" />
      <ImageBackground
        source={require('../assets/white.png')}
        style={styles.background}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/finish.jpg')}
            style={{ top: 40, alignSelf: 'center', width: 300, height: 300 }}
          />
        </View>

        <View>
          <Image
            source={require('../assets/confetti-40.gif')}
            style={{
              alignSelf: 'center',
              width: 300,
              height: 300,
              position: 'absolute',
            }}
          />

          <View
            style={{ top: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text
              style={{
                marginVertical: 20,
                color: '#2b3858',
                fontSize: 20,
                textAlign: 'center',
                marginHorizontal: 20,
                fontFamily: 'Montserrat_400Regular',
              }}>
              {i18n.t('finish')}
            </Text>
          </View>

          <View style={{ marginVertical: 50 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                navigation.goBack();
                navigation.goBack();
                navigation.goBack();
                navigation.goBack();
              }}>
              <Text style={styles.getstartedBtn}>{i18n.t('close')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
