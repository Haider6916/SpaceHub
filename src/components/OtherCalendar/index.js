//import liraries
import React from 'react';
import { View,StyleSheet,Image, TouchableOpacity } from 'react-native';
import { Text } from '..';
import { Cancel, DummyImg, Tick } from '../../assets';

// create a component
const OtherCalendar = () => {
    return (
        <View style={{flexDirection: 'row', alignItems: 'center',marginBottom:32}}>
        <View
          style={{
            width: 40,
            height: 40,
            borderWidth: 1,
            borderRadius: 25,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}>
          <Image
            source={DummyImg}
            style={{
              width: 38,
              height: 38,
              borderWidth: 1,
              borderRadius: 25,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text body1>Ahmed Emad</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            flex: 0.2,
          }}>
          <TouchableOpacity>
            <Tick />
          </TouchableOpacity>
          <TouchableOpacity>
            <Cancel />
          </TouchableOpacity>
        </View>
      </View>
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
export default OtherCalendar;
