 /**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {Text, Button} from '..';
import {useTheme} from '../../config/theme';

const UpdateUserModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    Cancel,
    onDeactive,
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
        <View
          style={{
            marginTop: 15,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 14,
            borderBottomWidth: 1,
            height: 80,
            borderBottomColor: colors.textGreyDark,
            marginBottom: 17,
            paddingHorizontal:40
          }}>
          <Text blackColor bold heading2 style={{textAlign: 'center'}}>{`Deactivate company account`}</Text>
        </View>
        <View>
          <Text blackColor bold title3 style={{marginHorizontal: 38}}>
            {`Are you sure you want to Deactivate company account?`}
          </Text>
        </View>
        <View>
          <Text
            secondaryColor
            regular
            title4
            style={{marginHorizontal: 38, marginTop: 14, marginBottom: 44}}>
            {`You couldn’t revert this change`}
          </Text>
        </View>
        <View style={{marginBottom: 15, marginHorizontal: 24}}>
          <Button
            buttonStyle={{backgroundColor: 'rgba(249, 146, 0, 1)'}}
            borderWidth={1}
            borderColor={'rgba(249, 146, 0, 1)'}
            textStyles={{color: colors.whiteColor}}
            title="Deactivate"
            onPress={onDeactive}
          />
        </View>
        <View style={{marginBottom: 15, marginHorizontal: 24}}>
          <Button title="Cancel" onPress={Cancel} />
        </View>
      </View>
    </Modal>
  );
};

export default UpdateUserModal;
