//import liraries
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../../config/theme';
import {DummyImg, Left} from '../../../assets';
import {
  AddButton,
  AnnouncementSearchBar,
  DeleteModal,
  DeleteVisitors,
  EmployeeCard,
  Text,
  VisitorsCard,
} from '../../../components';
import { AUTH } from '../../../navigation/ROUTES';
import { API, useFetchGet } from '../../../services';
import { useSelector } from 'react-redux';
import { GeneralResponses } from '../../../services/responses';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
// create a component
const Visitors = ({navigation}) => {
  const [deleteModal, setDeleteModal] = useState(false);

  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [visitorsData,setvisitorsData] = useState([]);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [loading, setLoading] = useState(true);
  const [goForSearchApiCall, setGoForSearchApiCall] = useState(true);
  const [search, setSearch] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [skip,setskip] = useState(1)
  const [limit,setLimit] = useState(10)
  const [loadMore,setloadMore] = useState(true)
  
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

        axios.get('https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/user/visitor' , {
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
    
       setvisitorsData([...visitorsData,...res.data.docs])
    
       setskip(skip+1)
    setloadMore(false)
    
    }).catch((error)=>{
    
       console.log('====================================');
    
       console.log(error);
    
       console.log('====================================');
    
    })
    
       }


  // const getVisitors = useFetchGet(
  //   API.GET_VISITORS,
  //   goForGetApiCall,
  //   {},
  //   userAccessToken,
  // );

  /** response of api call for Announcment screen data */
  // useEffect(() => {
  //   if (!getVisitors.loading) {
  //     console.log(getVisitors.response);
  //     if (getVisitors.response?.status === GeneralResponses.STATUS_OK.CODE) {
  //       setvisitorsData(getVisitors.response?.data.docs);
  //       setLoading(false);
  //     }
  //   } else {
  //     console.log('error in get Announceement ');
  //   }
  //   setGoForGetApiCall(false);
  // }, [getVisitors.loading])

  const getSearchVisitors = useFetchGet(
    API.VISITOR_SEARCH + `?searchQuery=${search}`,
    goForSearchApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getSearchVisitors.loading) {
      if (getSearchVisitors.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(getSearchVisitors);
        setLoading(false);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForSearchApiCall(false);
  }, [getSearchVisitors.loading, search]);

   /**
   * method called on success of Api
   * @param {*} Search response
   */
   const onApiSuccess = getSearchVisitors => {
    setSearchData(getSearchVisitors?.response?.data?.docs);
    console.log('====================================');
    console.log(getSearchVisitors);
    console.log('====================================');
  };
  const handleSearchChange = text => {
  setSearch(text);
  setGoForSearchApiCall(true);
};

   // render each employee card
   const renderEmployeeCard = ({ item }) => (
    <VisitorsCard
      image={{uri:item?.host?.profilePicture}}
      Title={item.name}
      description={`Host: ${item?.host?.firstName?.en} ${item?.host?.lastName?.en}`}
      BottomTitle={item?.visitReason}
      BottomSubText={`${item?.visitDuration} days`}
      onPress={handlePress}
    />
  );

  const handlePress = () => {
    setDeleteModal(true);
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setGoForGetApiCall(true);
    });

    return unsubscribe;
  }, [navigation]);

 

const onEndReached = () =>{
  console.log('====================================');
  console.log('end');
  console.log('====================================');
//  if(loadMore){

       fetchData()
    
    //     }
  }


  const renderData = search === '' ? visitorsData : searchData;

  return (
    <>
    {loading ? (
      <View style={{flex:1,justifyContent:'center'}}>
            <ActivityIndicator color={colors.appPrimary} size="large" />
            </View>
          ) : (
            <>  
             <DeleteVisitors
        visible={deleteModal}
        navigation={navigation}
        onSwipeComplete={() => setDeleteModal(false)}
        Cancel={() => setDeleteModal(false)}
        title={`Are you sure you want to delete Visitors TITLE?`}
        onBackdropPress
      />
      <SafeAreaView
        style={{
          backgroundColor: colors.whiteBackground,
          flex:1
        }}>
          <View style={{paddingHorizontal:24,flex:1}}>
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
              Visitors
            </Text>
          </View>
          <AddButton btnTxt={'Add visitor'} 
          onPress={()=>navigation.navigate(AUTH.ADDVISITORS)}/>
        </View>
        <View style={{marginBottom: 16}}>
          <Text regular style={{lineHeight: 18}} body2 netural>
            Add visitors your co-working space
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
          {/* <AnnouncementSearchBar
            placeholder={'Search Visitors'}
            placeholderTextColor={colors.appLight}
          /> */}
           <AnnouncementSearchBar
          onSubmit={() => onSubmit(search)}
          value={search}
          onChangeText={handleSearchChange}
          placeholderTextColor={colors.appLight}
          placeholder={'Search Visitors'}
        />
        </View>
        <FlatList
        data={renderData}
        renderItem={renderEmployeeCard}
        keyExtractor={(item) => item._id}
        onEndReached={onEndReached}
      />
      </View>
      </SafeAreaView>
            </>
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
export default Visitors;
