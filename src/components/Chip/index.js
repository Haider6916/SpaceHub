//import liraries
import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Close, DummyImg} from '../../assets';

// create a component
const Chip = ({
  Name,
  onPress,
  img = DummyImg,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: 3,
          paddingHorizontal: 3,
        }}>
        <View style={{height: 24, width: 24, borderRadius: 15, flex: 0.4}}>
          <Image
            style={{height: 24, width: 24, borderRadius: 15}}
            source={img}
          />
        </View>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={{color:`rgba(159, 157, 158, 1)`}}>{Name}</Text>
        </View>
        <TouchableOpacity style={{flex: 0.2}} onPress={onPress}>
          <Close />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(4, 9, 33, 0.04)',
    width: 131,
    marginTop:8,
  },
});

//make this component available to the app
export default Chip;
