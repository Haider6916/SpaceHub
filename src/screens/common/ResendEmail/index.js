//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Button, CustomTextInput, Text} from '../../../components';
import {Info, Left} from '../../../assets';
import {useTheme} from '../../../config/theme';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import useEmailValidation from '../../../hooks/useEmailValidation';
import {COMMON} from '../../../navigation/ROUTES';
import SimpleToast from 'react-native-simple-toast';

// create a component
const ResendEmail = ({navigation}) => {
  const colors = useTheme();

  const [email, setEmail] = useState('');
  const [goForVerify, setGoForVerify] = useState(false);

  const isEmailValid = useEmailValidation(email);

  /** api call for verify email */
  const verifyApi = useFetchPost(
    API.RESEND_VERIFICATION,
    {
      email: email,
    },
    goForVerify,
    // platform,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!verifyApi.loading) {
      console.log('====================================');
      console.log(verifyApi.response);
      console.log('====================================');
      if (verifyApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(verifyApi.response);
        console.log('====================================');
        console.log(`ok`);
        console.log('====================================');
      } else if (verifyApi.response?.status === 400) {
        SimpleToast.show(
          "Invalid email, or user doesn't exist",
          SimpleToast.SHORT,
        );
      }
    } else {
      console.log('error occured in verify api call');
    }
    setGoForVerify(false);
  }, [verifyApi.loading]);

  /**
   * function called on success of api
   * @param {*} data
   */
  const onSuccessApi = data => {
    console.log(data, 'here');
    navigation.navigate(COMMON.VERIIFYUSER,{
      email:email,
    });
  };

  /**
   * function called onpress of continue
   */
  const next = () => {
    setGoForVerify(true);
    // setEmail('');
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
          marginBottom: 40,
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
          Verfiy Email
        </Text>
      </View>
      <View style={{marginBottom: 32, paddingHorizontal: 46}}>
        <Text
          regular
          netural
          title3
          style={{
            lineHeight: 32,
            alignSelf: 'center',
            textAlign: 'center',
            textAlign: 'center',
            justifyContent: 'center',
          }}>
          Don’t worry, it happens to the best of us.
        </Text>
      </View>
      <View style={{paddingHorizontal: 24, marginBottom: 32}}>
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          placeholder={'Enter your email'}
          value={email}
          onChangeText={setEmail}
        />
        {email.length > 0 && !isEmailValid && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {email.length > 0 && !isEmailValid && <Info />}
            <Text regular body2 error style={{marginLeft: 16}}>
              {email.length > 0 && !isEmailValid && `Enter a valid email`}
            </Text>
          </View>
        )}
      </View>

      <Button
        title="Continue"
        onPress={next}
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
export default ResendEmail;
