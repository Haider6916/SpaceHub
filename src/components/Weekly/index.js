//import liraries
import React, {Component} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text, ThreeDot} from '..';
import {DummyImg, Location, ThreeDots} from '../../assets';
import {useTheme} from '../../config/theme';
import SelectDropdown from 'react-native-select-dropdown';

// create a component
const Weekly = ({dropDownCheck = true}) => {
  const colors = useTheme();

  const options = [
    {id: 1, label: 'Set Reminder'},
    {id: 1, label: `Don't notify me`},
  ];
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          height: 150,
          borderRightWidth: 1,
          width: 60,
          borderColor: colors.textinput,
        }}>
        <Text style={{color: 'rgba(39, 38, 39, 1)'}} body1>
          11:35
        </Text>
        <Text style={{color: 'rgba(198, 199, 197, 1)'}} body2>
          13:05
        </Text>
      </View>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor:'red'
          }}>
          <Text body1 bold>Sprint Review</Text>
          <View>
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
                height: 38,
                width: 38,
                borderRadius:22,
                backgroundColor:'rgba(245, 246, 244, 1)'
                // borderWidth: 1,
                // borderColor: 'rgba(233, 234, 233, 1)',
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
                      }}
                      appPrimary>
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
        </View>
        <View style={{marginBottom: 17}}>
          <Text caption1>Sprint Review</Text>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 9}}>
          <View style={{marginLeft:-3}}>
          <Location />
          </View>
          <Text style={{marginLeft: 10}} caption1>Room 2-168</Text>
        </View>
        <View style={{flexDirection: 'row'}} >
          <View
            style={{
              borderWidth: 1,
              height: 18,
              width: 18,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              source={DummyImg}
              style={{height: 16, width: 16, borderRadius: 10}}
            />
          </View>
          <Text caption1>Juliee Watson</Text>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(245, 246, 244, 1)',
    height: 137,
    // width: 250,
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    // paddingVertical: 8,
    marginLeft: 16,
    marginBottom: 10,
  },
});

//make this component available to the app
export default Weekly;
