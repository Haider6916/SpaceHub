//import liraries
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Left} from '../../../assets';
import {BaseStyle} from '../../../config/styles';
import {
  Announcement,
  AnnouncementSearchBar,
  SearchBar,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {API, useFetchGet} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import axios from 'axios';

const Announcements = ({navigation}) => {
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [goForSearchApiCall, setGoForSearchApiCall] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tempData, setTempData] = useState([]);
  const [skip,setskip] = useState(1)
  const [limit,setLimit] = useState(10)
  const [loadMore,setloadMore] = useState(true)

  console.log(userAccessToken, 'userraceesstoken');
  const colors = useTheme();

  const onSubmit = text => {
    if (text === '') {
      setGoForGetApiCall(true);
    } else {
      setSearch(text);
      setGoForSearchApiCall(true);
    }
  };

  useEffect(()=>{
      fetchData()
    },[])

    const fetchData = () =>{

          axios.get('https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/announcement' , {
      headers: {
        Authorization: userAccessToken,
        'x-pagination-skip':skip,
        'x-pagination-limit':limit,
      },
    })
      
      .then(res => res)
      
      .then(res=>{
        // console.log('api', res.data);
         console.log('api',res);
      
      //    if(res.data.docs.length == 0){
      
      //      setloadMore(false)
      
      //    }
      
         setData([...data,...res.data.docs])
      
         setskip(skip+1)
      setloadMore(false)
      
      }).catch((error)=>{
      
         console.log('====================================');
      
         console.log(error);
      
         console.log('====================================');
      
      })
      
         }
  // const getAnn = useFetchGet(
  //   API.GET_ANNOUNCEMENT ,
  //   goForGetApiCall,
  //   {},
  //   userAccessToken,
  // );

  // /** response of api call for Announcment screen data */
  // useEffect(() => {
    
  //   if (!getAnn.loading) {
  //     if (getAnn.response?.status === GeneralResponses.STATUS_OK.CODE) {
  //       setData(getAnn.response?.data?.docs)
  //       setLoading(false);
  //     }
  //   } else {
  //     console.log('error in get Announceement ');
  //   }
  //   setGoForGetApiCall(false);
  // }, [getAnn.loading]);

  const getSearchAnn = useFetchGet(
    API.SEARCH_ANNOUNCEMENT + `?searchString=${search}&x-pagination-skip=${skip}&x-pagination-limit=${limit}`,
    goForSearchApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getSearchAnn.loading) {
      if (getSearchAnn.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(getSearchAnn);
       
        // setLoading(false);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForSearchApiCall(false);
  }, [getSearchAnn.loading, search]);

   /**
   * method called on success of Api
   * @param {*} Search response
   */
   const onApiSuccess = getSearchAnn => {
    setSearchData(getSearchAnn?.response?.data?.docs);
  };

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setGoForGetApiCall(true);
  //   });

  //   return unsubscribe;
  // }, [navigation]);

 

  const onEndReached = () =>{
    console.log('====================================');
    console.log('end');
    console.log('====================================');
  //  if(loadMore){

         fetchData()
      
      //     }
    }

    const keyExtractor = useCallback((item => `${item._id}`))

  const renderData = search === '' ? data : searchData;
  
  return (
    <>
      {loading ? (
        // Show the activity indicator while loading
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.appPrimary} />
        </View>
      ) : (
        <SafeAreaView style={[BaseStyle.safeAreaView, BaseStyle.container]}>
          <TouchableOpacity
            style={{marginTop: 20, marginBottom: 23}}
            onPress={() => navigation.goBack()}>
            <Left />
          </TouchableOpacity>
          <View style={{marginBottom: 8}}>
            <Text bold blackColor heading2>
              {`Announcements`}
            </Text>
          </View>
          <View style={{marginBottom: 24}}>
            <Text regular netural body2>
              {`Stay tuned with new news from us`}
            </Text>
          </View>
          <View style={{marginBottom: 16}}>
            <AnnouncementSearchBar
              onSubmit={() => onSubmit(search)}
              value={search}
              onChangeText={text => setSearch(text)}
              placeholderTextColor={colors.appLight}
              placeholder={'Search Announcements'}
            />
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={renderData}
            onEndReached={onEndReached}
            keyExtractor={keyExtractor}
            renderItem={({item, index}) => {
              return (
                <Pressable key={index.toString()} style={{marginBottom: 20}}>
                  <Announcement
                    Title={item?.title}
                    Description={item?.description}
                    tag={item?.tags}
                    date={new Date(item?.createdAt).toLocaleDateString()}
                  />
                </Pressable>
              );
            }}
                />
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default Announcements;
