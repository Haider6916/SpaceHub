//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, Checkbox, CustomTextInput, Text} from '../../../components';
import {useTheme} from '../../../config/theme';
import {BaseStyle} from '../../../config/styles';
import {Left} from '../../../assets';
import {API, useFetchPost} from '../../../services';
import {AUTH, COMMON} from '../../../navigation/ROUTES';
import {GeneralResponses} from '../../../services/responses';
import SimpleToast from 'react-native-simple-toast';

// create a component
const NewPassword = ({navigation, route}) => {
  const token = route?.params?.data;
  const colors = useTheme();
  const [pass, setPass] = useState('');
  const [goForReset, setGoForReset] = useState(false);

  /**
   * function called onpress of continue
   */
  const resetApi = useFetchPost(
    API.RESET_PASSWORD + `${token}`,
    {
      newPassword: pass,
    },
    goForReset,
  );

  /** api response for reset api */
  useEffect(() => {
    if (!resetApi.loading) {
      console.log('====================================');
      console.log(resetApi.response);
      console.log('====================================');
      if (resetApi.response?.status === GeneralResponses.STATUS_OK.CODE) {
        SimpleToast.show('Password updated successfully', SimpleToast.SHORT);
        setTimeout(() => {
          navigation.navigate(COMMON.RESETPASSWORD);
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
    setGoForReset(true);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}>
        <TouchableOpacity
          style={{flex: 0.15}}
          onPress={() => navigation.goBack()}>
          <Left />
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: 8, paddingHorizontal: 24,marginTop:40}}>
        <Text bold
          blackColor
          title1
          style={{lineHeight: 36, alignSelf: 'center'}}>
          Reset Your Password
        </Text>
      </View>
      <View style={{paddingHorizontal: 24,marginBottom:32}}>
        <Text  regular
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
          Here’s a tip: Use a combination of Numbers, Uppercase, lowercase and Special characters
        </Text>
      </View>
      <View style={{paddingHorizontal: 24,marginBottom:16}}>
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          placeholder={'New Password'}
          value={pass}
          onChangeText={setPass}
          mainStyle={{marginBottom:0,marginTop:0}}
        />
      </View>
      <View style={{paddingHorizontal: 24,marginBottom:24}}>
        <CustomTextInput
          placeholderTextColor={colors.secondaryColor}
          placeholder={'Confirm New Password'}
          value={pass}
          onChangeText={setPass}
        />
      </View>
      <View style={{paddingHorizontal: 24,flexDirection:'row',marginBottom:32}}>
      <Checkbox style={{width:24,height:24,borderRaidus:4}}/>
      <Text regular body2 netural style={{lineHeight:24}}>
        Show Password
      </Text>
      </View>
      <Button
        title="Reset Password"
        onPress={cont}
        buttonStyle={{marginHorizontal: 24,backgroundColor:colors.appPrimary}}
        textStyles={{color:'white'}}
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
export default NewPassword;
