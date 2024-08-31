//import liraries
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {Left} from '../../../assets';
import { Text } from '../../../components';
// create a component
const Plans = ({navigation}) => {
    return (
        <View style={styles.container}>
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate('Home')}>
        <Left/>
        <Text style={{marginLeft:10}}>Go back to Home Screen</Text>
        </TouchableOpacity>
          
            <Text regular body1 >This screen is under construction</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
});

//make this component available to the app
export default Plans;
