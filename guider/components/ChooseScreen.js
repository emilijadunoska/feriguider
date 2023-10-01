import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
  Platform,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

// Employee {String.fromCharCode(8594)}
function ChooseScreen({ route, navigation }) {
  const { data } = route.params;

  let comboBoxResults = [];

  const resultsAdd = (newResult: Element) => {
    comboBoxResults.push({ title: newResult, id: comboBoxResults.length });
  };

  function filterEmployee(name) {
    let names = Object.keys(data['employees']);
    for (let i = 0; i < names.length; i++) {
      resultsAdd(names[i]);
    }
  }

  function filterBase(name) {
    for (let side = 0; side < Object.keys(data['base']).length; side++) {
      for (
        let index = 0;
        index < Object.keys(data['base'][side]).length;
        index++
      ) {
        if (data['base'][side][index] != undefined) {
          resultsAdd(data['base'][side][index]);
        }
      }
    }
  }

  function filterSides(name) {
    for (let side = 0; side < Object.keys(data['sides']).length; side++) {
      for (
        let stairs = 0;
        stairs < Object.keys(data['sides'][side]).length;
        stairs++
      ) {
        for (let turn = 0; turn < 2; ++turn) {
          for (
            let index = 0;
            index < Object.keys(data['sides'][side][stairs][turn]).length;
            index++
          ) {
            if (data['sides'][side][stairs][turn][index] != undefined) {
              resultsAdd(data['sides'][side][stairs][turn][index]);
            }
          }
        }
      }
    }
  }

  return (
    <SafeAreaView style={{marginTop: 0,}}>
    <StatusBar background="gray" />
    <ImageBackground
      source={require('../assets/white.png')}
      style={styles.background}>
      <View
        style={{
          flex: 0.7,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={styles.textChoose}>{i18n.t('chooseWay')}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          top: 30,
        }}>
        <Image
          source={require('../assets/hello.jpg')}
          style={{
            width: 120,
            height: 90,
            marginHorizontal: 5,
          }}
        />
        <TouchableOpacity
          onPress={() => {
            comboBoxResults = [];
            filterBase();
            filterSides();
            navigation.navigate('EnterDataScreen', {
              data,
              officeOrEmployee: false,
              comboBoxResults,
            });
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          />
          <Text style={styles.chooseBtn1}>{i18n.t('lecture')}</Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Image
            source={require('../assets/emp.jpg')}
            style={{
              alignSelf: 'center',
              width: 115,
              height: 140,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            comboBoxResults = [];
            filterEmployee();
            navigation.navigate('EnterDataScreen', {
              data,
              officeOrEmployee: true,
              comboBoxResults,
            });
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          />
          <Text style={styles.chooseBtn2}>{i18n.t('employee')}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    </SafeAreaView>
  );
}

export default ChooseScreen;
