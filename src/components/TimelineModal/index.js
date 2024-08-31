import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import { Text, Button, CustomTextInput, Monthly } from '..';
import { useTheme } from '../../config/theme';
import CalendarPicker from 'react-native-calendar-picker';
import { Email } from '../../assets';


const TimelineModal = (props) => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
  } = props;

  const colors = useTheme();

  // line component
  const Line = () => {
    return (
      <View
        style={{
          height: 4,
          backgroundColor: colors.blackColor,
          width: 100,
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 28,
        }}
      />
    );
  };

  const onSwipeCompleteHandler = () => {
    onSwipeComplete();
  };

  return (
    <Modal
      isVisible={visible}
      //   {...(swipeDown ? {swipeDirection: 'down'} : {})}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeCompleteHandler();
      }}
      onSwipeComplete={onSwipeCompleteHandler}
    >
      <View
        style={{
          backgroundColor: colors.whiteBackground,
          borderRadius: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 24,
          // Fixed height of the modal to 500
          height: 500,
        }}
      >
        {swipeDown === true && <Line />}
        <View style={{ marginTop: 15, flex: 1 }}>
          <View
            style={{
              marginBottom: 15,
              borderBottomWidth: 1,
              height: 55,
            }}
          >
            <Text heading2>Timeline</Text>
          </View>
          {/* Wrap the content in a ScrollView */}
          <ScrollView >
  <TouchableOpacity>
    <TouchableWithoutFeedback>
      <View>
        <View style={{marginBottom:10}}>
       <Monthly/></View>
       <View style={{marginBottom:10}}>
       <Monthly/></View>
       <View style={{marginBottom:10}}>
       <Monthly/></View>
       <View style={{marginBottom:10}}>
       <Monthly/></View>
       <View style={{marginBottom:10}}>
       <Monthly/></View>
       <View style={{marginBottom:10}}>
       <Monthly/></View>
      </View>
    </TouchableWithoutFeedback>
  </TouchableOpacity>
</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TimelineModal;
