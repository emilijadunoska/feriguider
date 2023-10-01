import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import styles from './styles';
import StepsScreen from './StepsScreen';
import { TouchableOpacity } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import i18n from 'i18n-js';
import HideWithKeyboard from 'react-native-hide-with-keyboard';

function EnterData({ route, navigation }) {
  const { data } = route.params;
  const { comboBoxResults } = route.params;
  const { officeOrEmployee } = route.params;

  const { width, height } = Dimensions.get('window');
  const [selectedItem, setSelectedItem] = React.useState(null);

  return (
    <SafeAreaView
      style={{
        marginTop: 0,
        height: '100%',
        backgroundColor: 'white',
      }}>
      <StatusBar background="gray" />
      <HideWithKeyboard>
        <Image
          source={require('../assets/enterNameSlika.png')}
          style={{
            marginLeft: width / 6,
            width: (width / 3) * 2,
            height: (width / 3) * 2,
            marginTop: 40,
          }}
        />
      </HideWithKeyboard>
      <Text
        style={{
          fontFamily: 'Montserrat_400Regular',
          marginTop: 60,
          textAlign: 'center',
        }}>
        {i18n.t('enterName')}
      </Text>
      <AutocompleteDropdown
        style={{ height: 400, width: '80%' }}
        clearOnFocus={false}
        closeOnBlur={true}
        closeOnSubmit={false}
        onSelectItem={setSelectedItem}
        dataSet={comboBoxResults}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('StepsScreen', {
            text: selectedItem.title,
            data,
            officeOrEmployee,
          });
        }}
        style={{
          right: 10,
          left: 10,
          position: 'absolute',
          bottom: Platform.OS === 'android' ? StatusBar.currentHeight + 30 : 30,
        }}>
        <Text style={styles.getstartedBtn}>{i18n.t('showSteps')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

/**      <TextInput
            style={styles.input}
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
            placeholder={officeOrEmployee ? 'Pavlič Luka' : 'G2-1N.13'}
          />

 */

export default EnterData;
