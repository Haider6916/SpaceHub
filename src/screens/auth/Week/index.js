//import liraries
import React, {Component, useRef, useState} from 'react';
import {View, StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {Button, CustomButton, Text} from '../../../components';
import {
  DirectoryArrrowDown,
  DrawerIcon,
  Message,
  Notification,
  Share,
} from '../../../assets';
import {useTheme} from '../../../config/theme';
import SelectDropdown from 'react-native-select-dropdown';
import {AUTH} from '../../../navigation/ROUTES';
import CalendarStrip from 'react-native-calendar-strip';

// create a component
const Week = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const colors = useTheme();
  const calendarStripRef = useRef();
  const options = ['Month'];

  const handleButtonPress = () => {
    // // Use the reference to call the "setSelectedDate" method and select the current date
    calendarStripRef.current.setSelectedDate(today, true);
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get the current date in the 'YYYY-MM-DD' format
    const selectedDate = {
      dateString: formattedDate,
      day: today.getDate(),
      month: today.getMonth() + 1, // Months are zero-indexed, so we add 1
      timestamp: today.getTime(),
      year: today.getFullYear(),
    };
  };

  const handleDateSelected = date => {
    console.log('Selected date:', date);
  };
  return (
    <SafeAreaView style={{backgroundColor: colors.whiteBackground, flex: 1}}>
      <View
        style={{
          height: 70,
          borderBottomWidth: 1,
          paddingHorizontal: 27,
          paddingTop: 24,
          flexDirection: 'row',
          borderBottomColor: colors.textGreyDark,
          marginBottom: 16,
        }}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => navigation.openDrawer()}>
          <DrawerIcon />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 0.2}}>
          <Message />
        </TouchableOpacity>
        <TouchableOpacity>
          <Notification />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 24}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <View style={{justifyContent: 'center'}}>
            <Text heading2 bold>
              Calendar
            </Text>
          </View>
          <View>
            <Button
              buttonStyle={{width: 118, backgroundColor: colors.appPrimary}}
              icon={<Share />}
              textStyles={{color: colors.whiteColor}}
              title={'Share'}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 25,
          }}>
          <View>
            <Button
              title={'Today'}
              buttonStyle={{width: 110}}
              borderColor={colors.secondaryColor}
              textStyles={{color: colors.secondaryColor}}
              onPress={handleButtonPress}
            />
          </View>
          <View>
            <SelectDropdown
              data={options}
              onSelect={(selectedItem, index) => {
                if (selectedItem === 'Month') {
                  navigation.navigate('Calendar');
                }
              }}
              rowStyle={{
                backgroundColor: 'white',
                borderBottomColor: 'rgba(233, 234, 233, 1)',
              }}
              buttonStyle={{
                width: 110,
                marginBottom: 8,
                backgroundColor: `#F6F5F5`,
                height: 32,
                marginBottom: 18,
                paddingHorizontal: 10,
                borderRadius: 20,
              }}
              renderCustomizedButtonChild={(selectedItem, index) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: '#F6F5F5',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: colors.secondaryColor,
                      }}>
                      {'Week'}
                    </Text>
                    <DirectoryArrrowDown width={15} height={15} />
                  </View>
                );
              }}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      backgroundColor: 'white',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 16,
                      }}>
                      {item}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      </View>
      <View
        style={{
          borderTopWidth: 1,
          paddingTop: 18,
          borderColor: colors.textGreyDark,
        }}>
        <CalendarStrip
          ref={calendarStripRef}
          style={{height: 100}}
          scrollable
          calendarHeaderStyle={{fontSize: 20, color: 'black'}}
          highlightDateNameStyle={{
            color: 'white',
            fontSize: 12,
            fontWeight: '600',
            marginBottom: 7,
            textTransform: 'capitalize',
          }}
          highlightDateNumberStyle={{color: 'white', font: 16}}
          highlightDateContainerStyle={{
            backgroundColor: colors.appPrimary,
            borderRadius: 10,
            width: 40,
            // height: 48,
          }}
          dateNumberStyle={{color: 'black', font: 16}}
          onDateSelected={handleDateSelected}
          dateNameStyle={{
            marginBottom: 7,
            color: 'rgba(198, 199, 197, 1)',
            fontSize: 12,
            fontFamily: 'DM Sans',
            fontWeight: '600',
            textTransform: 'capitalize',
          }}
        />
      </View>
      <CustomButton/>
    </SafeAreaView>
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
export default Week;
