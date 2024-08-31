//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '..';
// create a component
const AddButton = ({
    btnTxt,
    Svg,
    onPress,
    btnstyle,
}) => {
    return (
        <TouchableOpacity style={[styles.nextButton,btnstyle]} onPress={onPress}>
        <Text style={styles.buttonText2} regular body1 whiteColor>
          {btnTxt}
        </Text>
        {Svg}
      </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: '#8D55A2',
        borderRadius: 51,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        alignSelf: 'center',
        width: 118,
        height: 40,
      },
      buttonText2: {
        lineHeight: 28,
      },
});

//make this component available to the app
export default AddButton;
