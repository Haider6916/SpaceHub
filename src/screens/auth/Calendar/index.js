//import liraries
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {View, StyleSheet} from 'react-native';
import {
  Calendarback,
  CalenderNext,
  DirectoryArrrowDown,
  DrawerIcon,
  Message,
  Notification,
  Share,
  SortWeekly,
} from '../../../assets';
import {useTheme} from '../../../config/theme';
import {
  Button,
  CustomButton,
  CustomButton2,
  Monthly,
  TimelineModal,
  Weekly,
} from '../../../components';
import {Text} from '../../../components';
import SelectDropdown from 'react-native-select-dropdown';
import CalendarPicker from 'react-native-calendar-picker';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {AUTH} from '../../../navigation/ROUTES';
import CalendarStrip from 'react-native-calendar-strip';

// create a component
const CalendarScreen = ({navigation}) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selected, setSelected] = useState(null);
  const [timeline, setTimeline] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );
  const [calendarKey, setCalendarKey] = useState(0);
  const [calender, setCalender] = useState(true);
  const simpleCalender = useRef();
  const colors = useTheme();
  const options = ['Month', 'Week'];

  const onSelectOption = option => {
    setSelectedOption(option);
  };

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  const renderHeader = date => {
    const monthText = date.toString('MMMM');
    const yearText = date.getFullYear().toString();

    return (
      <View style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{monthText}</Text>
        <Text style={{fontSize: 12, color: 'rgba(159, 157, 158, 1)'}}>
          {yearText}
        </Text>
      </View>
    );
  };

  const _renderArrow = useCallback(direction => {
    const text = direction === 'left' ? <Calendarback /> : <CalenderNext />;
    return (
      <View
        style={{
          height: 34,
          borderWidth: 1,
          borderColor: colors.textGreyDark,
          width: 34,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
        }}>
        <Text>{text}</Text>
      </View>
    );
  }, []);

  const handleButtonPress = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get the current date in the 'YYYY-MM-DD' format
    const selectedDate = {
      dateString: formattedDate,
      day: today.getDate(),
      month: today.getMonth() + 1, // Months are zero-indexed, so we add 1
      timestamp: today.getTime(),
      year: today.getFullYear(),
    };

    // Call the setSelected method of your custom calendar component
    simpleCalender.current?.setSelected(selectedDate);
    setSelected(selectedDate.dateString);
    setCalendarKey(prevKey => prevKey + 1);
  };

  // Get the current date in 'YYYY-MM-DD' format
  // const getCurrentDate = () => {
  //   const currentDate = new Date();
  //   const year = currentDate.getFullYear();
  //   const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  //   const day = String(currentDate.getDate()).padStart(2, '0');
  //   return `${year}-${month}-${day}`;
  // };

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Get the current date in the 'YYYY-MM-DD' format
    setSelected(formattedDate);
    // const currentDate = getCurrentDate();
    // calendarStripRef.current?.setSelectedDate(currentDate, true);
  }, []);

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  /** Week Design */
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarStripRef = useRef();
  const optionsWeek = ['Week', 'Month'];

  const handleButtonPressWeek = () => {
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
    <>
      <TimelineModal
        visible={timeline}
        navigation={navigation}
        onSwipeComplete={() => setTimeline(false)}
        backPressed={() => setTimeline(false)}
        // onSaveDate={handleSaveDate}
        onBackdropPress
        // onSaveDate={onSaveDate}
      />
      {calender ? (
        <SafeAreaView
          style={{backgroundColor: colors.whiteBackground, flex: 1}}>
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
                  onPress={() => navigation.navigate(AUTH.SHARESCREEN)}
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
                {/* <Button title={'Week'}
              buttonStyle={{width: 110,backgroundColor:colors.textinput}}
              height={32}
              borderWidth={0}
              borderColor={colors.secondaryColor}
              textStyles={{color: colors.secondaryColor}}
            /> */}
                <SelectDropdown
                  data={options}
                  onSelect={(selectedItem, index) => {
                    if (selectedItem === 'Week') {
                      setCalender(false);
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
                          {selectedItem ? selectedItem : 'Month'}
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
          <ScrollView>
            <View
              style={{
                borderTopWidth: 1,
                borderColor: colors.textGreyDark,
              }}>
              <Calendar
                key={calendarKey}
                ref={simpleCalender}
                renderHeader={renderHeader}
                renderArrow={_renderArrow}
                current={currentMonth}
                onDayPress={day => {
                  setSelected(day.dateString);
                  console.log('====================================');
                  console.log(day);
                  console.log('====================================');
                }}
                // markedDates={{
                //   [selected]: {selected: true,selectedColor:colors.appPrimary},
                //   '2023-07-26': {

                //         dots: [
                //           {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
                //           {key: 'dot2', color: 'blue'},
                //         ],
                //         customStyles: {
                //                 container: {backgroundColor: 'lightgreen'},
                //                 text: {color: 'green'},
                //               },
                //       },
                // }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    selectedColor: colors.appPrimary,
                  },
                  '2023-07-25': {
                    dots: [vacation, massage, workout],
                    selected: selected === '2023-07-25' ? true : false,
                    selectedColor: colors.appPrimary,
                  },
                }}
                markingType="multi-dot"
                theme={{
                  todayTextColor: colors.appPrimary,
                  dayTextColor: '#2d4150',
                  monthTextColor: 'blue',
                  textDayFontFamily: 'DM Sans',
                  textMonthFontFamily: 'DM Sans',
                  textDayHeaderFontFamily: 'DM Sans',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 15,
                  textMonthFontSize: 20,
                  textDayHeaderFontSize: 13,
                }}
              />
              <TouchableOpacity
                style={{alignItems: 'flex-end', paddingRight: 10}}
                onPress={() => setTimeline(true)}>
                <Text caption1 regular appPrimary>
                  Show All
                </Text>
              </TouchableOpacity>
              <Monthly />
            </View>
          </ScrollView>
          <CustomButton2 navigation={navigation} />
        </SafeAreaView>
      ) : (
        <SafeAreaView
          style={{backgroundColor: colors.whiteBackground, flex: 1}}>
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
                  onPress={() => navigation.navigate(AUTH.SHARESCREEN)}
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
                  onPress={handleButtonPressWeek}
                />
              </View>
              <View>
                <SelectDropdown
                  data={optionsWeek}
                  onSelect={(selectedItem, index) => {
                    if (selectedItem === 'Month') {
                      setCalender(true);
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
                          {selectedItem ? selectedItem : 'Week'}
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
              borderBottomWidth: 1,
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
              selectedDate={currentDate}
            />
          </View>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <View
              style={{flexDirection: 'row', marginBottom: 22, marginTop: 20}}>
              <View style={{flex: 0.25}}>
                <Text style={{color: 'rgba(198, 199, 197, 1)'}} body2>
                  Time
                </Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={{color: 'rgba(198, 199, 197, 1)'}} body2>
                  Course
                </Text>
              </View>
              <SortWeekly />
            </View>
            <View>
              <Weekly />
              <Weekly />
              <Weekly />
            </View>
          </ScrollView>
          <CustomButton navigation={navigation} />
        </SafeAreaView>
      )}
    </>
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
export default CalendarScreen;
