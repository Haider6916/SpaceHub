//import liraries
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {DummyImg, ThreeDots} from '../../assets';
import ThreeDot from '../ThreeDots';
import {Text} from '..';
import SelectDropdown from 'react-native-select-dropdown';

// create a component
const MyCalendar = ({dropDownCheck = true}) => {
  const options = [{id: 1, label: 'Remove invitee'}];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 2,
      }}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 22,
          borderWidth: 1,
          marginRight: 8,
        }}>
        <Image
          style={{height: 38, width: 38, borderRadius: 30, borderWidth: 1}}
          source={DummyImg}
        />
      </View>
      <View style={{flex: 1}}>
        <Text body1>Ahmed Emad</Text>
      </View>
      {dropDownCheck ? (
        <SelectDropdown
          data={options}
          // defaultValueByIndex={1}
          // defaultValue={{
          //   title: 'England',
          //   image: require('./Images/England.jpg'),
          // }}
          onSelect={(selectedItem, index) => {
            if (selectedItem.id === 1) {
              // navigation.navigate(AUTH.ADDEMPLOYEE);
              onPressView();
            }
          }}
          // buttonTextAfterSelection={(selectedItem, index) => {
          //   return selectedItem;
          // }}
          rowStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'rgba(233, 234, 233, 1)',
            height: 56,
          }}
          buttonStyle={{
            marginTop: 24,
            height: 48,
            width: 48,
            marginBottom: 16,
            backgroundColor: 'white',
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            // borderWidth: 1,
            // borderColor: 'rgba(233, 234, 233, 1)',
            borderRadius: 51,
            // paddingHorizontal: 10,
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View
                style={[
                  {
                    // marginTop: 24,
                    borderRadius: 26,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <ThreeDots />
              </View>
            );
          }}
          dropdownStyle={{
            width: 200,
            position: 'absolute',
            left: '35%',
            marginTop: 3,
          }}
          // rowStyle={styles.dropdown3RowStyle}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 16,
                  }}>
                  {item.label}
                </Text>
              </View>
            );
          }}
        />
      ) : (
        <></>
      )}
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
export default MyCalendar;
