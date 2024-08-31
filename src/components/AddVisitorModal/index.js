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
import {Email} from '../../assets';

const AddVisitorModal = props => {
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [fname, setfname] = useState('');
  const [lname, setlname] = useState('');
  const [email, setemail] = useState('');
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

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const goBack = () => {
    onSwipeComplete();
     // Clear the input fields
 setfname('');
 setlname('');
 setemail('');
  };

  const savePressed = () => {
    const visitorData = {
      fname,
      lname,
      email,
    };
    onSaveDate(visitorData);
 // Clear the input fields
 setfname('');
 setlname('');
 setemail('');
    onSwipeComplete();
  };

  const onSwipeCompleteHandler = () => {
    // Clear the input fields
    setfname('');
    setlname('');
    setemail('');
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
        onBackdropPress && onSwipeCompleteHandler();
      }}
      onSwipeComplete={onSwipeCompleteHandler}>
      <View
        style={{
          backgroundColor: colors.whiteBackground,
          borderRadius: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          paddingHorizontal: 24,
        }}>
        {swipeDown === true && <Line />}
        <View style={{marginTop: 15}}>
          <View style={{marginBottom: 24}}>
            <Text heading2>Add Visitors</Text>
          </View>
          <View>
            <CustomTextInput
              placeholder={'First Name'}
              mainStyle={{
                marginBottom: 16,
                borderColor: 'rgba(233, 234, 233, 1)',
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              value={fname}
              onChangeText={setfname}
              placeholderTextColor={colors.secondaryColor}
            />
            <CustomTextInput
              placeholder={'Last Name'}
              mainStyle={{
                marginBottom: 16,
                borderColor: 'rgba(233, 234, 233, 1)',
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              value={lname}
              onChangeText={setlname}
              placeholderTextColor={colors.secondaryColor}
            />
            <CustomTextInput
              placeholder={'Email'}
              mainStyle={{
                marginBottom: 150,
                borderColor: 'rgba(233, 234, 233, 1)',
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              value={email}
              onChangeText={setemail}
              placeholderTextColor={colors.secondaryColor}
              icon={<Email />}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 15,
          }}>
          <Button buttonStyle={{flex: 0.42}} title={`Back`} onPress={goBack} />
          <Button
            buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
            title={`Save`}
            textStyles={{color: colors.whiteBackground}}
            onPress={savePressed}
          />
        </View>
      </View>
    </Modal>
  );
};

export default AddVisitorModal;
