//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, CustomTextInput, Text} from '../../../components';
import {Left} from '../../../assets';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {COMMON} from '../../../navigation/ROUTES';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import SimpleToast from 'react-native-simple-toast';

// create a component
const VerifyUser = ({navigation, route}) => {
  const colors = useTheme();
  const [txt1, setTxt1] = useState('');
  const [txt2, setTxt2] = useState('');
  const [txt3, setTxt3] = useState('');
  const [txt4, setTxt4] = useState('');
  const [token, setToken] = useState('');
  const [goForResend, setgoForResend] = useState(false);
  const email = route?.params?.email;
  const [goForReset, setGoForReset] = useState(false);
  const [seconds, setSeconds] = useState(30);

  useEffect(() => {
    let interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    if (seconds === 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const resetTimer = () => {
    setSeconds(30);
  };

  const formatTime = () => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const resendCode = useFetchPost(
    API.RESEND_VERIFICATION,
    {
      email: email,
    },
    goForResend,
  );

  useEffect(() => {
    if (!resendCode.loading) {
      console.log('====================================');
      console.log(resendCode.response);
      console.log('====================================');
      if (resendCode.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(resendCode.response);
        console.log('====================================');
        console.log(`ok`);
        console.log('====================================');
      } else if (resendCode.response?.status === 400) {
        SimpleToast.show(
          "Invalid email, or user doesn't exist",
          SimpleToast.SHORT,
        );
      }
    } else {
      console.log('error occured in verify api call');
    }
    setgoForResend(false);
  }, [resendCode.loading]);

  /**
   * function called on success of api
   * @param {*} data
   */
  const onSuccessApi = data => {
    console.log(data, 'here');
    resendPressed();
    resetTimer();
  };

  /**
   * function called onpress of continue
   */
  const resendPressed = () => {
    setgoForResend(true);
    // setEmail('');
  };

  /**
   * function called onpress of continue
   */
  const resetApi = useFetchPost(API.VERIFY_USER + `${token}`, {}, goForReset);

  /** api response for reset api */
  useEffect(() => {
    if (!resetApi.loading) {
      console.log('====================================');
      console.log(resetApi.response);
      console.log('====================================');
      if (resetApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        SimpleToast.show('User verified successfully', SimpleToast.SHORT);
        setTimeout(() => {
          navigation.navigate(AUTH.LOGINFORM);
        }, 2000);
      } else if (resetApi.response?.status === 401) {
        SimpleToast.show('Invalid Token', SimpleToast.SHORT);
      }
    } else {
      console.log('error occured in reset api call');
    }
    setGoForReset(false);
  }, [resetApi.loading]);

  /**
   *  function  called onpress of continue
   */
  const cont = () => {
    if (txt1 && txt2 && txt3 && txt4) {
      setToken(txt1 + txt2 + txt3 + txt4);
      setGoForReset(true);
    } else {
      // Display an error message or handle the case when fields are not filled
      SimpleToast.show('Please fill in all the fields', SimpleToast.SHORT);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 15,
          paddingHorizontal: 24,
        }}>
        <TouchableOpacity
          style={{flex: 0.15}}
          onPress={() => navigation.goBack()}>
          <Left />
        </TouchableOpacity>
      </View>
      <View
        style={{
          marginBottom: 8,
          paddingHorizontal: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          bold
          blackColor
          title1
          style={{lineHeight: 36, alignSelf: 'center'}}>
          Check Your Email
        </Text>
      </View>
      <View
        style={{
          marginBottom: 32,
          paddingHorizontal: 24,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          regular
          netural
          title3
          style={{
            lineHeight: 32,
            alignSelf: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          We just sent an OTP to your registered email address
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginBottom: 32,
          paddingHorizontal: 24,
        }}>
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          //   placeholder={'Enter your email'}
          mainStyle={{height: 58, width: 58, borderRadius: 10}}
          maxLength={1}
          keyboardType="numeric"
          value={txt1}
          onChangeText={setTxt1}
          inpStyle={{fontSize: 18, fontWeight: '500', paddingHorizontal: 12}}
        />
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          //   placeholder={'Enter your email'}
          mainStyle={{height: 58, width: 58, borderRadius: 10}}
          maxLength={1}
          keyboardType="numeric"
          value={txt2}
          onChangeText={setTxt2}
          inpStyle={{fontSize: 18, fontWeight: '500', paddingHorizontal: 12}}
        />
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          //   placeholder={'Enter your email'}
          mainStyle={{height: 58, width: 58, borderRadius: 10}}
          maxLength={1}
          keyboardType="numeric"
          value={txt3}
          onChangeText={setTxt3}
          inpStyle={{fontSize: 18, fontWeight: '500', paddingHorizontal: 12}}
        />
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          //   placeholder={'Enter your email'}
          mainStyle={{height: 58, width: 58, borderRadius: 10}}
          maxLength={1}
          keyboardType="numeric"
          value={txt4}
          onChangeText={setTxt4}
          inpStyle={{fontSize: 18, fontWeight: '500', paddingHorizontal: 12}}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 8,
        }}>
        {/* <Text
          normal
          regular
          subhead
          style={{alignSelf: 'center', lineHeight: 20}}>
          00:34
        </Text> */}

        <Text regular subhead style={{fontSize: 24, color: 'black'}}>
          {seconds > 0 ? formatTime() : '0:00'}
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom: 36,
        }}>
        <Text regular subhead style={{lineHeight: 20}}>
          Didn't get a code?
        </Text>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text subhead style={{lineHeight: 20, fontWeight: '500'}}>
            {seconds === 0 ? (
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={resendPressed}>
                <Text subhead style={{lineHeight: 20, fontWeight: '500'}}>
                  {' Resend'}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text
                subhead
                style={{
                  lineHeight: 20,
                  fontWeight: '500',
                  color: colors.secondaryColor,
                }}>
                {' Resend'}
              </Text>
            )}
          </Text>
        </TouchableOpacity>
      </View>
      {/* <Text regular overline iserror>
          {email.length > 0 && !isEmailValid && `Enter a valid email`}
        </Text> */}
      <Button
        title="Verify OTP"
        onPress={cont}
        buttonStyle={{marginHorizontal: 24, backgroundColor: colors.appPrimary}}
        textStyles={{color: 'white'}}
      />
    </SafeAreaView>
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
export default VerifyUser;
