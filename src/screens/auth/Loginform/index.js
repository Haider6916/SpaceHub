//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {Eye, Eyeslash, Info, Left, OpenEye} from '../../../assets';
import {Text, Button, CustomTextInput} from '../../../components';
import {useTheme} from '../../../config/theme';
import useEmailValidation from '../../../hooks/useEmailValidation';
import {AUTH, COMMON} from '../../../navigation/ROUTES';
import {API, useFetchPost} from '../../../services';
import {useDispatch, useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {UserActions} from '../../../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Loginform = ({navigation}) => {
  const colors = useTheme();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecure, setPasswordSecure] = useState(true);
  const [goForSignin, setGoForSignin] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const uuid = useSelector(state => state.user.uuid);

  const isEmailValid = useEmailValidation(email);

  /** api call for signin */
  const signinApi = useFetchPost(
    API.USER_SIGNIN,
    {
      email: email,
      password: password,
    },
    goForSignin,
  );

  useEffect(() => {
    if (!signinApi.loading) {
      if (signinApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(signinApi?.response);
        navigation.navigate(AUTH.HOME);
      } else if (
        signinApi.response?.status === GeneralResponses.STATUS_401_LOGIN.CODE
      ) {
        setError(signinApi.response?.data?.error.message);
        setLoading(false);
      } else if (signinApi.response?.status === 403) {
        setError(signinApi.response?.data?.error.message);
        setLoading(false);
      }
    } else {
      console.log('error occured in signin api call');
    }
    setGoForSignin(false);
  }, [signinApi.loading]);

  const onSuccessApi = async response => {
    try {
      // const jsonValue = JSON.stringify(response?.data?.authToken);
      // await AsyncStorage.setItem('@userData', jsonValue);
      await AsyncStorage.setItem('@accessToken', response?.data?.authToken);
      await AsyncStorage.setItem('isLoggedIn', 'true');
      dispatch(UserActions.onSetUserAccessToken(response?.data?.authToken));
      console.log('====================================');
      console.log(response?.data?.authToken);
      console.log('====================================');
      dispatch(UserActions.onSetIsLoggedIn(true));
    } catch (e) {
      console.log(e);
    }
  };

  /**
   * function called onpress of login
   */
  const login = () => {
    setLoading(true);
    setGoForSignin(true);
  };
  return (
    <SafeAreaView style={[BaseStyle.safeAreaView, BaseStyle.container]}>
      <View style={{marginTop: 50, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Left />
          </Pressable>
        </View>
        <View style={{flex: 1.8}}>
          <Text style={{lineHeight: 37}} bold title1>
            {`Sign in`}
          </Text>
        </View>
      </View>
      <View style={{marginBottom: 25}}>
        <Text
          style={{lineHeight: 37, color: 'black', alignSelf: 'center'}}
          bold
          title1>
          {`your account`}
        </Text>
      </View>
      <View style={{marginBottom: 80}}>
        <Text style={{lineHeight: 32, alignSelf: 'center'}} regular heading2>
          {`sign in with your email`}
        </Text>
      </View>
      <View style={{marginBottom: 64}}>
        <View style={{marginBottom: 25}}>
          <CustomTextInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            maxLength={50}
            autoCapitalize={'none'}
            keyboardType={'email-address'}
            placeholderTextColor={colors.netural}
          />
          {email.length > 0 && !isEmailValid ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {email.length > 0 && !isEmailValid && <Info />}
              <Text regular body2 error style={{marginLeft: 16}}>
                {email.length > 0 && !isEmailValid && `Enter a valid email`}
              </Text>
            </View>
          ) : signinApi.response?.status ===
            GeneralResponses.STATUS_401_LOGIN.CODE ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Info />
              <Text regular body2 error style={{marginLeft: 16}}>
                {error && error}
              </Text>
            </View>
          ) : (
            signinApi.response?.status === 403 && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                <Info />
                <TouchableOpacity
                  onPress={() => navigation.navigate(COMMON.RESENDEMAIL)}>
                  <Text regular body2 error style={{marginLeft: 16}}>
                    {error && error}
                    <Text bold body2 appPrimary>
                      {`  Resend email?`}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
        <View>
          <CustomTextInput
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry={passwordSecure}
            value={password}
            maxLength={50}
            placeholderTextColor={colors.netural}
            icon={
              <Pressable
                style={styles.eyeBtn}
                onPress={() => setPasswordSecure(!passwordSecure)}>
                {passwordSecure ? <Eye /> : <Eyeslash />}
              </Pressable>
            }
          />
        </View>

        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => navigation.navigate(COMMON.FORGOTPASSWORD)}>
          <Text style={{lineHeight: 19}} regular body2 appPrimary>
            {`Forgot password?`}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Button
          buttonStyle={{backgroundColor: colors.appPrimary}}
          onPress={login}
          disabled={email.length === 0 || !isEmailValid || password.length < 8}
          textStyles={{color: colors.whiteColor}}
          title = {loading ? (
            <ActivityIndicator color={colors.whiteColor} size="small" />
          ) : (
            'Sign in'
          )}
        />
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  eyeBtn: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Loginform;
