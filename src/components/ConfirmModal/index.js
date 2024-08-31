/**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Text, Button, CustomTextInput} from '..';
import {useTheme} from '../../config/theme';
import CalendarPicker from 'react-native-calendar-picker';
import {ConfirmLogo} from '../../assets';

const ConfrirmModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    Cancel,
    onDeactive,
    date,
    onSaveDate,
  } = props;

  const colors = useTheme();

  /** line component */
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

  const goBack = () => {
    onSwipeComplete();
  };

  const savePressed = () => {
    onSwipeComplete();
  };

  return (
    <Modal
      isVisible={visible}
      {...(swipeDown ? {swipeDirection: 'down'} : {})}
      style={{
        justifyContent: 'flex-end',
        margin: 0,
      }}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeComplete();
      }}
      onSwipeComplete={() => onSwipeComplete()}>
      <View
        style={{
          backgroundColor: colors.whiteBackground,
          borderRadius: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}>
        {swipeDown === true && <Line />}
        <View style={{marginTop: 45}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 32,
            }}>
            <ConfirmLogo />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text bold heading2>
              Booking Confirmed
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 60,
              paddingHorizontal:36
            }}>
            <Text regular title4 secondaryColor style={{textAlign:'center'}}>
              Your Booking has been confirmed. check your email for details.
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: 15,
            paddingHorizontal:33,
          }}>
          <Button
            buttonStyle={{backgroundColor: colors.appPrimary}}
            title={`ok`}
            textStyles={{color: colors.whiteBackground}}
            onPress={savePressed}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ConfrirmModal;
