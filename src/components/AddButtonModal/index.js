//import liraries
import React, { useState } from 'react';
import { View,  StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { ArrowDown, DirectoryArrrowDown } from '../../assets';
import { Text } from '..';
// create a component
const AddButtonModal = ({options,text,handleSelect}) => {

  // const handleSelect = (index, value) => {
  //   console.log(value);
  // };
    return (
        <View style={styles.container}>
           <ModalDropdown
                style={{
                  backgroundColor: '#8D55A2',
                  borderRadius: 51,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  alignSelf: 'center',
                  width: 118,
                  height: 40,
                }}
                options={options}
                textStyle={{
                  fontSize: 14,
                  color: 'rgba(68, 67, 68, 1)',
                  fontFamily: 'DM Sans',
                  fontWeight: '400',
                  lineHeight: 28,
                  color:'white'
                }}
                dropdownStyle={{width: 240,height:112}}
                adjustFrame={(style) => {
                  // style.left = 8; // Adjust the left value as needed
                  style.top += 10; // Adjust the top value as needed
                  return style;
                }}
                dropdownTextStyle={{
                  fontSize: 16,
                  color: 'rgba(86, 85, 86, 1)',
                  fontFamily: 'DM Sans',
                  fontWeight: '400',
                  lineHeight: 28,
                  color:'black'
                }}
                defaultValue={
                  <React.Fragment >
                    <Text regular body1 whiteColor>
                    {text} </Text>
                     <ArrowDown />
                  </React.Fragment>
                }
                onSelect={handleSelect}
              />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AddButtonModal;
