//import liraries
import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import Weekly from '../../../components/Weekly';
import {Button, Monthly, ThreeDot} from '../../../components';
import {Text} from '../../../components';
import {ArrowRight, ArrowUp, Calendarback, CalenderNext} from '../../../assets';
import {useTheme} from '../../../config/theme';
import CalendarStrip from 'react-native-calendar-strip';
import SelectDropdown from 'react-native-select-dropdown';
// create a component
const Account = () => {
  const [selected, setSelected] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const colors = useTheme();
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

  // const [currentMonth, setCurrentMonth] = useState(
  //   new Date().toISOString().slice(0, 7),
  // );

  const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().slice(0, 7)); // Represents the current month

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

  const vacation = {key: 'vacation', color: 'red', selectedDotColor: 'blue'};
  const massage = {key: 'massage', color: 'blue', selectedDotColor: 'blue'};
  const workout = {key: 'workout', color: 'green'};

  // markedDates={{
  //   '2023-07-25': {
  //     dots: [
  //       {key: 'dot1', color: 'blue'},
  //       {key: 'dot2', color: 'green'},
  //       {key: 'dot3', color: 'blue'},
  //     ],
  //     customStyles: {
  //       container: {backgroundColor: 'lightblue'},
  //       text: {color: 'black'},
  //     },
  //   },
  //   '2023-07-26': {
  //     dots: [
  //       {key: 'dot1', color: 'blue'},
  //       {key: 'dot2', color: 'blue'},
  //     ],
  //     customStyles: {
  //       container: {backgroundColor: 'lightgreen'},
  //       text: {color: 'white'},
  //     },
  //   },
  // }}
  // // markedDates={{
  // //   '2023-07-16': {dotColor:'blue'},
  // //   '2023-07-17': {dotColor:'green'},
  // //   '2023-07-18': { dotColor: 'red'},
  // // }}
  // markingType={'multi-dot'}
  const handleDateSelected = date => {
    // Handle the selected date here if needed
    console.log('Selected date:', date);
  };

  const handleButtonPress = () => {
    // // Use the reference to call the "setSelectedDate" method and select the current date
    // // calendarStripRef.current.setSelectedDate(today, true); 
    // const today = new Date();
    // const formattedDate = today.toISOString().split('T')[0]; // Get the current date in the 'YYYY-MM-DD' format
    // const selectedDate = {
    //   dateString: formattedDate,
    //   day: today.getDate(),
    //   month: today.getMonth() + 1, // Months are zero-indexed, so we add 1
    //   timestamp: today.getTime(),
    //   year: today.getFullYear(),
    // };

    // // Call the setSelected method of your custom calendar component
    // simpleCalender.current?.setSelected(selectedDate);
    // setSelected(selectedDate.dateString);
    // // Set the current month to the current date
    // // Update the 'selected' state as well
    // setSelected(selectedDate.dateString);

    // // // Set the current month to the current date's month
    // // setCurrentMonth(formattedDate);
    // // console.log('====================================');
    // // console.log(currentMonth);
    // // console.log('====================================');

    // // Call the setCurrent method of your custom calendar component with the current month
    // simpleCalender.current?.setCurrent(formattedDate);

    const today = new Date();
    const formattedDate = today.toISOString().slice(0, 7);

    // Call the setSelected method of your calendar component
     // Clear any previous selected date
    simpleCalender.current?.setCurrent(today); 
    console.log('====================================');
    // console.log(curre);
    console.log('====================================');

    // Update the 'currentMonth' state to the current month
    setCurrentMonth(formattedDate);
  };

  const calendarStripRef = useRef();
  const simpleCalender = useRef();


  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <View style={styles.container}>
      <Calendar
      ref={simpleCalender} 
        renderHeader={renderHeader}
        renderArrow={_renderArrow}
        current={currentMonth}
        initialDate={currentMonth}
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
          [selected]: {selected: true, selectedColor: colors.appPrimary},
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

      {/* <CalendarStrip
       ref={calendarStripRef} 
        style={{height: 200, paddingTop: 20, paddingBottom: 10}}
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
          height: 48,
        }} 
        onDateSelected={handleDateSelected}
        dateNameStyle={{
          marginBottom: 7,
          color: 'rgba(198, 199, 197, 1)',
          fontSize: 12,
          fontFamily: 'DM Sans',
          fontWeight: '600',
          textTransform: 'capitalize',

        }}
      /> */}
      <Button onPress={handleButtonPress}/>

      {/* <Weekly/> */}
      {/* <Monthly/> */}

      <TouchableOpacity onPress={() => setShowDropdown(!showDropdown)}>
              <ThreeDot />
            </TouchableOpacity>
                {showDropdown && (
            <SelectDropdown
              data={['Option 1', 'Option 2', 'Option 3']} // Replace with your dropdown options
              onSelect={(selectedItem) => {
                // Handle the selected item
                console.log(selectedItem);
                setShowDropdown(false);
              }}
              buttonTextAfterSelection={(selectedItem) => {
                // Show the selected item text in the button
                return selectedItem;
              }}
              rowTextForSelection={(item) => {
                // Format the dropdown options
                return item;
              }}
              buttonStyle={{
                width: 120,
                height: 30,
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderRadius: 5,
                borderColor: 'gray',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}
              buttonTextStyle={{ color: 'black' }}
              dropdownStyle={{ marginTop: 10 }}
              rowStyle={{ backgroundColor: 'white' }}
              rowTextStyle={{ color: 'black' }}
            />
          )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default Account;
