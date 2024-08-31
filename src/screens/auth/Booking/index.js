//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  BigDown,
  Calendar,
  ClearFilter,
  DrawerIcon,
  LongArrow,
  MeetingBoard,
  Message,
  Notification,
  PurpleCalender,
  Time,
} from '../../../assets';
import {
  ALLBooking,
  AnnouncementSearchBar,
  BookRoom,
  CalenderModal,
  CustomTextInput,
  EndTime,
  EventCard,
  StartTime,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {TabBar, TabView} from 'react-native-tab-view';
import moment from 'moment';
import 'moment-timezone';
import {AUTH} from '../../../navigation/ROUTES';
import {
  API,
  useFetchDelete,
  useFetchGet,
  useFetchPost,
} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import SimpleToast from 'react-native-simple-toast';

// create a component
const Booking = ({navigation}) => {
  const colors = useTheme();

  /** Meeting Room */
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [calendar, setCalender] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [clock, setClock] = useState(false);
  const [endClock, setEndClock] = useState(false);
  const [goForRemove, setGoForRemove] = useState(false);
  const [Id, setId] = useState('');
  const userAccessToken = useSelector(state => state.user.userAccessToken);

  const handleSaveTime = date => {
    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    setStartTime(formattedTime);
  };

  const handleEndTime = date => {
    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    setEndTime(formattedTime);
    // setMyFilter(true);
    setMeetiingFilter(true);
  };

  const convertToISO = (date, time) => {
    const formattedTime = moment(time, 'hh:mm A').format('HH:mm:ss.SSSZ');
    const dateTimeStr = `${date}T${formattedTime}`;
    const isoStr = moment(dateTimeStr).toISOString();
    return isoStr;
  };

  const handleButtonEndClock = () => {
    setEndClock(true);
  };

  const handleButtonStartClock = () => {
    setClock(true);
  };

  const handleSaveDate = date => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
    // setgoForfilterApiCall(true)
  };

  const handleButtonClick = () => {
    setCalender(true);
  };

  const handleSearchChange = text => {
    setSearch(text);
    // setGoForSearchUserApiCall(true);
    console.log('====================================');
  };

  const onSubmit = text => {
    console.log('====================================');
    console.log(text);
    console.log('====================================');
  };

  const deleteBooking = useFetchDelete(
    API.DELETE_BOOKINGS + `${Id}`,
    {},
    goForRemove,
    userAccessToken,
  );

  /** response of api call deleting product from wishlist */
  useEffect(() => {
    if (!deleteBooking.loading) {
      if (deleteBooking.response?.status === 201) {
        SimpleToast.show('Booking Deleted');
        setMySkip(1);
        setMyLimit(10);
        setMyData([]);
        setGoForMyCall(true);
        setBookingSkip(1);
        setBookingLimit(10);
        setBookinData([]);
        setGoForBookingCall(true);
      }
    } else {
      console.log('errror');
    }
    setGoForRemove(false);
  }, [deleteBooking.loading]);

  const deletebooking = item => {
    setId(item);
    setGoForRemove(true);
  };

  // Define the tabs and their routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Meetingrooms', title: 'Meeting rooms'},
    {key: 'AllBookings', title: 'All Bookings'},
    {key: 'MyBookings', title: 'My Bookings'},
  ]);

  /** apis for Meeeting Rooms */
  const [goForMeetingCall, setGoForMeetingCall] = useState(true);
  const [limit, setLimit] = useState(10);
  const [skip, setSkip] = useState(1);
  const [meetingData, setMeetingData] = useState([]);
  const [allMeetingRoom, setAllMeetingRoom] = useState(true);
  const [allMeetingRoomData, setAllMeetingRoomData] = useState('');

  const handleMeetingSearchChange = text => {
    setMeetingSearch(text);
    // setGoForSearchUserApiCall(true);
    console.log('====================================');
  };

  const onMeetingSubmit = text => {
    console.log('====================================');
    console.log(text);
    console.log('====================================');
  };

  const getTotalMeetigRoom = useFetchGet(
    API.GET_ALL_MEETING_ROOM,
    allMeetingRoom,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getTotalMeetigRoom?.loading) {
      if (getTotalMeetigRoom?.response?.status === 201) {
        setAllMeetingRoomData(getTotalMeetigRoom?.response?.data?.count);
      }
    } else {
      console.log('error in All users ');
    }
    setAllMeetingRoom(false);
  }, [getTotalMeetigRoom.loading]);

  const getMeetingRoom = useFetchGet(
    API.MEEETING_RESOURCES,
    goForMeetingCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getMeetingRoom?.loading) {
      if (
        getMeetingRoom?.response?.status === GeneralResponses.STATUS_OK.CODE
      ) {
        // setMeetingData(getMeetingRoom?.response?.data?.docs);
        setMeetingData([
          ...meetingData,
          ...getMeetingRoom?.response?.data?.docs,
        ]);
        setSkip(skip + 1);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForMeetingCall(false);
  }, [getMeetingRoom.loading]);

  const [meetingFilter, setMeetiingFilter] = useState(false);

  const meetingfilter = useFetchPost(
    API.MEETING_FILTER,
    {
      startTime: convertToISO(selectedDate, startTime),
      endTime: convertToISO(selectedDate, endTime),
    },
    meetingFilter,
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!meetingfilter.loading) {
      if (meetingfilter.response?.status === 201) {
        setMeetingData(meetingfilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setMeetiingFilter(false);
  }, [meetingfilter.loading]);

  const meetingEnd = () => {
    // setGoForMeetingCall(true);
    console.log('====================================');
    console.log('MEEEEtTTIIIINNGG');
    console.log('====================================');
  };

  const bookPressed = item => {
    navigation.navigate(AUTH.ADDROOM, {
      data: item,
    });
  };

  const meetingRoomFilter = () => {
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setLimit(10);
    setSkip(1);
    setMeetingData([])
    setGoForMeetingCall(true);
  };

  /** apis for ALL Booking */
  const [goForBookingCall, setGoForBookingCall] = useState(true);
  const [bookinglimit, setBookingLimit] = useState(10);
  const [bookingskip, setBookingSkip] = useState(1);
  const [BookingData, setBookinData] = useState([]);
  const [allFilter, setAllFilter] = useState(false);
  const [totalAllBooking, setTotalAllBooking] = useState('');

  const [allselectedDate, setAllSelectedDate] = useState('');
  const [allcalendar, setAllCalender] = useState(false);
  const [allstartTime, setAllStartTime] = useState('');
  const [allendTime, setAllEndTime] = useState('');
  const [allclock, setAllClock] = useState(false);
  const [allendClock, setAllEndClock] = useState(false);

  const handleAllSaveTime = date => {
    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    setAllStartTime(formattedTime);
  };

  const handleAllEndTime = date => {
    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    setAllEndTime(formattedTime);
    setAllFilter(true);
  };

  const handleButtonAllEndClock = () => {
    setAllEndClock(true);
  };

  const handleButtonAllStartClock = () => {
    setAllClock(true);
  };

  const handleSaveAllDate = date => {
    const formattedDate = date.format('YYYY-MM-DD');
    setAllSelectedDate(formattedDate);
    // setgoForfilterApiCall(true)
  };

  const handleButtonAllClick = () => {
    setAllCalender(true);
  };

  const getBooking = useFetchGet(
    API.ALL_BOOKING,
    goForBookingCall,
    {},
    userAccessToken,
    bookinglimit,
    bookingskip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getBooking?.loading) {
      if (getBooking?.response?.status === 201) {
        // setMeetingData(getMeetingRoom?.response?.data?.docs);
        // setBookinData([ ...getBooking,...getBooking?.response?.data?.docs]);
        setBookinData(prevData => [
          ...prevData,
          ...getBooking?.response?.data?.docs,
        ]);
        setBookingSkip(bookingskip + 1);
        setTotalAllBooking(getBooking?.response?.data?.totalDocs);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForBookingCall(false);
  }, [getBooking.loading]);

  const allfilter = useFetchPost(
    API.ALL_BOOKING,
    {
      startTime: convertToISO(allselectedDate, allstartTime),
      endTime: convertToISO(allselectedDate, allendTime),
    },
    allFilter,
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!allfilter.loading) {
      if (allfilter.response?.status === 201) {
        setBookinData(allfilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setAllFilter(false);
  }, [allfilter.loading]);

  const allbookingfilter = () => {
    setAllSelectedDate('');
    setAllStartTime('');
    setAllEndTime('');
    setBookingLimit(10);
    setBookingSkip(1);
    setBookinData([]);
    setGoForBookingCall(true);
  };

  const AllBooking = () => {
    // setGoForBookingCall(true);
    console.log('====================================');
    console.log('Log ALL BBOOOKING');
    console.log('====================================');
  };

  // const bookPressed = item => {
  //   navigation.navigate(AUTH.ADDROOM, {
  //     data: item,
  //   });
  // };

  function formatTime(hours) {
    // Convert 24-hour format to AM/PM format

    if (hours === 0) {
      return '12 AM';
    } else if (hours < 12) {
      return `${hours} AM`;
    } else if (hours === 12) {
      return '12 PM';
    } else {
      return `${hours - 12} PM`;
    }
  }

  const calculateTimeDifference = (fromHours, toHours) => {
    const difference = toHours - fromHours;
    return difference;
  };

  /** apis for My Booking */
  const [goForMyCall, setGoForMyCall] = useState(true);
  const [mylimit, setMyLimit] = useState(10);
  const [myskip, setMySkip] = useState(1);
  const [myData, setMyData] = useState([]);
  const [totalMyBoooking, setTotalMyBoooking] = useState('');

  const [myselectedDate, setMySelectedDate] = useState('');
  const [mycalendar, setMyCalender] = useState(false);
  const [mystartTime, setMyStartTime] = useState('');
  const [myendTime, setMyEndTime] = useState('');
  const [myclock, setMyClock] = useState(false);
  const [myendClock, setMyEndClock] = useState(false);

  const handleMySaveTime = date => {
    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    setMyStartTime(formattedTime);
  };

  const handleMyEndTime = date => {
    const localTime = moment(date).tz(moment.tz.guess());
    const formattedTime = localTime.format('hh:mm A');
    setMyEndTime(formattedTime);
    setMyFilter(true);
  };

  const handleButtonMyEndClock = () => {
    setMyEndClock(true);
  };

  const handleButtonMyStartClock = () => {
    setMyClock(true);
  };

  const handleSaveMyDate = date => {
    const formattedDate = date.format('YYYY-MM-DD');
    setMySelectedDate(formattedDate);
    // setgoForfilterApiCall(true)
  };

  const handleButtonMyClick = () => {
    setMyCalender(true);
  };

  const getMyBooking = useFetchGet(
    API.MY_BOOKING,
    goForMyCall,
    {},
    userAccessToken,
    mylimit,
    myskip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getMyBooking?.loading) {
      if (getMyBooking?.response?.status === 201) {
        // setMeetingData(getMeetingRoom?.response?.data?.docs);
        // setBookinData([ ...getBooking,...getBooking?.response?.data?.docs]);
        setMyData(prevData => [
          ...prevData,
          ...getMyBooking?.response?.data?.docs,
        ]);
        setMySkip(myskip + 1);
        setTotalMyBoooking(getMyBooking?.response?.data?.totalDocs);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForMyCall(false);
  }, [getMyBooking.loading]);

  const [myFilter, setMyFilter] = useState(false);

  const myfilter = useFetchPost(
    API.MY_BOOKING,
    {
      startTime: convertToISO(myselectedDate, mystartTime),
      endTime: convertToISO(myselectedDate, myendTime),
    },
    myFilter,
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!myfilter.loading) {
      if (myfilter.response?.status === 201) {
        setMyData(myfilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setMyFilter(false);
  }, [myfilter.loading]);

  const myBooking = () =>{
console.log('====================================');
console.log('why are you hitting at this point');
console.log('====================================');
  }

  const mybookingfilter = () => {
    setMySelectedDate('');
    setMyStartTime('');
    setMyEndTime('');
    setMyLimit(10);
    setMySkip(1);
    setMyData([]);
    setGoForMyCall(true);
  };

  const PeopleInvited = item => {
    navigation.navigate(AUTH.PINVITED, {
      data: item,
    });
  };

  // Render each tab scene
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Meetingrooms':
        return (
          <>
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
              <View style={{marginTop: 20, marginBottom: 8}}>
                <AnnouncementSearchBar
                  onSubmit={() => onMeetingSubmit(search)}
                  value={search}
                  onChangeText={handleMeetingSearchChange}
                  placeholderTextColor={colors.appLight}
                  placeholder={'Search Meeting rooms'}
                />
              </View>
              {/* <View style={{flexDirection: 'row'}}>
                <CustomTextInput
                  icon={<Calendar />}
                  placeholder={'Date'}
                  editable={false}
                  onPress={handleButtonClick}
                  value={selectedDate}
                  placeholderTextColor={colors.secondaryColor}
                  mainStyle={{flex: 0.96, marginRight: 10}}
                />
                <TouchableOpacity onPress={meetingRoomFilter}>
                  <ClearFilter />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  alignItems: 'center',
                }}>
                <CustomTextInput
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
                />
                <LongArrow />
                <CustomTextInput
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
                />
              </View> */}
              <FlatList
                data={meetingData}
                keyExtractor={(item, index) => item._id}
                onEndReached={meetingEnd}
                ListHeaderComponent={()=>(
                  <>
                  <View style={{flexDirection: 'row'}}>
                  <CustomTextInput
                    icon={<Calendar />}
                    placeholder={'Date'}
                    editable={false}
                    onPress={handleButtonClick}
                    value={selectedDate}
                    placeholderTextColor={colors.secondaryColor}
                    mainStyle={{flex: 0.96, marginRight: 10}}
                  />
                  <TouchableOpacity onPress={meetingRoomFilter}>
                    <ClearFilter />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 15,
                    alignItems: 'center',
                  }}>
                  <CustomTextInput
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
                  />
                  <LongArrow />
                  <CustomTextInput
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
                  />
                </View>
                </>
                )}
                onEndReachedThreshold={0.5}
                renderItem={({item}) => {
                  let floorText;
                  switch (item?.floorNumber) {
                    case '1':
                      floorText = "1'st floor";
                      break;
                    case '2':
                      floorText = "2'nd floor";
                      break;
                    case '3':
                      floorText = "3'rd floor";
                      break;
                    default:
                      floorText = `${item?.floorNumber}th floor`;
                      break;
                  }
                  return (
                    <BookRoom
                      image={{uri: item?.images[0]}}
                      Name={item?.name}
                      Description={item?.description}
                      floor={floorText}
                      Seats={item?.capacity}
                      onPress={() => bookPressed(item)}
                    />
                  );
                }}
              />
          </>
        );
      case 'AllBookings':
        return (
          <>
            <CalenderModal
              visible={allcalendar}
              navigation={navigation}
              onSwipeComplete={() => setAllCalender(false)}
              backPressed={() => setAllCalender(false)}
              onSaveDate={handleSaveAllDate}
              onBackdropPress
            />
            <EndTime
              visible={allendClock}
              navigation={navigation}
              onSwipeComplete={() => setAllEndClock(false)}
              backPressed={() => setAllEndClock(false)}
              onSaveDate={handleAllEndTime}
              // onBackdropPress
            />
            <StartTime
              visible={allclock}
              navigation={navigation}
              onSwipeComplete={() => setAllClock(false)}
              backPressed={() => setAllClock(false)}
              onSaveDate={handleAllSaveTime}
              // onBackdropPress
            />
              <View style={{marginTop: 20, marginBottom: 8}}>
                <AnnouncementSearchBar
                  onSubmit={() => onSubmit(search)}
                  value={search}
                  onChangeText={handleSearchChange}
                  placeholderTextColor={colors.appLight}
                  placeholder={'Search All Bookings'}
                />
              </View>
              {/* <View style={{flexDirection: 'row'}}>
                <CustomTextInput
                  icon={<Calendar />}
                  placeholder={'Date'}
                  editable={false}
                  onPress={handleButtonAllClick}
                  value={allselectedDate}
                  placeholderTextColor={colors.secondaryColor}
                  mainStyle={{flex: 0.96, marginRight: 10}}
                />
                <TouchableOpacity onPress={allbookingfilter}>
                  <ClearFilter />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  alignItems: 'center',
                }}>
                <CustomTextInput
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
                  onPress={handleButtonAllStartClock}
                  value={allstartTime}
                />
                <LongArrow />
                <CustomTextInput
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
                  onPress={handleButtonAllEndClock}
                  value={allendTime}
                />
              </View> */}
              <FlatList
                data={BookingData}
                onEndReached={AllBooking}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => item?._id || index.toString()}
                ListHeaderComponent={()=>(
                  <>
                  <View style={{flexDirection: 'row'}}>
                <CustomTextInput
                  icon={<Calendar />}
                  placeholder={'Date'}
                  editable={false}
                  onPress={handleButtonAllClick}
                  value={allselectedDate}
                  placeholderTextColor={colors.secondaryColor}
                  mainStyle={{flex: 0.96, marginRight: 10}}
                />
                <TouchableOpacity onPress={allbookingfilter}>
                  <ClearFilter />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  alignItems: 'center',
                }}>
                <CustomTextInput
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
                  onPress={handleButtonAllStartClock}
                  value={allstartTime}
                />
                <LongArrow />
                <CustomTextInput
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
                  onPress={handleButtonAllEndClock}
                  value={allendTime}
                />
              </View> 
                  </>
                )}
                renderItem={({item, index}) => {
                  const start = new Date(item?.startTime);
                  const localDate = start.toLocaleDateString();
                  const formattedStartTime = moment(item?.startTime).format(
                    'h:mm A',
                  );
                  const formattedEndTime = moment(item?.endTime).format(
                    'h:mm A',
                  );
                  const durationInHours = moment
                    .duration(
                      moment(item.endTime).diff(moment(item?.startTime)),
                    )
                    .asHours();
                  let tempArray = [...item.attendees, ...item.visitors];
                  return (
                    <ALLBooking
                      image={{uri: item?.resource?.images[0]}}
                      Title={item?.name}
                      CompanyName={item?.company?.name}
                      description={item?.description}
                      StartDate={localDate}
                      From={formattedStartTime}
                      To={formattedEndTime}
                      Duration={`${durationInHours} hours`}
                      imageData={tempArray}
                      onPress={() => deletebooking(item._id)}
                      ViewAll={() => PeopleInvited(item)}
                    />
                  );
                }}
              />
          </>
        );
      case 'MyBookings':
        return (
          <>
            <CalenderModal
              visible={mycalendar}
              navigation={navigation}
              onSwipeComplete={() => setMyCalender(false)}
              backPressed={() => setMyCalender(false)}
              onSaveDate={handleSaveMyDate}
              onBackdropPress
            />
            <EndTime
              visible={myendClock}
              navigation={navigation}
              onSwipeComplete={() => setMyEndClock(false)}
              backPressed={() => setMyEndClock(false)}
              onSaveDate={handleMyEndTime}
              // onBackdropPress
            />
            <StartTime
              visible={myclock}
              navigation={navigation}
              onSwipeComplete={() => setMyClock(false)}
              backPressed={() => setMyClock(false)}
              onSaveDate={handleMySaveTime}
              // onBackdropPress
            />
              <View style={{marginTop: 20, marginBottom: 8}}>
                <AnnouncementSearchBar
                  onSubmit={() => onSubmit(search)}
                  value={search}
                  onChangeText={handleSearchChange}
                  placeholderTextColor={colors.appLight}
                  placeholder={'Search My Booking'}
                />
              </View>
              {/* <View style={{flexDirection: 'row'}}>
                <CustomTextInput
                  icon={<Calendar />}
                  placeholder={'Date'}
                  editable={false}
                  onPress={handleButtonMyClick}
                  value={myselectedDate}
                  placeholderTextColor={colors.secondaryColor}
                  mainStyle={{flex: 0.96, marginRight: 10}}
                />
                <TouchableOpacity onPress={mybookingfilter}>
                  <ClearFilter />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  alignItems: 'center',
                }}>
                <CustomTextInput
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
                  onPress={handleButtonMyStartClock}
                  value={mystartTime}
                />
                <LongArrow />
                <CustomTextInput
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
                  onPress={handleButtonMyEndClock}
                  value={myendTime}
                />
              </View> */}
              <FlatList
                data={myData}
                onEndReached={myBooking}
                ListHeaderComponent={()=>(
                  <>
                   <View style={{flexDirection: 'row'}}>
                <CustomTextInput
                  icon={<Calendar />}
                  placeholder={'Date'}
                  editable={false}
                  onPress={handleButtonMyClick}
                  value={myselectedDate}
                  placeholderTextColor={colors.secondaryColor}
                  mainStyle={{flex: 0.96, marginRight: 10}}
                />
                <TouchableOpacity onPress={mybookingfilter}>
                  <ClearFilter />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  alignItems: 'center',
                }}>
                <CustomTextInput
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
                  onPress={handleButtonMyStartClock}
                  value={mystartTime}
                />
                <LongArrow />
                <CustomTextInput
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
                  onPress={handleButtonMyEndClock}
                  value={myendTime}
                />
              </View>
                  </>
                )}
                onEndReachedThreshold={0.5} 
                keyExtractor={(item, index) => item?._id || index.toString()}
                renderItem={({item, index}) => {
                  // const attendeesCount = item?.attendees?.length;
                  const start = new Date(item?.startTime);
                  const localDate = start.toLocaleDateString();
                  // const StartHours = parseInt(item?.startTime.slice(0, 2));
                  // const endHours = parseInt(item?.endTime.slice(0, 2));
                  // const formattedStartTime = formatTime(StartHours);
                  // const formattedEndTime = formatTime(endHours);
                  const formattedStartTime = moment(item?.startTime).format(
                    'h:mm A',
                  );
                  const formattedEndTime = moment(item?.endTime).format(
                    'h:mm A',
                  );
                  const durationInHours = moment
                    .duration(
                      moment(item.endTime).diff(moment(item?.startTime)),
                    )
                    .asHours();

                  // const timeDifference = calculateTimeDifference(
                  //   StartHours,
                  //   endHours,
                  // );
                  let tempArray = [...item.attendees, ...item.visitors];
                  return (
                    <ALLBooking
                      image={{uri: item?.resource?.images[0]}}
                      Title={item?.name}
                      CompanyName={item?.company?.name}
                      description={item?.description}
                      StartDate={localDate}
                      From={formattedStartTime}
                      To={formattedEndTime}
                      Duration={`${durationInHours} hours`}
                      imageData={tempArray}
                      onPress={() => deletebooking(item._id)}
                      ViewAll={() => PeopleInvited(item)}
                    />
                  );
                }}
              />
          </>
        );
      default:
        return null;
    }
  };

  // Render the tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      inactiveColor={'rgba(125, 123, 124, 1)'}
      activeColor={'rgba(39, 38, 39, 1)'}
    />
  );
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
      <View style={{paddingHorizontal: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text heading2 bold style={{lineHeight: 31}}>{`Bookings`}</Text>
          {index === 0 ? (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(238, 229, 241, 1)',
                height: 40,
                width: 140,
                borderRadius: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 0.8,
                paddingHorizontal: 5,
              }}>
              <MeetingBoard />
              <Text caption1 bold>
                Available Meeting rooms
              </Text>
              <Text regular body2>
                {allMeetingRoomData}
              </Text>
            </View>
          ) : index === 1 ? (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(238, 229, 241, 1)',
                height: 40,
                width: 140,
                borderRadius: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 0.8,
                paddingHorizontal: 5,
              }}>
              <MeetingBoard />
              <Text caption1 bold>
                Occupied Meeting Rooms:
              </Text>
              <Text regular body2>
                {totalAllBooking}
              </Text>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'rgba(238, 229, 241, 1)',
                height: 40,
                width: 133,
                borderRadius: 8,
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 0.8,
                paddingHorizontal: 5,
              }}>
              <PurpleCalender />
              <Text caption1 bold>
                Total Bookings
              </Text>
              <Text regular body2>
                {totalMyBoooking}
              </Text>
            </View>
          )}
        </View>
        <View style={{marginTop: 5, marginBottom: 17}}>
          {index === 0 ? (
            <Text netural regular body2 style={{lineHeight: 18}}>
              {`Book Meeting rooms`}
            </Text>
          ) : index === 1 ? (
            <Text netural regular body2 style={{lineHeight: 18}}>
              {`Manage All Bookings`}
            </Text>
          ) : (
            <Text netural regular body2 style={{lineHeight: 18}}>
              {`Manage My Bookings`}
            </Text>
          )}
        </View>
      </View>
      <View style={{flex: 1, paddingHorizontal: 24}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabbar: {
    backgroundColor: 'white',
    // borderBottomWidth:1,
    // borderBottomColor:'rgba(233, 234, 233, 1)'
  },
  tab: {
    width: 180,
  },
  indicator: {
    backgroundColor: 'rgba(39, 38, 39, 1)',
    width: '30%',
  },
  label: {
    fontWeight: '500',
    color: '#272627',
    fontSize: 18,
    lineHeight: 23,
    fontFamily: 'DM Sans',
    textTransform: 'none',
    // marginRight:10,
    // paddingRight:10,
    marginRight: 8,
  },
  page: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

//make this component available to the app
export default Booking;
