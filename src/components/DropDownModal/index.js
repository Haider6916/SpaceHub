//import liraries
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from '..';
import  Modal from 'react-native-modal';

// create a component
const DropDownModal = ({isVisible, toggleDropdown, onPress1, onPress2, onBackdropPress = false}) => {
    const { width, height } = Dimensions.get('window');
  const topDistance = height * 0.11;
  const leftDistance = width * 0.2;
  
  return (
    <Modal visible={isVisible} backdropOpacity={0.5}
    transparent={true}
    animationType="fade">
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          position:'absolute',
          // top:topDistance,
          // left:leftDistance,
          top:topDistance,
          left:leftDistance,
        }}
        onPress={toggleDropdown}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            height: 112,
            width: 342,
          }}>
          <TouchableOpacity
            onPress={onPress1}
            style={{
              height: 56,
              borderBottomWidth: 1,
              borderBottomColor: `rgba(233, 234, 233, 1)`,
              padding: 14,
            }}>
            <Text regular body1>
              Add employee
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPress2}
            style={{height: 56, padding: 14}}>
            <Text regular body1>
              Add company
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
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
export default DropDownModal;
