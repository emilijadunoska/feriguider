import * as React from 'react';
import ImageView from 'react-native-image-view';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';

const { width } = Dimensions.get('window');

const g2 = [
  {
    source: require('../assets/image/Priticlje.png'),
    title: 'Pritličje',
    width: 1200,
    height: 800,
  },
  {
    source: require('../assets/image/Mendaza.png'),
    title: 'Medeteža',
    width: 1200,
    height: 800,
  },
  {
    source: require('../assets/image/1N.png'),
    title: '1. Nadstropje',
    width: 1200,
    height: 800,
  },
  {
    source: require('../assets/image/2N.png'),
    title: '2. Nadstropje',
    width: 1200,
    height: 800,
  },
  {
    source: require('../assets/image/3N.png'),
    title: '3. Nadstropje',
    width: 1200,
    height: 800,
  },
  {
    source: require('../assets/image/4N.png'),
    title: '4. Nadstropje',
    width: 1200,
    height: 800,
  },
];

const tabs = [{ title: 'G2', images: g2 }];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    marginTop: 0,
  },
  footer: {
    width,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  footerText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  titleStyle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  titleStyle2: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Montserrat_800ExtraBold',
  },
  titleView: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Montserrat_800ExtraBold',
    height: 100,
  },
});

export default function GalleryScreen() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [imageIndex, setImageIndex] = React.useState(0);
  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false);
  const [title, setTitle] = React.useState();

  function renderFooter({ title }) {
    return (
      <View style={styles.footer}>
        <Text style={styles.footerText}>{title}</Text>
      </View>
    );
  }

  const images = tabs[activeTab].images || [];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar background="gray" />
      <Text style={styles.titleStyle2}> </Text>
      <Text style={styles.titleStyle2}>FERI - G2 building </Text>
      <ScrollView>
        {images.map((image, index) => (
          <TouchableOpacity
            key={image.title}
            onPress={() => {
              setImageIndex(index);
              setIsImageViewVisible(true);
            }}>
            <Text style={styles.titleStyle}>{image.title}</Text>
            <Image
              style={{ width, height: (width / 3) * 2 }}
              source={image.source}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ImageView
        glideAlways
        images={images}
        imageIndex={imageIndex}
        animationType="fade"
        isVisible={isImageViewVisible}
        renderFooter={(currentImage) => (
          <View>
            <Text style={styles.titleView}>{images[imageIndex].title}</Text>
          </View>
        )}
        onClose={() => setIsImageViewVisible(false)}
        onImageChange={(index) => {
          setImageIndex(index);
        }}
      />
    </SafeAreaView>
  );
}
