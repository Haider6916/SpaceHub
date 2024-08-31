//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme} from '../../../config/theme';
import {
  AddButton,
  AnnouncementSearchBar,
  CalenderModal,
  CustomTextInput,
  EventCard,
} from '../../../components';
import {Calendar, Left} from '../../../assets';
import {Text} from '../../../components';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchDelete, useFetchGet} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {useIsFocused} from '@react-navigation/native';
import SimpleToast from 'react-native-simple-toast';
// create a component
const Events = ({navigation}) => {
  const [goForGetApiCall, setgoForGetApiCall] = useState(true);
  const [data, setData] = useState([]);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [limit, setlimit] = useState(10);
  const [skip, setSkip] = useState(1);
  const [loadMore, setloadMore] = useState(true);
  const [attendees, setattendees] = useState([]);
  const colors = useTheme();
  const [calendar, setCalender] = useState(false);
  const [goForRemove, setGoForRemove] = useState(false);
  const isFocused = useIsFocused();
  const [id, setid] = useState('');
  const [renderData, setRenderData] = useState([]);

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

  const getEvent = useFetchGet(
    API.ALL_EVENT,
    goForGetApiCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getEvent.loading) {
      if (getEvent.response?.status === 201) {
        console.log('====================================docsss');
        const attendees = data.map(data => data.attendees);
        setattendees(attendees);
        console.log('====================================');
        console.log(attendees);
        console.log('====================================');
        console.log('====================================');
        setData(prevData => [...prevData, ...getEvent?.response?.data?.docs]);
        setSkip(prevSkip => prevSkip + 1);
        setloadMore(false);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setgoForGetApiCall(false);
  }, [getEvent.loading]);

  const endlist = () => {
    setgoForGetApiCall(true);
  };

  const [selectedDate, setSelectedDate] = useState('');

  const handleSaveDate = date => {
    const formattedDate = date.format('YYYY-MM-DD');

    setSelectedDate(formattedDate);
    setgoForfilterApiCall(true);
  };

  const handleButtonClick = () => {
    setCalender(true);
  };

  useEffect(() => {
    setSkip(1);
    setlimit(10);
    setData([]);
    setgoForGetApiCall(true);
    setSelectedDate('');
  }, [isFocused, navigation]);

  /** api call for deleting product from wishlist */
  const deleteevent = useFetchDelete(
    API.DELETE_EVENT + `${id}`,
    {},
    goForRemove,
    userAccessToken,
  );

  /** response of api call deleting product from wishlist */
  useEffect(() => {
    if (!deleteevent.loading) {
      console.log('====================================');
      console.log(deleteevent.response);
      console.log('====================================');
      if (deleteevent.response?.status === 201) {
        SimpleToast.show('Event Removed');
        setSkip(1);
        setlimit(10);
        setData([]);
        setgoForGetApiCall(true);
      }
    } else {
      console.log('errror');
    }
    setGoForRemove(false);
  }, [deleteevent.loading]);

  const deleteEvent = item => {
    setid(item);
    setGoForRemove(true);
  };

  const UpdateEvent = item => {
    navigation.navigate(AUTH.UPDATEEVENT, {
      data: item,
    });
  };

  const PeopleEvent = item => {
    navigation.navigate(AUTH.PINEVENT, {
      data: item,
    });
  };

  const [goForSearchApiCall, setGoForSearchApiCall] = useState(false);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);

  const getSearchEvent = useFetchGet(
    API.ALL_EVENT + `?search=${search}`,
    goForSearchApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getSearchEvent.loading) {
      if (getSearchEvent.response?.status === 201) {
        console.log('====================================');
        console.log(getSearchEvent.response);
        console.log('====================================');
        onApiSuccess(getSearchEvent);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForSearchApiCall(false);
  }, [getSearchEvent.loading, search]);

  /**
   * method called on success of Api
   * @param {*} Search response
   */
  const onApiSuccess = getSearchEvent => {
    setSearchData(getSearchEvent?.response?.data?.docs);
    console.log('====================================');
    console.log(getSearchEvent);
    console.log('====================================');
  };

  const handleSearchChange = text => {
    setSearch(text);
    setGoForSearchApiCall(true);
  };

  const onSubmit = text => {
    if (text === '') {
      setgoForGetApiCall(true);
    } else {
      setSearch(text);
      setGoForSearchApiCall(true);
    }
  };

  // const renderData = search === '' ? data : searchData;

  useEffect(() => {
    const updatedRenderData = search === '' ? data : searchData;
    setRenderData(updatedRenderData);
  }, [search, data]);

  const [goForfilterApiCall, setgoForfilterApiCall] = useState(false);

  const getFilterEvent = useFetchGet(
    API.ALL_EVENT + `?filter=${selectedDate}`,
    goForfilterApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getFilterEvent.loading) {
      if (getFilterEvent.response?.status === 201) {
        console.log('====================================filter');
        console.log(getFilterEvent.response);
        console.log('====================================');
        // onApiSuccess(getFilterEvent);
        setData(getFilterEvent?.response?.data?.docs);
      }
    } else {
      console.log('error occured in api call');
    }
    setgoForfilterApiCall(false);
  }, [getFilterEvent.loading]);

  /**
   * method called on success of Api
   * @param {*} Search response
   */
  //  const onApiSuccess = getSearchEvent => {
  //   setSearchData(getSearchEvent?.response?.data?.docs);
  //   console.log('====================================');
  //   console.log(getSearchEvent);
  //   console.log('====================================');
  // };

  const handleLinkOnMapPress = item => {
    const url = item.locationLink; // Replace 'item.link' with the actual URL you want to open in Chrome

    if (url) {
      Linking.openURL(url).catch(err => {
        console.error('Failed to open URL:', err);
      });
    } else {
      SimpleToast.show('Link is Empty');
    }
}

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
      <SafeAreaView
        style={{
          backgroundColor: colors.whiteBackground,
          flex: 1,
        }}>
        <View style={{paddingHorizontal: 24, flex: 1}}>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <TouchableOpacity
              style={{flex: 0.15}}
              onPress={() => navigation.goBack()}>
              <Left />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            <View style={{flex: 1}}>
              <Text
                bold
                heading2
                style={{lineHeight: 31, color: 'rgba(39, 38, 39, 1)'}}>
                Events
              </Text>
            </View>
            <AddButton
              btnTxt={'Add Event'}
              onPress={() => navigation.navigate(AUTH.ADDEEVENT)}
            />
          </View>
          <View style={{marginBottom: 16}}>
            <Text regular style={{lineHeight: 18}} body2 netural>
              Add events for your companies and their employees
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <AnnouncementSearchBar
              onSubmit={() => onSubmit(search)}
              value={search}
              onChangeText={handleSearchChange}
              placeholderTextColor={colors.appLight}
              placeholder={'Search Events'}
            />
          </View>
          <View>
            <CustomTextInput
              icon={<Calendar />}
              placeholder={'Date'}
              editable={false}
              onPress={handleButtonClick}
              value={selectedDate}
              placeholderTextColor={colors.secondaryColor}
            />
          </View>
          <FlatList
            data={renderData}
            onEndReached={endlist}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => item?._id || index.toString()}
            renderItem={({item, index}) => {
              const attendeesCount = item?.attendees?.length;
              const start = new Date(item?.startDate);
              const localDate = start.toLocaleDateString();
              const StartHours = parseInt(item?.startTime.slice(0, 2));
              const endHours = parseInt(item?.endTime.slice(0, 2));
              const formattedStartTime = formatTime(StartHours);
              const formattedEndTime = formatTime(endHours);
              const timeDifference = calculateTimeDifference(
                StartHours,
                endHours,
              );
              return (
                <EventCard
                  image={{uri: item?.eventPicture}}
                  Title={item?.title}
                  Seatsleft={attendeesCount}
                  TotalSeats={item?.seatsLimit}
                  description={item?.description}
                  StartDate={localDate}
                  From={formattedStartTime}
                  To={formattedEndTime}
                  Area={item?.location}
                  Duration={`${timeDifference} hours`}
                  imageData={item?.attendees}
                  onPress={() => deleteEvent(item._id)}
                  Update={() => UpdateEvent(item)}
                  ViewAll={() => PeopleEvent(item)}
                  handleLinkOnMapPress={() => handleLinkOnMapPress(item)}
                />
              );
            }}
          />
        </View>
      </SafeAreaView>
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
export default Events;
