import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  BackHandler,
} from 'react-native';
import {AUTH} from '../../../navigation/ROUTES';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AddButton, Icon, Icons} from '../../../components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '../../../components';
import {useTheme} from '../../../config/theme';
import {Next} from '../../../assets';
const ONBOARDING_DATA = [
  {
    title: 'Amazing solutions for managing your Coworking',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    image: require('../../../assets/images/png/OnBaording.png'),
  },
  {
    title: 'Amazing solutions for managing your Coworking',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    image: require('../../../assets/images/png/Onboarding2.png'),
  },
  {
    title: 'Amazing solutions for managing your Coworking',
    description:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been.',
    image: require('../../../assets/images/png/Onboarding3.png'),
  },
];

const OnBaording = ({navigation}) => {
  const colors = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get('window').width,
  );
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );

  const scrollViewRef = useRef();

  useEffect(() => {
    AsyncStorage.getItem('onboardingShown').then(value => {
      if (value === 'true') {
        setCurrentIndex(ONBOARDING_DATA.length - 1);
      }
    });
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const handleNext = () => {
    if (currentIndex === ONBOARDING_DATA.length - 1) {
      AsyncStorage.setItem('onboardingShown', 'true');
      navigation.navigate(AUTH.LOGIN);
    } else {
      setCurrentIndex(currentIndex + 1); // Navigate to the next screen
      scrollViewRef.current.scrollTo({
        x: (currentIndex + 1) * windowWidth,
        y: 0,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    AsyncStorage.setItem('onboardingShown', 'true');
    setCurrentIndex(ONBOARDING_DATA.length - 1);
    navigation.navigate(AUTH.LOGIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={{flex: 1}}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={event => {
          const {contentOffset} = event.nativeEvent;
          const index = Math.round(contentOffset.x / windowWidth);
          setCurrentIndex(index);
        }}>
        {ONBOARDING_DATA.map((item, index) => (
          <View key={index} style={styles.screenContainer}>
            {/* <View
              style={{
                // marginBottom: 20,
                height: windowHeight / 2.9,
              }}>
              <Image source={item.image} style={{height: 280,width:420}} />
            </View>

            <View
              style={{
                flex:0.4,
                // marginBottom: 20,
                height: windowHeight / 9,
                width:'100%',
              }}>
              <Text style={styles.title} bold title1 numberOfLines={3}>
                {item.title}
              </Text>
            </View>
            <View
              style={{
                // marginBottom: 20,
                width:'100%',
                height: windowHeight / 9,
              }}>
              <Text style={styles.description} regular title4 secondaryColor numberOfLines={4}>
                {item.description}
              </Text>
            </View> */}
            <View style={{marginTop: windowHeight / 10}}>
              <View style={{height: '45%', paddingHorizontal: 14}}>
                <Image
                  source={item.image}
                  style={{alignSelf: 'center', height: '100%', width: '100%'}}
                  resizeMode={'cover'}
                />
              </View>
              <Text style={styles.title} bold title1 numberOfLines={3}>
                {item.title}
              </Text>
              <Text
                style={styles.description}
                regular
                title4
                secondaryColor
                numberOfLines={4}>
                {item.description}
              </Text>
            </View>
            <View style={styles.bottomContainer}>
              <View style={styles.dotContainer}>
                {ONBOARDING_DATA.map((item, index) => (
                  <View
                    key={index}
                    style={[
                      styles.dot,
                      index === currentIndex && styles.activeDot,
                    ]}
                  />
                ))}
              </View>
              <AddButton btnTxt={`Next`} Svg={<Next />} onPress={handleNext} />
            </View>
          </View>
        ))}
      </ScrollView>

      {/* {currentIndex < ONBOARDING_DATA.length - 1 && ( */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.buttonText} regular body2 appPrimary>
            Skip
          </Text>
        </TouchableOpacity>
      {/* )} */}
    </SafeAreaView>
  );
};

const window = {
  width: Dimensions.get('window').width,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  screenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: window.width,
  },
  title: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 37,
    paddingHorizontal: 24,
  },
  description: {
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 30,
  },
  bottomContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginBottom: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 5,
    backgroundColor: '#DBDBDA',
  },
  activeDot: {
    backgroundColor: '#F07600',
    width: 12,
    height: 4,
    borderRadius: 4,
  },
  nextButton: {
    backgroundColor: '#8D55A2',
    borderRadius: 51,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    width: 118,
    height: 40,
  },
  skipButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  buttonText: {
    lineHeight: 24,
  },
  buttonText2: {
    lineHeight: 28,
  },
});

export default OnBaording;
