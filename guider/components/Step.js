import * as React from 'react';
import { Button, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';

function Step({ navigation, vsebina, currentIndex, index }) {
  function vrni() {
    if (currentIndex == index) return styles.stepCurrent;
    else if (currentIndex > index) return styles.stepFinished;
    else if (currentIndex < index) return styles.stepNext;
  }
  /*
  
if(index< currnet)
stepsfinished
if index == currnet
sytle=sstep.currnet
if index > currnet
style = step.next
*/

  return <Text style={vrni()}> {vsebina} </Text>;
}

export default Step;
