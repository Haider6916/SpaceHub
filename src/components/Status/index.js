//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '..';

// create a component
const Status = ({Style,text = `Active`}) => {
    return (
        <View
          style={[{
            width: 71,
            height: 32,
            backgroundColor: 'rgba(229, 245, 237, 1)',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 44,
          },Style]}>
          <Text style={{color:'rgba(0, 175, 111, 1)',lineHeight:24}} regular body1>{text}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
   
});

//make this component available to the app
export default Status;
