//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { Left, Success } from '../../../assets';
import { TouchableOpacity } from 'react-native';
import { Button, Text } from '../../../components';
import { AUTH } from '../../../navigation/ROUTES';
import { useTheme } from '../../../config/theme';

// create a component
const ResetPassword = ({navigation}) => {
     const colors = useTheme();

    /**
   *  function  called onpress of continue
   */
  const cont = () => {
   navigation.navigate(AUTH.LOGINFORM)
  };

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 24,
          marginBottom:30,
        }}>
        <TouchableOpacity
          style={{flex: 0.15}}
          onPress={() => navigation.goBack()}>
          <Left />
        </TouchableOpacity>
      </View>
        <View style={{justifyContent:'center',alignItems:'center',marginBottom:32}}>
            <Success width={'83%'} />
        </View>
        <View style={{justifyContent:'center',alignItems:'center',marginBottom:8}}>
            <Text bold title1 style={{lineHeight:36,color:'rgba(39, 38, 39, 1)'}} >
            Reset Successful
            </Text>
        </View>
        <View style={{justifyContent:'center',alignItems:'center',marginBottom:32}}>
            <Text regular title3 netural style={{lineHeight:36}} >
            You can now log in to your account
            </Text>
        </View>
        <Button
        title="Return to login"
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
export default ResetPassword;
