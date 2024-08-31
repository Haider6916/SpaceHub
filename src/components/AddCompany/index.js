//import liraries
import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useTheme} from '../../config/theme';
import {AddedCompany, ArrowRight} from '../../assets';
import { Text } from '..';

// create a component
const AddCompany = ({
    styles,
    onPress,
    numbers,
    title,
    Svg,
    SvgBack,
}) => {
  const colors = useTheme();
  return (
    <View
      style={[styles,{
        backgroundColor: colors.textinput,
        height: 113,
        marginHorizontal: 17,
        borderRadius: 4,
      }]}>
        <View style={{  marginTop: 29.5,flexDirection:'row'}}>
        <View
        style={[{
          backgroundColor: colors.appPrimaryLight,
          width: 54,
          height: 54,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 22,
        
        },SvgBack]}>
       {Svg}
      </View>
      <View style={{flex:0.9,marginLeft:15}}>
        <Text blackColor bold title2 style={{lineHeight:28}}> {numbers}</Text>
        <Text netural regular  style={{lineHeight:28}} >{title}</Text>
      </View>
      <TouchableOpacity style={{flexDirection:'row'}} onPress={onPress}>
        <Text appPrimary body1 regular>View All</Text>
        <View style={{marginLeft:25}}>
        <ArrowRight/>
        </View>
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
export default AddCompany;
