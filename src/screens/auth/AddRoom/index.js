//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {
  ArrowRight,
  BigDown,
  Calendar,
  CardArrow,
  DirectoryArrrowDown,
  DummyImg,
  Left,
  LongArrow,
  Time,
} from '../../../assets';
import {
  Button,
  CalenderModal,
  CustomDropdown,
  CustomTextInput,
  EndTime,
  StartTime,
  Text,
} from '../../../components';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '../../../config/theme';
import {AUTH} from '../../../navigation/ROUTES';
import moment from 'moment';
import 'moment-timezone';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {Picker} from '@react-native-picker/picker';

// create a component
const AddRoom = ({navigation, route}) => {
  const colors = useTheme();
  const [calendar, setCalender] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [clock, setClock] = useState(false);
  const [endClock, setEndClock] = useState(false);
  const [backEndStart, setbackEndStart] = useState('');
  const [backEndEnd, setbackEndEnd] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyData, setCompnayData] = useState([]);
  const [skip, setskip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectedItem, setSelectedItem] = useState([]);
  const [goForGetBookingCall, setgoForGetBookingCall] = useState(true);
  const [bookingData, setBoookingData] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');
  const [goForCheckApi, setGoForCheckApi] = useState(false);
  const [selectedCompanyID, setSelectedCompanyID] = useState('');

  const id = route?.params?.data;

  /**Get all boookiing resourcees */
  const getresources = useFetchGet(
    API.BOOKING_RESOURCES + `${id._id}`,
    goForGetBookingCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getresources.loading) {
      console.log('====================================getresources');
      console.log(getresources.response);
      console.log('====================================');
      if (getresources.response?.status === 201) {
        setBoookingData(getresources?.response.data);
        console.log('====================================c');
        console.log(getresources?.response);
        console.log('====================================');
      }
    } else {
      console.log('error in All users ');
    }
    setgoForGetBookingCall(false);
  }, [getresources.loading]);

  /**Get all company */
  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetApiCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      console.log('====================================');
      // console.log(getComapny.response?.data);
      console.log('====================================');
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setCompnayData(prevData => [
          ...prevData,
          ...getComapny.response?.data?.docs,
        ]);
        setskip(skip + 1);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForGetApiCall(false);
  }, [getComapny.loading]);

  const loadMoreData = () => {
    setGoForGetApiCall(true);
  };

  const makeBookedSlots = selectedDate => {
    /** Selected date compulsoory  */

    /** seccond function */

    let tempArray = [];

    bookingData?.forEach(value => {
      var localStartDateTime = moment.utc(value.startTime).local();
      var formattedStartDate = localStartDateTime.format('YYYY-MM-DD');
      var formattedStartTime = localStartDateTime.format('hh:mm A');

      console.log('Start', formattedStartDate, formattedStartTime);
      var localEndDateTime = moment.utc(value.endTime).local();
      var formattedEndDate = localEndDateTime.format('YYYY-MM-DD');
      var formattedEndTime = localEndDateTime.format('hh:mm A');

      console.log('End', formattedEndDate, formattedEndTime);

      if (
        formattedEndDate === formattedStartDate &&
        formattedEndDate === selectedDate
      ) {
        //Match with the selected date and add the start time and end time to a new array
        tempArray.push({
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        });
      } else if (
        formattedEndDate === selectedDate ||
        formattedStartDate === selectedDate
      ) {
        var [startDate, ,] = formattedStartDate.split('-');
        var [endDate, ,] = formattedEndDate.split('-');
        var [selectedDateOnly, ,] = selectedDate.split('-');

        if (parseInt(startDate) < parseInt(selectedDateOnly)) {
          // formattedStartDate = selectedDate
          formattedStartTime = '12:00 AM';
        } else if (parseInt(selectedDate) < parseInt(endDate)) {
          // formattedEndDate = selectedDate
          formattedEndTime = '11:45 PM';
        }

        tempArray.push({
          startTime: formattedStartTime,
          endTime: formattedEndTime,
        });
      }

      // console.log('formattedEndDateTime', formattedEndDateTime);
      // const [endDate , endTime, ] = formattedEndDateTime.split(' ')
    });

    tempArray = tempArray.sort((a, b) => {
      const startTimeA = a.startTime;
      const startTimeB = b.startTime;

      if (startTimeA < startTimeB) {
        return -1;
      }
      if (startTimeA > startTimeB) {
        return 1;
      }
      return 0;
    });

    console.log('tempArray', tempArray);

    setBookedSlots(tempArray);
  };

  const filterStartSlots = value => {
    /** true make disable */
    /** 3rd function */
    let isBooked = false;
    for (let i = 0; i < bookedSlots.length; i++) {
      const bookingStartTime = moment(bookedSlots[i].startTime, 'hh:mm A');
      const bookingEndTime = moment(bookedSlots[i].endTime, 'hh:mm A');
      if (
        moment(value, 'hh:mm A').isBetween(
          bookingStartTime,
          bookingEndTime,
          null,
          '[)',
        )
      ) {
        isBooked = true;
      }
    }

    return isBooked;
  };

  //Was working on this function . Logic completed but needs to be test
  const filterEndSlots = (value, selectedStartTime) => {
    //  last function
    let isBooked = false;
    let lastBooking = false;
    let index = 0;
    const tempBookingArray = [];
    tempBookingArray.push({
      startTime: '12:00 AM',
      endTime: selectedStartTime,
    });

    if (bookedSlots.length > 0) {
      for (let i = 0; i < bookedSlots.length; i++) {
        if (bookedSlots.length === 1) {
          lastBooking = true;
        } else if (i > 0) {
          lastBooking = true;
        }
        if (
          moment(selectedStartTime, 'hh:mm A').isBefore(
            moment(bookedSlots[i].startTime, 'hh:mm A'),
          )
        ) {
          index = i;
          break;
        }

        // index = bookedSlots.length - 1
        // index = i
      }
      if (!(lastBooking && index === 0)) {
        tempBookingArray.push({
          startTime: bookedSlots[index].startTime,
          endTime: '11:45 PM',
        });
      }

      // console.log('index', index);
      // console.log('slots that will be disabled', tempBookingArray);
    }

    for (let i = 0; i < tempBookingArray.length; i++) {
      const bookingStartTime = moment(tempBookingArray[i].startTime, 'hh:mm A');
      const bookingEndTime = moment(tempBookingArray[i].endTime, 'hh:mm A');
      if (
        moment(value, 'hh:mm A').isBetween(
          bookingStartTime,
          bookingEndTime,
          null,
          '(]',
        )
      ) {
        isBooked = true;
      }
    }
    if (value === '12:00 AM') {
      if (!(lastBooking && index === 0)) {
        return true;
      } else {
        return false;
      }
    } else {
      return isBooked;
    }
  };

  const handleSaveTime = date => {
    const formatt = moment(date).utcOffset('+00:00').format('HH:mm:ss.SSSZ');
    console.log('====================================Ammarrr');
    setbackEndStart(formatt);
    console.log('====================================');

    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    console.log('====================================fformatted');
    console.log(formattedTime);
    console.log('====================================');
    setStartTime(formattedTime);
  };

  const handleEndTime = date => {
    const formatt = moment(date).utcOffset('+00:00').format('HH:mm:ss.SSSZ');
    console.log('====================================Ammarrr');
    setbackEndEnd(formatt);
    console.log('====================================');

    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    console.log('====================================fformatted');
    console.log(formattedTime);
    console.log('====================================');
    setEndTime(formattedTime);
    console.log('====================================');
    console.log(date);
    console.log('====================================');
  };

  const handleButtonStartClock = () => {
    setClock(true);
  };

  const handleButtonEndClock = () => {
    setEndClock(true);
  };

  const handleButtonClick = () => {
    setCalender(true);
  };

  const handleSaveDate = date => {
    const formattedDate = date?.format('YYYY-MM-DD');

    setSelectedDate(formattedDate);
    // makeBookedSlots(format(date, 'dd-MM-yyyy'))
    makeBookedSlots(formattedDate);
    // setgoForfilterApiCall(true)
  };

  const resendPressed = () => {
    setGoForCheckApi(true);
  };

  // const data = (timeArray) =>{
  //   console.log(timeArray);
  // }

  const makeTimeSlots = () => {
    // to make drrpdoiwn
    const timeArray = [];
    const startTime = moment().hour(parseInt(0)).minute(0).second(0);

    for (let i = 0; i < 24 * 4; i++) {
      const time = startTime
        .clone()
        .add(15 * i, 'minutes')
        .format('hh:mm A');
      timeArray.push(time);
    }

    return timeArray;
  };

  const convertToISO = (date, time) => {
    console.log('====================================time');
    console.log(time);
    console.log('====================================');
    // const formattedDate = moment(date, "DD-MM-YYYY").format("YYYY-MM-DD");
    const formattedTime = moment(time, 'hh:mm A').format('HH:mm:ss.SSSZ');
    const dateTimeStr = `${date}T${formattedTime}`;
    const isoStr = moment(dateTimeStr).toISOString();
    return isoStr;
  };
  const checkingBooking = useFetchPost(
    API.CHECK_AVALIABILITY + `${id._id}`,
    {
      startTime: convertToISO(selectedDate, selectedStartTime),
      endTime: convertToISO(selectedDate, selectedEndTime),
    },
    goForCheckApi,
    userAccessToken,
  );

  useEffect(() => {
    if (!checkingBooking.loading) {
      if (checkingBooking.response?.status === 201) {
        console.log(checkingBooking.response);
        navigation.navigate(AUTH.ADDATTENDEES, {
          data: id,
          name: name,
          description: description,
          prestartTime: convertToISO(selectedDate, selectedStartTime),
          preEndTime: convertToISO(selectedDate, selectedEndTime),
          preCompanyID: selectedCompanyID,
        });
        //  SimpleToast.show('Annuouncement Created Successfully', SimpleToast.BOTTOM )
        //  setTimeout(() => {
        //   navigation.navigate('Home');
        // }, 2000);
      } else if (checkingBooking.response?.status === 500) {
        // SimpleToast.show('Please add Title', SimpleToast.BOTTOM );
        console.log(checkingBooking.response.data.error.message);
      } else {
        console.log('Add Announcement Error');
      }
    }
    setGoForCheckApi(false);
  }, [checkingBooking.loading]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <CalenderModal
        visible={calendar}
        navigation={navigation}
        onSwipeComplete={() => setCalender(false)}
        backPressed={() => setCalender(false)}
        onSaveDate={handleSaveDate}
        onBackdropPress
      />
      <EndTime
        visible={endClock}
        navigation={navigation}
        onSwipeComplete={() => setEndClock(false)}
        backPressed={() => setEndClock(false)}
        onSaveDate={handleEndTime}
        // onBackdropPress
      />
      <StartTime
        visible={clock}
        navigation={navigation}
        onSwipeComplete={() => setClock(false)}
        backPressed={() => setClock(false)}
        onSaveDate={handleSaveTime}
        // onBackdropPress
      />
      <ScrollView
        style={{paddingHorizontal: 24, flex: 1, backgroundColor: 'white'}}>
        <TouchableOpacity
          style={{marginTop: 40, marginBottom: 14}}
          onPress={() => navigation.goBack()}>
          <Left />
        </TouchableOpacity>
        <View style={{marginBottom: 14}}>
          <Text regular appPrimary body1>
            1/2 step
          </Text>
        </View>
        <View style={{marginBottom: 18}}>
          <Text regular heading2>
            Add Room Details
          </Text>
        </View>
        <View
          style={{
            height: 167,
            borderWidth: 1,
            borderRadius: 8,
            marginBottom: 18,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: id.images[0]}}
            style={{height: 165, width: '100%'}}
          />
        </View>
        <View style={{marginBottom: 25}}>
          <Text regular appPrimary title4>
            {id.name}
          </Text>
        </View>
        <View>
          <CustomTextInput
            mainStyle={{marginBottom: 18}}
            placeholder={'Name'}
            value={name}
            onChangeText={setName}
            placeholderTextColor={colors.secondaryColor}
          />
        </View>
        <SelectDropdown
          data={companyData}
          // defaultValueByIndex={1}
          // defaultValue={{
          //   title: 'England',
          //   image: require('./Images/England.jpg'),
          // }}
          onScrollEndReached={loadMoreData}
          onSelect={(selectedItem, index) => {
            console.log('====================================');
            console.log(selectedItem);
            console.log('====================================');
            console.log(selectedItem, index, 'dsaasdasss');
            // setSelectedItem(selectedItem.name);
            setSelectedCompanyID(selectedItem._id);
          }}
          // buttonTextAfterSelection={(selectedItem, index) => {
          //   return selectedItem;
          // }}
          rowStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'rgba(233, 234, 233, 1)',
          }}
          buttonStyle={{
            width: '100%',
            marginBottom: 8,
            backgroundColor: `#F6F5F5`,
            borderWidth: 1,
            borderColor: 'rgba(233, 234, 233, 1)',
            marginBottom: 18,
            paddingHorizontal: 10,
            borderRadius: 8,
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
                    color: selectedItem ? 'black' : colors.secondaryColor,
                  }}>
                  {selectedItem ? selectedItem.name : 'Company'}
                </Text>
                <DirectoryArrrowDown width={20} height={20} />
              </View>
            );
          }}
          // dropdownStyle={styles.dropdown3DropdownStyle}
          // rowStyle={styles.dropdown3RowStyle}
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
                  {item.name}
                </Text>
              </View>
            );
          }}
        />
        <View>
          <CustomTextInput
            icon={<Calendar />}
            placeholder={'Date'}
            editable={false}
            onPress={handleButtonClick}
            value={selectedDate}
            placeholderTextColor={colors.secondaryColor}
            mainStyle={{marginBottom: 13, alignItems: 'center'}}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            alignItems: 'center',
            // backgroundColor:'green'
          }}>
          {/* <CustomTextInput
            mainStyle={{
              height: 56,
              flex: 0.45,
              borderWidth: 1,
              borderColor: colors.textGreyDark,
              alignItems: 'center',
            }}
            placeholder={'From'}
            placeholderTextColor={colors.secondaryColor}
            icon={<BigDown />}
            editable={false}
            onPress={handleButtonStartClock}
            value={startTime}
          /> */}
          <View
            style={{
              width: '46%',
              height: 57,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#c4c4c4',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Picker
              // itemStyle={styles.itemStyle}
              mode="dropdown"
              style={{
                width: '100%',
                color: selectedStartTime ? 'black' : 'rgba(125,123,124,1)',
                fontSize: 14,
                backgroundColor: '#F6F5F5',
              }}
              selectedValue={selectedStartTime}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedStartTime(itemValue)
              }>
              <Picker.Item label="Start Time" value="" />
              {makeTimeSlots().map((item, index) => (
                <Picker.Item
                  color={
                    filterStartSlots(item) ? colors.secondaryColor : 'black'
                  }
                  label={item}
                  value={item}
                  enabled={filterStartSlots(item) ? false : true}
                  index={index}
                />
              ))}
            </Picker>
          </View>
          {/* <CustomDropdown
            data={(value)=>value.forEach((item) => {
              filterStartSlots(item);
            })
          }

          // disabled={console.log(item)}
          /> */}
          <LongArrow />
          <View
            style={{
              width: '45%',
              height: 57,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#c4c4c4',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Picker
              itemStyle={styles.itemStyle}
              mode="dropdown"
              style={{
                width: '99%',
                color: selectedEndTime ? 'black' : 'rgba(125,123,124,1)',
                fontSize: 14,
                backgroundColor: '#F6F5F5',
              }}
              selectedValue={selectedEndTime}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedEndTime(itemValue)
              }>
              <Picker.Item label="End Time" value="" />
              {makeTimeSlots().map((item, index) => (
                <Picker.Item
                  key={index}
                  color={
                    filterEndSlots(item, selectedStartTime)
                      ? colors.secondaryColor
                      : 'black'
                  }
                  label={item}
                  value={item}
                  enabled={!filterEndSlots(item, selectedStartTime)}
                />
              ))}
            </Picker>
          </View>
          {/* <CustomTextInput
            mainStyle={{
              height: 56,
              flex: 0.45,
              borderWidth: 1,
              borderColor: colors.textGreyDark,
              alignItems: 'center',
            }}
            placeholder={'To'}
            placeholderTextColor={colors.secondaryColor}
            icon={<BigDown />}
            editable={false}
            onPress={handleButtonEndClock}
            value={endTime}
          /> */}
          {/* <CustomDropdown /> */}
        </View>
        <View style={{marginBottom: 15}}>
          <CustomTextInput
            placeholder="Meeting description"
            mainStyle={{
              height: 128,
              borderWidth: 1,
              borderColor: colors.textGreyDark,
              alignItems: 'flex-start',
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28}}
            onChangeText={setDescription}
            value={description}
            multiline={true}
            numberOfLines={4}
            maxLength={500}
          />
        </View>
      </ScrollView>
      {/* <CustomDropdown /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 15,
          height: 60,
          paddingVertical: 10,
          backgroundColor: 'white',
        }}>
        <Button
          buttonStyle={{flex: 0.4}}
          title={`Back`}
          onPress={() => navigation.goBack()}
        />
        <Button
          buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
          title={`Next`}
          textStyles={{color: colors.whiteBackground}}
          onPress={resendPressed}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
  pickerStyle: {
    width: '45%',
    height: 40,
    color: 'rgba(125,123,124,1)',
    fontSize: 14,
    backgroundColor: '#F6F5F5',
  },
});

//make this component available to the app
export default AddRoom;
