//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ThreeDots} from '../../assets';

// create a component
const Monthly = () => {
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 10,
            width: 10,
            backgroundColor: 'green',
            borderRadius: 7,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}>
          <View
            style={{
              height: 4,
              width: 4,
              backgroundColor: 'white',
              borderRadius: 3,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text>10:00-11:00</Text>
        </View>
        <View>
          <ThreeDots />
        </View>
      </View>
      <View style={{marginBottom: 8, marginTop: 8}}>
        <Text>Meeting room name</Text>
      </View>
      <View style={{marginBottom: 8, marginTop: 8}}>
        <Text>Discuss project details</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 95,
    paddingHorizontal: 13,
    backgroundColor: 'white',
    paddingVertical: 8,
  },
});

//make this component available to the app
export default Monthly;
