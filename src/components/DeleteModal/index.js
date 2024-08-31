/**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {Text, Button} from '..';
import {useTheme} from '../../config/theme';

const DeleteModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    Cancel,
    title = `Are you sure you want to delete company TITLE?`,
    onDelete,
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
      style={styles.bottomModal}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeComplete();
      }}
      onSwipeComplete={() => onSwipeComplete()}>
      <View
        style={[
          styles.boxContainer,
          {backgroundColor: colors.whiteBackground},
        ]}>
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
          }}>
          <Text blackColor bold heading2>
            Delete company
          </Text>
        </View>
        <View>
          <Text blackColor bold title3 style={{marginHorizontal: 38}}>
            {title}
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
            buttonStyle={{backgroundColor: colors.error}}
            borderWidth={1}
            borderColor={colors.error}
            textStyles={{color: colors.whiteColor}}
            title="Delete"
            onPress={onDelete}
          />
        </View>
        <View style={{marginBottom: 15, marginHorizontal: 24}}>
          <Button title="Cancel" onPress={Cancel} />
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
