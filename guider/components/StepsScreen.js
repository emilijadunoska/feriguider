import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Platform,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Step from './Step';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
import i18n from 'i18n-js';

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function StepsScreen({ route, navigation, goBack }) {
  const { text } = route.params;
  const { data }= route.params;
  const { officeOrEmployee } = route.params;

  let steps = [];
  let startIndex, startSide;

  function searchBase(name) {
    for (let side = 0; side < Object.keys(data["base"]).length; side++) {
      for (let index = 0; index < Object.keys(data["base"][side]).length; index++) {
        if (data["base"][side][index] != undefined) {
          if (data["base"][side][index].toLowerCase() == name.toLowerCase()) {
            var point = new Object();
            point['side'] = side;
            point['index'] = index;
            return point;
          }
        }
      }
    }
  }

  function searchSides(name) {
  
    for (let side = 0; side < Object.keys(data["sides"]).length; side++) {
      for (let stairs = 0; stairs < Object.keys(data["sides"][""+side]).length; stairs++) {
        for (let turn = 0; turn < 2; ++turn) {
          for (
            let index = 0;
            index < Object.keys(data["sides"][""+side][""+stairs][""+turn]).length;
            index++
          ) {
            //alert(Object.keys(data["sides"][side][stairs]).length);
            if (data["sides"][""+side][""+stairs][""+turn][index] != undefined) {
              if (
                data["sides"][""+side][""+stairs][""+turn][index].toLowerCase() ==
                name.toLowerCase()
              ) {
                var point = new Object();
                point['side'] = side;
                point['stairs'] = stairs;
                point['turn'] = turn;
                point['index'] = index;
                return point;
              }
            }
          }
        }
      }
    }
  }

  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
  }

  function search(name, officeOrEmployee) {
    if (officeOrEmployee) {
      name = data["employees"][titleCase(name)];
    }

    var result = searchBase(name);
    if (result == undefined) result = searchSides(name);
    return result;
  }

  var odiPravo = i18n.t('continueStraight');
  var dokraj = i18n.t('untilTheEnd');
  function ntataVrata(kolkuVrati) {
    if (kolkuVrati == 1) return '' + kolkuVrati + i18n.t('door1');
    else if (kolkuVrati == 2) return '' + kolkuVrati + i18n.t('door2');
    else if (kolkuVrati == 3) return '' + kolkuVrati + i18n.t('door3');
    else return '' + kolkuVrati + i18n.t('doorN');
  }

  function showSteps(start, finish) {
    // let razlika = start.side - finish.side;
    if (start == undefined || finish == undefined) {
      alert(i18n.t('pleaseValid'));
      navigation.goBack();
      return;
    }
    if (finish.stairs == undefined) {
      //start.side; //start.index; //finish.side; //finish.index;
      let razlika = start.side - finish.side;

      if (razlika == 3) razlika -= 4;
      if (razlika == -3) razlika += 4;

      //steps.push(ntataVrata(2) + levo));
      //2rata vrata levo

      if (razlika == 0) {
        //ista strana
        //    u1 u2 r u3 u4 VVVV u5 ub uw
        let drugaRazlika = start.index - finish.index;
        let nasoka = drugaRazlika < 0 ? i18n.t('right') : i18n.t('left');
        steps.push(capitalize(i18n.t('turn')) + ' ' + nasoka);
        steps.push(ntataVrata(Math.abs(drugaRazlika)));
      } else if (razlika == 1) {
        //svrti desno
        //odi pravo, Ntata vrata desno
        let drugaRazlika = finish.index + 1;
        steps.push(capitalize(odiPravo));
        steps.push(ntataVrata(drugaRazlika) + ' ' + i18n.t('right'));
      } else if (razlika == -1) {
        //svrti levo
        let maxValue = data["base"][finish.side].length;
        let drugaRazlika = maxValue - finish.index;
        steps.push(capitalize(odiPravo));
        steps.push(ntataVrata(drugaRazlika) + ' ' + i18n.t('left'));
      } else if (Math.abs(razlika) == 2) {
        //odi sprotivno
        let drugaRazlika = finish.index + 1;
        steps.push(capitalize(odiPravo) + ' ' + dokraj);
        steps.push(ntataVrata(drugaRazlika));
      }
    } else {
      //prvi skali desno
      //odi tri setoj skali
      for (var n = 0; n < Object.keys(data["stairs"]).length; n++) {
        for (var j = 0; j < Object.keys(data["stairs"][n]).length; j++) {
          if (finish.side == data["stairs"][n]["sides"][j]) {
            var strana = data["stairs"][n].leftOrRight ? i18n.t('right') : i18n.t('left');
            var pozicija = data["stairs"][n].firstOrLast ? i18n.t('last') : i18n.t('first');

            const direction = data["stairs"][n][finish.side];
            const directionText = direction ? i18n.t('right') : i18n.t('left');
            const turnSide = finish.turn ? i18n.t('right') : i18n.t('left');

            let maxValue =
              data["sides"][finish.side][finish.stairs][finish.turn].length;
            let drugaRazlika = direction
              ? finish.index + 1
              : maxValue - finish.index;

            steps.push(
              capitalize(i18n.t('goToThe')) + ' ' + pozicija + ' ' + i18n.t('stairs') + ' ' + i18n.t('onThe') + ' ' +  strana
            );
            steps.push(capitalize(i18n.t('climb')) + ' ' + finish.stairs + ' ' +  i18n.t('setsOfStairs'));
            steps.push(capitalize(i18n.t('turn')) + ' ' +  directionText);
            steps.push(ntataVrata(drugaRazlika) + ' ' +  i18n.t('fromThe') + ' ' +  turnSide);
            return;
            //if (dir == desno) reverse sides of kabinets
          }
        }
      }
      //obratni indeksi za levo ? Vidi P-04 -> P-06
      // svrtise desno
      // OFFICE LEFT
      // OFFICE RIGHT
      //odi do treta vrata \\\\\ od desno/levo
    }
  }

  showSteps(search('G2 Main Entrance', false), search(text, officeOrEmployee));

  let [currentIndexState, setCurrentIndexState] = React.useState(0);

  function levelUp() {
    setCurrentIndexState(currentIndexState + 1);
    if (currentIndexState + 1 == steps.length) {
      //TODO: delay
      navigation.navigate('FinishScreen');
    }
  }

  return (
    <SafeAreaView style={{marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,}}>
      <ScrollView>
        <View
          style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text
            style={{
              marginVertical: 20,
              color: '#2b3858',
              fontSize: 20,
              textAlign: 'left',
              marginHorizontal: 20,
              fontFamily: 'Montserrat_400Regular',
            }}>{i18n.t('yourDestination')}
          </Text>
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {steps.map((step: String, index) => (
            <Step
              style={styles.stepBtn}
              index={index}
              key={index++}
              currentIndex={currentIndexState}
              vsebina={step}
            />
          ))}
        </View>
      </ScrollView>

      <View
        style={{ right: 10, left: 10, position: 'absolute', bottom: -50 }}>
        <TouchableOpacity onPress={() => levelUp()}>
          <Text style={styles.getstartedBtn}>{i18n.t('nextStep')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
//TODO: move before button
export default StepsScreen;
