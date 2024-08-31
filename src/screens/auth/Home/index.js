//import liraries
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BaseStyle} from '../../../config/styles';
import {
  AddedCompany,
  DrawerIcon,
  Forward,
  Message,
  Notification,
  User,
} from '../../../assets';
import {useTheme} from '../../../config/theme';
import {
  AddCompany,
  Barchart,
  Button,
  Card,
  SearchBar,
  SwipeableCard,
  Text,
} from '../../../components';
import {AUTH} from '../../../navigation/ROUTES';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API, useFetchGet} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';

const Home = ({navigation}) => {
  const colors = useTheme();
  const route = useRoute();
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [data, setData] = useState('');
  const [top5, setTop5] = useState([]);
  const isFocused = useIsFocused();
  // const data = [
  //   { id: 1, color: '#ff6347' },
  //   { id: 2, color: '#6a5acd' },
  //   { id: 3, color: '#32cd32' },
  // ];

  useEffect(() => {
    console.log(userAccessToken, 'asdasdsdasdsa');
  }, [userAccessToken]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@accessToken'); // Replace 'key' with your actual key
      console.log('====================================Comin form home');
      console.log(value);
      console.log('====================================');
      if (value !== null) {
        console.log(value); // Display the value in the log
      } else {
        console.log('Value is null');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onSubmit = text => {
    console.log(text);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (route.name === 'Home') {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [route]),
  );

  const getHome = useFetchGet(
    API.GET_HOME,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getHome.loading) {
      console.log(getHome.response);
      if (getHome.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setData(getHome.response?.data);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setGoForGetApiCall(false);
  }, [getHome.loading]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setGoForGetApiCall(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetchData();
  }, [userAccessToken]);

  useEffect(() => {
    fetchData();
  }, [navigation, isFocused]);

  const fetchData = () => {
    axios
      .get(
        'https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/announcement?latest=true',
        {
          headers: {
            Authorization: userAccessToken,
            'x-pagination-skip': 1,
            'x-pagination-limit': 5,
          },
        },
      )
      .then(res => {
        console.log('api', res);
        setTop5(res.data.docs);
      })
      .catch(error => {
        console.log('====================================');

        console.log(error);

        console.log('====================================');
      });
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
      <View
        style={{
          backgroundColor: colors.whiteBackground,
          paddingHorizontal: 25,
          marginTop: 16,
        }}>
        <SearchBar onSubmit={onSubmit} placeholderTextColor={colors.appLight} />
      </View>
      <ScrollView>
        <View style={{height: 200}}>
          <SwipeableCard navigation={navigation} indata={top5} />
        </View>
        <View style={{marginTop: 16, marginBottom: 25, marginHorizontal: 19}}>
          <Text bold blackColor title4 style={{lineHeight: 27}}>
            {`Visitors per day`}
          </Text>
        </View>
        <View style={{marginHorizontal: 19, height: 200, marginBottom: 52}}>
          <Barchart />
        </View>
        <AddCompany
          onPress={() =>
            navigation.navigate('Directory', {
              exitPoint: 'HomeViewAll',
            })
          }
          numbers={data.totalCompanies}
          title={`Total Companies`}
          Svg={<AddedCompany />}
        />
        <AddCompany
          styles={{marginTop: 16, marginBottom: 16}}
          numbers={data.totalVisitors}
          title={`Total Visitors`}
          onPress={() => navigation.navigate(AUTH.VISITORS)}
          SvgBack={{backgroundColor: 'rgba(229, 245, 237, 1)'}}
          Svg={<User />}
        />
        <AddCompany
          styles={{marginBottom: 15}}
          numbers={data.totalUsers}
          title={`Total Users`}
          Svg={<AddedCompany />}
        />
        <AddCompany
          styles={{marginBottom: 15}}
          numbers={data.totalResources}
          title={`Total Resources`}
          Svg={<AddedCompany />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default Home;
