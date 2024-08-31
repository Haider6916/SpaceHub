//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  Left,
  Sofa,
  Location,
  Document,
  DirectoryArrrowDown,
  Time,
  Calendar,
  Add,
} from '../../../assets';
import {
  Button,
  CalenderModal,
  CustomTextInput,
  EndModal,
  EndTime,
  Maps,
  StartTime,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@mohalla-tech/react-native-date-time-picker';
import moment from 'moment';
import 'moment-timezone';
import {launchImageLibrary} from 'react-native-image-picker';
import {API, useFetchPost} from '../../../services';
import { GeneralResponses } from '../../../services/responses';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';

// create a component
const UpdateEvent = ({navigation,route}) => {
  const colors = useTheme();
  const [file, setFile] = useState('');
  const [calendar, setCalender] = useState(false);
  const [calendarEnd, setEndCalender] = useState(false);
  const [start, setStart] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [logo, setlogo] = useState('');
  const [goForCreateEvent, setGoForCreateEvent] = useState(false);
  const [description,setDescription] = useState('');
  const [clock, setClock] = useState(false);
  const [endClock, setEndClock] = useState(false);
  const [map, setMap] = useState(false);
  const [title, setTitle] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [totalseat,setTotalseat] = useState('');
  const [backEndStart,setbackEndStart] = useState('');
  const [backEndEnd,setbackEndEnd] = useState('');
  const [where,setwhere] = useState('');
  const [location,setlocation] = useState('');
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');
  const data = route?.params?.data

  console.log('====================================daaaattaaaa');
  console.log(data);
  console.log('====================================');
  const formdata = new FormData();
  formdata.append('title', title);
  formdata.append('description', description);
  formdata.append('seatsLimit', totalseat);
  formdata.append('startDate', selectedDate);
  formdata.append('endDate', selectedEndDate);
//   formdata.append('startTime', backEndStart);
//   formdata.append('endTime', backEndEnd);
  formdata.append('startTime', startTime);
  formdata.append('endTime', endTime);
  formdata.append('location', where);
  formdata.append('locationLink', location);
  if (logo && logo.assets && logo.assets.length > 0) {
    formdata.append('picture', {
      uri: logo.assets[0].uri,
      type: logo.assets[0].type,
      name: logo.assets[0].fileName,
    });
  } else {
    // Handle the case when logo or assets are undefined or empty
    console.log('Logo or assets are missing');
  }


  // const createEvent = useFetchPost(
  //   API.CREATE_EVENT,
  //   {
  //     title: title,
  //     description:description,
  //     seatsLimit:totalseat,
  //     startDate:selectedDate,
  //     endDate:selectedEndDate,
  //     startTime:backEndStart,
  //     endTime:backEndEnd,
  //     location:where,
  //     locationLink:location,
  //     picture:selectedImage,
  //   },
  //   goForCreateEvent,
  //   userAccessToken
  // );

  
  // useEffect(() => {
  //   if (!createEvent.loading) {
  //     console.log('====================================');
  //     console.log(createEvent.response);
  //     console.log('====================================');
  //     console.log('====================================hreeee');
  // console.log(title,description,totalseat,selectedDate,selectedEndDate,backEndStart,backEndEnd,where,location,selectedImage);
  // console.log('====================================');
  //     if (createEvent.response?.status === GeneralResponses.STATUS_OK.CODE) {
  //       onSuccessApi(createEvent.response);
  //       console.log('====================================');
  //       console.log(createEvent.response);
  //       console.log('====================================');
  //     }
  //   } else {
  //     console.log('====================================');
  // console.log(title,description,totalseat,selectedDate,selectedEndDate,backEndStart,backEndEnd,where,location,selectedImage);
  // console.log('====================================');
  //     console.log('error occured in verify api call');
  //   }
  //   setGoForCreateEvent(false);
  // }, [createEvent.loading]);

  // /**
  //  * function called on success of api
  //  * @param {*} data
  //  */
  // const onSuccessApi = data => {
  //   console.log(data, 'here');
  //   resendPressed();
  // };

  /**
   * function called onpress of continue
   */
  const resendPressed = () => {
    // setGoForCreateEvent(true);
    putData();
  };

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    setlogo(images);
    console.log(images);
    setSelectedImage(images.assets[0].uri);
  };

  const options = {
    mediaType: 'photo',
    quality: 0.7,
    // maxWidth: 200,
    // maxHeight: 200,
  };

  const handleButtonClick = () => {
    setCalender(true);
  };
  

  const handleSaveDate = date => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedDate(formattedDate);
  };

 
  const handleEndDate = date => {
    const formattedDate = date.format('YYYY-MM-DD');
    setSelectedEndDate(formattedDate);
  };

  const handleButtonEndClick = () => {
    setEndCalender(true);
  };

  // const compareDates = () => {
  //   const startDate = selectedDate;
  //   const endDate = selectedEndDate;
  //   if (startDate > endDate) {
  //     // Start date is greater than end date
  //     console.log('Start date is greater than end date');
  //   } else if (startDate < endDate) {
  //     // End date is greater than start date
  //     console.log('End date is greater than start date');
  //   } else {
  //     // Dates are equal
  //     console.log('Start date and end date are equal');
  //   }
  // };

  const handleButtonStartClock = () => {
    setClock(true);
  };

  const handleButtonEndClock = () => {
    setEndClock(true);
  };

  const handleMap = () => {
    setMap(true);
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

  // const compareTimes = () => {
  //   const isEndTimeValid = moment(startTime, 'hh:mm A').isSameOrBefore(
  //     moment(endTime, 'hh:mm A'),
  //   );

  //   if (isEndTimeValid) {
  //     // End time is valid (not larger than start time)
  //     console.log('End time is valid');
  //   } else {
  //     // End time is larger than start time
  //     console.log('End time is larger than start time');
  //   }
  // };

  useEffect(() => {
    setTitle(data.title)
    const timeParts = (data.startTime).substring(0, 8).split(":");
    const endtimeParts = data.endTime.substring(0, 8).split(":");
const endhours = parseInt(endtimeParts[0]);
const endminutes = parseInt(endtimeParts[1]);

let formattedendTime = "";

if (endhours === 0) {
  formattedendTime = `12:${endminutes.toString().padStart(2, '0')} AM`;
} else if (endhours < 12) {
  formattedendTime = `${endhours}:${endminutes.toString().padStart(2, '0')} AM`;
} else if (endhours === 12) {
  formattedendTime = `${endhours}:${endminutes.toString().padStart(2, '0')} PM`;
} else {
  const pmHours = endhours - 12;
  formattedendTime = `${pmHours}:${endminutes.toString().padStart(2, '0')} PM`;
}

const hours = parseInt(timeParts[0]);
const minutes = parseInt(timeParts[1]);

let formattedTime = "";
if (hours === 0) {
  formattedTime = `12:${minutes} AM`;
} else if (hours < 12) {
  formattedTime = `${hours}:${minutes} AM`;
} else if (hours === 12) {
  formattedTime = `${hours}:${minutes} PM`;
} else {
  const pmHours = hours - 12;
  formattedTime = `${pmHours}:${minutes} PM`;
}

// console.log(formattedTime);
    setStartTime(formattedTime)
    
    setEndTime(formattedendTime)
    setTotalseat(data.seatsLimit.toString())
    setwhere(data.location)
    setlocation(data.locationLink)
    const formattedDate = (data.startDate).substring(0, 10);
    setSelectedDate(formattedDate)
    const formattedEndDate = (data.endDate).substring(0, 10);
    setSelectedEndDate(formattedEndDate)
    setDescription(data.description)
    setSelectedImage(data.eventPicture)
  }, []);



  const putData = () => {
    console.log('Payload:', formdata);
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/event/${data._id}`,
        formdata,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: userAccessToken,
          },
        },
      )
      .then(res => {
        console.log('api', res.data);
       navigation.goBack();
      })
      .catch(error => {
        console.log('api error', error.response.data.error);
        SimpleToast.show(String(error.response.data.error.message));
      });
  };

  return (
    <>
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
      <CalenderModal
        visible={calendar}
        navigation={navigation}
        onSwipeComplete={() => setCalender(false)}
        backPressed={() => setCalender(false)}
        onSaveDate={handleSaveDate}
        onBackdropPress
      />
      <EndModal
        visible={calendarEnd}
        navigation={navigation}
        onSwipeComplete={() => setEndCalender(false)}
        backPressed={() => setEndCalender(false)}
        onSaveDate={handleEndDate}
        onBackdropPress
      />
      <View style={styles.container}>
        <ScrollView>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <TouchableOpacity
              style={{flex: 0.2}}
              onPress={() => navigation.goBack()}>
              <Left />
            </TouchableOpacity>
            <Text regular heading2 style={{lineHeight: 31}}>
              {`Update Event`}
            </Text>
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              mainStyle={{
                height: 56,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'Title of the event'}
              placeholderTextColor={colors.secondaryColor}
              value={title}
              onChangeText={setTitle}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <CustomTextInput
              mainStyle={{
                height: 56,
                flex: 0.45,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'Start Date'}
              placeholderTextColor={colors.secondaryColor}
              icon={<Calendar />}
              editable={false}
              onPress={handleButtonClick}
              value={selectedDate}
            />
            <CustomTextInput
              mainStyle={{
                height: 56,
                flex: 0.45,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'End Date'}
              placeholderTextColor={colors.secondaryColor}
              icon={<Calendar />}
              editable={false}
              onPress={handleButtonEndClick}
              value={selectedEndDate}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
            }}>
            <CustomTextInput
              mainStyle={{
                height: 56,
                flex: 0.45,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'From'}
              placeholderTextColor={colors.secondaryColor}
              icon={<Time />}
              editable={false}
              onPress={handleButtonStartClock}
              value={startTime}
            />
            <CustomTextInput
              mainStyle={{
                height: 56,
                flex: 0.45,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'To'}
              placeholderTextColor={colors.secondaryColor}
              icon={<Time />}
              editable={false}
              onPress={handleButtonEndClock}
              value={endTime}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              placeholder="Description"
              mainStyle={{
                height: 128,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
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
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              mainStyle={{
                height: 56,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'Where inside the building'}
              placeholderTextColor={colors.secondaryColor}
              onChangeText={setwhere}
              value={where}
            />
          </View>
          <View style={{marginBottom: 15}}>
            <CustomTextInput
              mainStyle={{
                height: 56,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'Link for the location on the map'}
              placeholderTextColor={colors.secondaryColor}
              icon={<Location />}
              onChangeText={setlocation}
              value={location}
              // editable={false}
              // onPress={handleMap}
              // value={selectedEndDate}
            />
          </View>
          <View>
            <CustomTextInput
              mainStyle={{
                height: 56,
                borderWidth: 1,
                borderColor: colors.textGreyDark,
                backgroundColor: 'rgba(250, 250, 250, 1)',
              }}
              placeholder={'Seat Limit'}
              placeholderTextColor={colors.secondaryColor}
              icon={<Sofa />}
              value={totalseat}
              onChangeText={setTotalseat}
            />
          </View>
          <View style={{marginBottom: 16}}>
            <Text regular body2 style={{lineHeight: 18}}>
              Add images
            </Text>
            {selectedImage ? (
              <TouchableOpacity
                onPress={openGallery}
                style={{height: 140, width: '100%'}}>
                <Image
                  source={{uri: selectedImage}}
                  style={{height: 140, width: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  height: 140,
                  borderWidth: 1,
                  marginHorizontal: 25,
                  backgroundColor: colors.appPrimaryLight,
                  borderStyle: 'dashed',
                  borderColor: colors.appPrimary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={openGallery}>
                <Document />
                <Text
                  style={{marginTop: 10, lineHeight: 28}}
                  regular
                  body2
                  appPrimary>
                  Add Image
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 15,
          }}>
          <Button
            buttonStyle={{flex: 0.42}}
            title={`Back`}
            onPress={() => navigation.goBack()}
          />
          <Button
            buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
            title={`Update`}
            textStyles={{color: colors.whiteBackground}}
            onPress={resendPressed}
          />
        </View>
        {/* <Button title="Compare Dates" onPress={compareDates} />
        <Button title="Compare Times" onPress={compareTimes} /> */}
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default UpdateEvent;
