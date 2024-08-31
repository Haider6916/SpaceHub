//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AddNewCompany, CongratsCrcle} from '../../../assets';
import {Button} from '../../../components';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import { AUTH } from '../../../navigation/ROUTES';

// create a component
const Congrats = ({navigation}) => {
  const colors = useTheme();
  return (
    <View style={[BaseStyle.safeAreaView]}>
      <View style={{flex:1,paddingHorizontal:24}}>
      <View style={{alignSelf: 'center', justifyContent: 'center', flex: 1}}>
        <CongratsCrcle />
      </View>
      <View style={{marginBottom: 24}}>
        <Button
          buttonStyle={{backgroundColor: colors.appPrimary}}
          textStyles={{color: colors.whiteColor}}
          title="Back to home"
          onPress={()=>navigation.navigate('Home')}
        />
      </View>
      <TouchableOpacity style={{alignSelf:'center',marginBottom:50}} onPress={()=>navigation.navigate(AUTH.ADDCOMPANY)}>
      <AddNewCompany/>
      </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default Congrats;
