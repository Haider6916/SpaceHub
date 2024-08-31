//import liraries
import React from 'react';
import {StyleSheet, TouchableOpacity } from 'react-native';
import {ThreeDots} from '../../assets';

// create a component
const ThreeDot = ({onPress,Style}) => {
    return (
        <TouchableOpacity
        style={[{
          marginTop: 24,
          height: 48,
          width: 48,
          borderRadius: 26,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        },Style]}
        onPress={onPress}>
        <ThreeDots />
      </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
      
    },
});

//make this component available to the app
export default ThreeDot;
