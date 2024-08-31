//import liraries
import React, {useEffect } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import {SplashS } from '../../../assets';
import { AUTH, COMMON } from '../../../navigation/ROUTES';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Splash = ({navigation}) => {

  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('onboardingShown').then(value => {
        if (value === 'true') {
          navigation.navigate(AUTH.LOGIN);
        }
        else{
          navigation.navigate(COMMON.ONBOARDING);
        }
      });
      
    }, 2000);
  }, []);


  return (
    <View
    style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <View>
      <SplashS />
    </View>
  </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Splash;
