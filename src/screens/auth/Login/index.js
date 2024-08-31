//import liraries
import React, {useEffect} from 'react';
import {View, StyleSheet, Image, BackHandler, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {AUTH} from '../../../navigation/ROUTES';
import {LoginImg} from '../../../assets';
import {Button, Text} from '../../../components';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {useTheme} from '../../../config/theme';

const Login = ({navigation}) => {
  const colors = useTheme();
  const route = useRoute();

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'login') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]}>
      <View style={{flex:0.14, paddingHorizontal: 24,marginTop:40}}>
        <Text  bold
          title1>
      {`Welcome to`}
      <Text bold title1 appPrimary>
            {` Spacehub`}
          </Text>
        </Text>
        </View>
        <View  style={{flex:0.2,paddingHorizontal:24}}>
          <Text  title1
          bold>
            Sign in
          </Text>
        </View>
        <View style={{flex:0.3,paddingHorizontal:24}}>
       <Text  regular
          title3
          appLight>
       You can start from the website to subscribe to one of our plans and then complete the Registration here
       </Text>
        </View>
        <View>
        <View style={{ height: 260,marginBottom:30}}>
          <Image
            source={LoginImg}
            style={{width: '100%', height: 260}}
            resizeMode="contain"
          />
        </View>
        </View>
        <View style={{paddingHorizontal:24}}>
        <Button
          onPress={() => navigation.navigate(AUTH.LOGINFORM)}
          // buttonStyle={{marginHorizontal: 24}}
          borderWidth={1}
          borderColor={colors.appPrimary}/>
        </View>
        {/* <Text
          style={{
            lineHeight: 37,
            marginTop: '10%',
            marginBottom: 10,
            paddingHorizontal: 24,
          }}
          bold
          title1>
          {`Welcome to`}
          <Text bold title1 appPrimary>
            {` Spacehub`}
          </Text>
        </Text>
        <Text
          title1
          bold
          style={{lineHeight: 37, marginBottom: 30, paddingHorizontal: 24}}>
          {`Sign in`}
        </Text>
        <Text
          style={{
            lineHeight: 27,
            marginBottom: 10,
            paddingHorizontal: 24,
          }}
          regular
          title3
          appLight>
          {`You can start from the website to subscribe to one of our plans and then complete the Registration here`}
        </Text>
        <View style={{marginBottom: 41, height: 260}}>
          <Image
            source={LoginImg}
            style={{width: '100%', height: 260}}
            resizeMode="contain"
          />
        </View>

        <Button
          onPress={() => navigation.navigate(AUTH.LOGINFORM)}
          buttonStyle={{marginHorizontal: 24}}
          borderWidth={1}
          borderColor={colors.appPrimary}
        /> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  // SignIn:{
  //   fontFamily: "DM Sans Bold"
  // }
});

export default Login;

