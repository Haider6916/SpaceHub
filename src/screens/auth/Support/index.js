// //import liraries
// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
// } from 'react-native';
// import {
//   AddButton,
//   AnnouncementSearchBar,
//   SupportTicket,
// } from '../../../components';
// import {useTheme} from '../../../config/theme';
// import {DirectoryArrrowDown, Left} from '../../../assets';
// import {Text} from '../../../components';
// import ModalDropdown from 'react-native-modal-dropdown';
// import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
// import {AUTH} from '../../../navigation/ROUTES';
// import {API, useFetchGet, useFetchPost} from '../../../services';
// import {useSelector} from 'react-redux';
// import {GeneralResponses} from '../../../services/responses';
// import {useIsFocused} from '@react-navigation/native';
// import axios from 'axios';

// // create a component
// const Support = ({navigation}) => {
//   const [index, setIndex] = useState(0);
//   const [search, setSearch] = useState('');
//   const [goForTicketCall, setgoForTicketCall] = useState(true);
//   const userAccessToken = useSelector(state => state.user.userAccessToken);
//   const [assigned, setAssigned] = useState([]);
//   const [goForMyTicket, setgoForMyTicket] = useState(true);
//   const [mytickets, setMyTickets] = useState([]);
//   const colors = useTheme();
//   const IsFocused = useIsFocused();

//   /** Navigation with is focused */
//   useEffect(() => {
//     // setgoForMyTicket(true);
//     fetchData()
//     setgoForTicketCall(true);
//   }, [navigation]);

//   /** My Tickets */
//   const [myskip,setmyskip] = useState(1)
//   const [mylimit,setmylimt] = useState(10)
//   const[myload,setmyload] = useState(true)
//   useEffect(()=>{
//     fetchData()
//   },[])

//   const fetchData = () =>{

//         axios.get('https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/ticket/my-tickets' , {
//     headers: {
//       Authorization: userAccessToken,
//       'x-pagination-skip':myskip,
//       'x-pagination-limit':mylimit,
//     },
//   })

//     .then(res => res)

//     .then(res=>{
//       // console.log('api', res.data);
//        console.log('api',res);

//     //    if(res.data.docs.length == 0){

//     //      setloadMore(false)

//     //    }

//        setMyTickets([...mytickets,...res.data.docs])

//        setmyskip(skmyskipip+1)
//     setmyload(false)

//     }).catch((error)=>{

//        console.log('====================================');

//        console.log(error);

//        console.log('====================================');

//     })

//        }
//   // const myTickets = useFetchGet(
//   //   API.MY_TICKETS,
//   //   goForMyTicket,
//   //   {},
//   //   userAccessToken,
//   // );

//   // /** response of api call for Announcment screen data */
//   // useEffect(() => {
//   //   if (!myTickets.loading) {
//   //     // console.log(myTickets.response?.data.docs,'dsd');
//   //     if (myTickets.response?.status === GeneralResponses.STATUS_OK.CODE) {
//   //       console.log('====================================');
//   //       console.log(myTickets.response?.data.docs[0].assignedTo);
//   //       console.log('====================================');
//   //       setMyTickets(myTickets.response?.data.docs);
//   //       // setLoading(false);
//   //       // (daysLeftText)
//   //     }
//   //   } else {
//   //     console.log('error in get Announceement ');
//   //   }
//   //   setgoForMyTicket(false);
//   // }, [myTickets.loading]);

//   /** Recieved Search  */
//   const [goForSearchApiCall,setgoForSearchApiCall] = useState(false)
//   const [searchData,setSearchData] = useState([])
//   const recievedSearch = useFetchGet(
//     API.VISITOR_SEARCH + `?search=${search}`,
//     goForSearchApiCall,
//     {},
//     userAccessToken,
//   );

//   /** response of api call for getting Search Announcment */
//   useEffect(() => {
//     if (!recievedSearch.loading) {
//       if (recievedSearch.response?.status === GeneralResponses.STATUS_OK.CODE) {
//         onApiSuccess(recievedSearch);
//         // setLoading(false);
//       }
//     } else {
//       console.log('error occured in api call');
//     }
//     setgoForSearchApiCall(false);
//   }, [recievedSearch.loading, search]);

//   /**
//    * method called on success of Api
//    * @param {*} Search response
//    */
//   const onApiSuccess = recievedSearch => {
//     setSearchData(recievedSearch?.response?.data?.docs);
//     console.log('====================================');
//     console.log(recievedSearch);
//     console.log('====================================');
//   };
//   const handleSearchChange = text => {
//   setSearch(text);
//   // setgoForSearchApiCall(true);
// };

//   /** Recieved Tickets Call*/
//   const [limit, setLimit] = useState(10);
//   const [skip, setskip] = useState(1);
//   const [loadMore, setloadMore] = useState(true);
//   const getAssignedTicets = useFetchGet(
//     API.ASSIGNED_TICKETS,
//     goForTicketCall,
//     {},
//     userAccessToken,
//     limit,
//     skip,
//   );

//   /** response of api call for Announcment screen data */
//   useEffect(() => {
//     if (!getAssignedTicets.loading) {
//       if (
//         getAssignedTicets.response?.status === GeneralResponses.STATUS_OK.CODE
//       ) {
//         setAssigned([...assigned, ...getAssignedTicets.response?.data.docs]);
//         setskip(skip + 1);
//         setloadMore(false);
//       }
//     } else {
//       console.log('error in get Announceement ');
//     }
//     setgoForTicketCall(false);
//   }, [getAssignedTicets.loading]);

//   const onSubmit = text => {
//     if (text === '') {
//       setgoForTicketCall(true);
//     } else {
//       setSearch(text);
//       setgoForSearchApiCall(true);
//     }
//   };

//   // const handleSearchChange = text => {
//   //   setSearch(text);
//   // };

//   const STATUS = ['Done', 'Pending'];
//   const SORTBY_EMPLOYEE = [`ticketNum`, `title`, `createdAt`, `updatedAt`];

//   /**Tab View */

//   const recievedTickets = item => {
//     // console.log(item);
//     navigation.navigate(AUTH.OPENTICKET, {
//       data: item._id,
//     });
//   };

//   const pressedMyTickets = (item) => {
//     navigation.navigate(AUTH.OPENTICKET, {
//       data:  item._id,
//     });
//   };

//   /** Get all ccompanies */
//   const [goForGetCompanyApiCall, setgoForGetCompanyApiCall] = useState(true);
//   const [companyFilter, setCompanyFilter] = useState(false);
//   const [companyID, setCompanyID] = useState('');
//   const [coloadMore, setcoloadMore] = useState(true);
//   const [companyData, setCompnayData] = useState([]);
//   const [recievedStatus, setRecievedStatus] = useState('');
//   const [recievedSort, setRecievedSort] = useState('');
//   const getComapny = useFetchGet(
//     API.GET_ALLCOMPANY,
//     goForGetCompanyApiCall,
//     {},
//     userAccessToken,
//   );

//   /** response of api call for Announcment screen data */
//   useEffect(() => {
//     if (!getComapny.loading) {
//       if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
//         console.log('====================================');
//         console.log(getComapny.response.data.docs);
//         console.log('====================================');
//         setCompnayData([...companyData, ...getComapny.response?.data?.docs]);

//         // setcoskip(coskip + 1);
//         // setcoloadMore(false);
//       }
//     } else {
//       console.log('error in All users ');
//     }
//     setgoForGetCompanyApiCall(false);
//   }, [getComapny.loading]);

//   /** Post filter */
//   const companyfilter = useFetchPost(
//     API.RECIEVED_FILTER,
//     {
//       company: companyID,
//       status: recievedStatus,
//       sortBy: recievedSort,
//     },
//     companyFilter,
//     userAccessToken,
//   );

//   /** response of api call for verify api */
//   useEffect(() => {
//     if (!companyfilter.loading) {
//       if (companyfilter.response?.status === GeneralResponses.STATUS_OK.CODE) {
//         console.log(companyfilter.response?.data?.docs);
//         setAssigned(companyfilter.response?.data?.docs);
//       }
//     } else {
//       console.log('error occured in verify api call');
//     }
//     setCompanyFilter(false);
//   }, [companyfilter.loading]);

//   const firstTab = () => {
//     setgoForTicketCall(true);
//   };

//   const myticketsfn = () =>{
//     fetchData()
//   }

//   const renderData = search === '' ? assigned : searchData;
//   const FirstTabComponent = () => {
//     return (
//       <>
//         <View style={{marginBottom: 10, marginTop: 10}}>
//           <AnnouncementSearchBar
//             onSubmit={() => onSubmit(search)}
//             value={search}
//             onChangeText={handleSearchChange}
//             placeholderTextColor={colors.appLight}
//             placeholder={'Search Tickets'}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginBottom: 12,
//             justifyContent: 'space-between',
//           }}>
//           <ModalDropdown
//             style={{
//               backgroundColor: 'rgba(245, 246, 244, 1)',
//               zIndex: 10,
//               width: 108,
//               height: 32,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 51,
//             }}
//             options={companyData.map(company => company.name)}
//             textStyle={{
//               fontSize: 14,
//               color: 'rgba(68, 67, 68, 1)',
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownTextStyle={{
//               fontSize: 14,
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownStyle={{width: 100}}
//             adjustFrame={style => {
//               style.left -= 8;
//               style.top += 5;
//               return style;
//             }}
//             defaultValue={
//               <React.Fragment>
//                 Company <DirectoryArrrowDown />
//               </React.Fragment>
//             }
//             //   onSelect={(index, option) => {
//             //     setUserDrop(option);
//             //     setuserFilter(true);
//             //   }}
//             // renderButtonText={(option) => (
//             //   <React.Fragment>
//             //     <Icon name="your-icon-name" /> {option}
//             //   </React.Fragment>
//             // )}
//             onSelect={(index, option) => {
//               const selectedCompany = companyData[index];
//               if (selectedCompany) {
//                 console.log('Selected Company ID:', selectedCompany?._id);
//                 setCompanyID(selectedCompany?._id);
//                 setCompanyFilter(true);
//               }
//             }}
//           />

//           <ModalDropdown
//             style={{
//               backgroundColor: 'rgba(245, 246, 244, 1)',
//               zIndex: 10,
//               width: 90,
//               height: 32,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 51,
//             }}
//             options={STATUS}
//             textStyle={{
//               fontSize: 14,
//               color: 'rgba(68, 67, 68, 1)',
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownStyle={{width: 100, maxHeight: 80}}
//             dropdownTextStyle={{
//               fontSize: 14,
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             adjustFrame={style => {
//               style.left -= 20;
//               style.top += 5;
//               return style;
//             }}
//             defaultValue={
//               <React.Fragment>
//                 Status <DirectoryArrrowDown />
//               </React.Fragment>
//             }
//             onSelect={(index, option) => {
//               if (option === 'Pending') {
//                 setRecievedStatus('Pending');
//                 setCompanyFilter(true);
//               } else if (option === 'Done') {
//                 setRecievedStatus('Done');
//                 setCompanyFilter(true);
//               }
//             }}
//           />
//           <ModalDropdown
//             style={{
//               backgroundColor: 'rgba(245, 246, 244, 1)',
//               zIndex: 10,
//               width: 90,
//               height: 32,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 51,
//             }}
//             options={SORTBY_EMPLOYEE}
//             textStyle={{
//               fontSize: 14,
//               color: 'rgba(68, 67, 68, 1)',
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownTextStyle={{
//               fontSize: 14,
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownStyle={{width: 100, maxHeight: 80}}
//             adjustFrame={style => {
//               style.top += 5;
//               style.right = 5;
//               return style;
//             }}
//             defaultValue={
//               <React.Fragment>
//                 Sort by <DirectoryArrrowDown />
//               </React.Fragment>
//             }
//             onSelect={(index, option) => {
//               setRecievedSort(option);
//               setCompanyFilter(true);
//             }}
//           />
//         </View>
//         <FlatList
//           data={renderData}
//           keyExtractor={(item, index) => item._id}
//           onEndReached={firstTab}
//           renderItem={({item}) => {
//             const formatDate = () => {
//               const date = new Date(item.createdAt);
//               const monthIndex = date.getMonth(); // Returns the month index (0-11)
//               const day = date.getDate(); // Returns the day of the month (1-31)

//               const months = [
//                 'January',
//                 'February',
//                 'March',
//                 'April',
//                 'May',
//                 'June',
//                 'July',
//                 'August',
//                 'September',
//                 'October',
//                 'November',
//                 'December',
//               ];

//               const formattedDate = `${months[monthIndex]} ${day}`;

//               return formattedDate;
//             };
//             const active = item.status;
//             return (
//               <SupportTicket
//                 image={{uri: item?.createdBy[0]?.profilePicture}}
//                 Title={
//                   item?.createdBy[0]?.firstName?.en +
//                   item?.createdBy[0]?.lastName?.en
//                 }
//                 description={item?.createdByCompany[0]?.name}
//                 BottomTitle={item?.title}
//                 BottomSubText={formatDate()}
//                 onPressView={() => recievedTickets(item)}
//                 onPessEdit={() => console.log('Pressed')}
//                 Check={active == 'Pending' ? true : false}

//               />
//             );
//           }}
//         />
//       </>
//     );
//   };

//   const SecondTabComponent = () => {
//     return (
//       <>
//         <View style={{marginBottom: 10, marginTop: 10}}>
//           {/* <AnnouncementSearchBar
//             onSubmit={() => onSubmit(search)}
//             value={search}
//             onChangeText={handleSearchChange}
//             placeholderTextColor={colors.appLight}
//             placeholder={'Search Tickets'}
//           /> */}
//         </View>
//         <View
//           style={{
//             flexDirection: 'row',
//             marginBottom: 12,
//             // justifyContent: 'space-between',
//           }}>
//           <ModalDropdown
//             style={{
//               backgroundColor: 'rgba(245, 246, 244, 1)',
//               zIndex: 10,
//               width: 90,
//               height: 32,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 51,
//               marginRight:20,
//             }}
//             options={STATUS}
//             textStyle={{
//               fontSize: 14,
//               color: 'rgba(68, 67, 68, 1)',
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownStyle={{width: 100, maxHeight: 80}}
//             dropdownTextStyle={{
//               fontSize: 14,
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             adjustFrame={style => {
//               style.left -= 20;
//               style.top += 5;
//               return style;
//             }}
//             defaultValue={
//               <React.Fragment>
//                 Status <DirectoryArrrowDown />
//               </React.Fragment>
//             }
//             onSelect={(index, option) => {
//               if (option === 'Recieved') {
//                 setRecievedStatus('Recieved');
//                 setCompanyFilter(true);
//               } else if (option === 'Pending') {
//                 setRecievedStatus('Pending');
//                 setCompanyFilter(true);
//               }
//             }}
//           />
//           <ModalDropdown
//             style={{
//               backgroundColor: 'rgba(245, 246, 244, 1)',
//               zIndex: 10,
//               width: 90,
//               height: 32,
//               justifyContent: 'center',
//               alignItems: 'center',
//               borderRadius: 51,
//             }}
//             options={SORTBY_EMPLOYEE}
//             textStyle={{
//               fontSize: 14,
//               color: 'rgba(68, 67, 68, 1)',
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownTextStyle={{
//               fontSize: 14,
//               fontFamily: 'DM Sans',
//               fontWeight: '400',
//             }}
//             dropdownStyle={{width: 100, maxHeight: 80}}
//             adjustFrame={style => {
//               style.top += 5;
//               style.right = 5;
//               return style;
//             }}
//             defaultValue={
//               <React.Fragment>
//                 Sort by <DirectoryArrrowDown />
//               </React.Fragment>
//             }
//             onSelect={(index, option) => {
//               setRecievedSort(option);
//               setCompanyFilter(true);
//             }}
//           />
//         </View>
//         <FlatList
//           data={mytickets}
//           keyExtractor={(item, index) => item._id}
//           onEndReached={myticketsfn}
//           renderItem={({item}) => {
//             const formatDate = () => {
//               const date = new Date(item.createdAt);
//               const monthIndex = date.getMonth(); // Returns the month index (0-11)
//               const day = date.getDate(); // Returns the day of the month (1-31)

//               const months = [
//                 'January',
//                 'February',
//                 'March',
//                 'April',
//                 'May',
//                 'June',
//                 'July',
//                 'August',
//                 'September',
//                 'October',
//                 'November',
//                 'December',
//               ];

//               const formattedDate = `${months[monthIndex]} ${day}`;

//               return formattedDate;
//             };
//             return (
//               <SupportTicket
//                 image={{uri: item?.assignedTo?.profilePicture}}
//                 Title={
//                   item?.assignedTo?.firstName?.en +
//                   item?.assignedTo?.lastName?.en
//                 }
//                 description={item?.createdBy?.company?.name}
//                 BottomTitle={item?.title}
//                 BottomSubText={formatDate()}
//                 onPressView={() => pressedMyTickets(item)}
//                 onPessEdit={() => console.log('Pressed')}
//               />
//             );
//           }}
//         />
//       </>
//     );
//   };

//   const renderScene = SceneMap({
//     tab1: FirstTabComponent,
//     tab2: SecondTabComponent,
//   });

//   const renderTabBar = props => (
//     <TabBar
//       {...props}
//       indicatorStyle={styles.indicator}
//       style={styles.tabbar}
//       tabStyle={styles.tab}
//       labelStyle={styles.label}
//       inactiveColor={'rgba(125, 123, 124, 1)'}
//       activeColor={'rgba(39, 38, 39, 1)'}
//     />
//   );

//   return (
//     <SafeAreaView
//       style={{
//         backgroundColor: colors.whiteBackground,
//         flex: 1,
//       }}>
//       <View style={{paddingHorizontal: 24, flex: 1}}>
//         <View
//           style={{
//             marginTop: 40,
//             flexDirection: 'row',
//             alignItems: 'center',
//             marginBottom: 15,
//           }}>
//           <TouchableOpacity
//             style={{flex: 0.15}}
//             onPress={() => navigation.goBack()}>
//             <Left />
//           </TouchableOpacity>
//         </View>
//         <View style={{flexDirection: 'row', marginBottom: 16}}>
//           <View style={{flex: 1}}>
//             <Text
//               bold
//               heading2
//               style={{lineHeight: 31, color: 'rgba(39, 38, 39, 1)'}}>
//               Support
//             </Text>
//           </View>
//           <AddButton
//             btnstyle={{height: 32}}
//             btnTxt={'Add Ticket'}
//             onPress={() => navigation.navigate(AUTH.ADDTICKET)}
//           />
//         </View>
//         <View style={{marginBottom: 16}}>
//           <Text regular style={{lineHeight: 18}} body2 netural>
//             Manage companies tickets and add your own tickets
//           </Text>
//         </View>
//         <TabView
//           navigationState={{
//             index,
//             routes: [
//               {key: 'tab1', title: 'Received Tickets'},
//               {key: 'tab2', title: 'My Tickets'},
//             ],
//           }}
//           renderScene={renderScene}
//           onIndexChange={setIndex}
//           renderTabBar={renderTabBar}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#2c3e50',
//   },
//   activeTab: {
//     backgroundColor: '#FFFFFF',
//   },
//   tabbar: {
//     backgroundColor: 'white',
//     // borderBottomWidth:1,
//     // borderBottomColor:'rgba(233, 234, 233, 1)'
//   },
//   tab: {
//     width: 170,
//   },
//   indicator: {
//     backgroundColor: 'rgba(39, 38, 39, 1)',
//     width: '47%',
//   },
//   label: {
//     fontWeight: '500',
//     color: '#272627',
//     fontSize: 18,
//     lineHeight: 23,
//     fontFamily: 'DM Sans',
//     textTransform: 'none',
//     // marginRight:10,
//     // paddingRight:10,
//     marginRight: 8,
//   },
// });

// //make this component available to the app
// export default Support;

//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  AddButton,
  AnnouncementSearchBar,
  MyTickets,
  SupportTicket,
  Text,
} from '../../../components';
import {DirectoryArrrowDown, Left} from '../../../assets';
import {AUTH} from '../../../navigation/ROUTES';
import {TabBar, TabView} from 'react-native-tab-view';
import {useTheme} from '../../../config/theme';
import ModalDropdown from 'react-native-modal-dropdown';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';

// create a component
const Support = ({navigation}) => {
  const colors = useTheme();
  const isFocused = useIsFocused();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'Recieved', title: 'Recieved Tickets'},
    {key: 'My', title: 'My Tickets'},
  ]);
  const STATUS = ['Done', 'Pending'];
  const [recievedSearch, setrecievedSearch] = useState('');
  const Sort_Recieved = [`ticketNum`, `title`, `createdAt`, `updatedAt`];

  /** Navigation with is focused */
  useEffect(() => {
    setAssigned([]);
    setMyTickets([]);
    setmylimit(10);
    setmyskip(1);
    setrenderMyData([]);
    setRenderData([]);
    setskip(1);
    setLimit(10);
    setgoformyticket(true);
    setgoForTicketCall(true);
  }, [navigation, isFocused]);

  const [goForGetCompanyApiCall, setgoForGetCompanyApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyData, setCompnayData] = useState([]);

  /** Recieved Tickets Call*/
  const [limit, setLimit] = useState(10);
  const [skip, setskip] = useState(1);
  const [loadMore, setloadMore] = useState(true);
  const [goForTicketCall, setgoForTicketCall] = useState(true);
  const [assigned, setAssigned] = useState([]);
  const [escalateId,setescalateId] = useState('');
  const getAssignedTicets = useFetchGet(
    API.ASSIGNED_TICKETS,
    goForTicketCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getAssignedTicets.loading) {
      if (
        getAssignedTicets.response?.status === GeneralResponses.STATUS_OK.CODE
      ) {
        setAssigned([...assigned, ...getAssignedTicets.response?.data.docs]);
        setskip(skip + 1);
        setloadMore(false);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setgoForTicketCall(false);
  }, [getAssignedTicets.loading]);

  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetCompanyApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('====================================');
        console.log(getComapny.response.data.docs);
        console.log('====================================');
        setCompnayData(getComapny.response?.data?.docs);

        // setcoskip(coskip + 1);
        // setcoloadMore(false);
      }
    } else {
      console.log('error in All users ');
    }
    setgoForGetCompanyApiCall(false);
  }, [getComapny.loading]);

  const [goForSearchApiCall, setgoForSearchApiCall] = useState(false);
  const [searchdata, setSearchData] = useState([]);
  const getRecievedSearch = useFetchGet(
    API.RECIEVED_SEARCH + `?search=${recievedSearch}`,
    goForSearchApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getRecievedSearch.loading) {
      if (
        getRecievedSearch.response?.status === GeneralResponses.STATUS_OK.CODE
      ) {
        onApiSuccess(getRecievedSearch);
      }
    } else {
      console.log('error occured in api call');
    }
    setgoForSearchApiCall(false);
  }, [getRecievedSearch.loading, recievedSearch]);

  /**
   * method called on success of Api
   * @param {*} Search response
   */
  const onApiSuccess = getRecievedSearch => {
    setSearchData(getRecievedSearch?.response?.data?.docs);
    console.log('====================================recievedd');
    console.log(getRecievedSearch);
    console.log('====================================');
  };

  const onSubmitRecieve = text => {
    if (text === '') {
      setgoForTicketCall(true);
    } else {
      setrecievedSearch(text);
      setgoForSearchApiCall(true);
    }
  };

  const handleSearchChange = text => {
    setrecievedSearch(text);
    setgoForSearchApiCall(true);
  };

  const recievedTab = () => {
    setgoForTicketCall(true);
  };

  const recievedTickets = item => {
    // console.log(item);
    navigation.navigate(AUTH.OPENTICKET, {
      data: item._id,
    });
  };

  const escalate = item =>{
    setescalateId(item)
    postData();
  }

  // const renderData = recievedSearch === '' ? assigned : searchdata;
const [renderData,setRenderData] = useState([]);
  useEffect(() => {
    const updatedRenderData = recievedSearch === '' ? assigned : searchdata;
    setRenderData(updatedRenderData);
  }, [recievedSearch, assigned]);

  /** Company Filter */
  const [recievedFilter, setrecievedFilter] = useState(false);
  const [recievedSort, setrecievedSort] = useState('');
  const [recievedDrop, setrecievedDrop] = useState('');
  const [recievedStatus, setrecievedStatus] = useState('');

  const recievedfilter = useFetchPost(
    API.RECIEVED_FILTER,
    {
      company: recievedDrop,
      status: recievedStatus,
      sortBy: recievedSort,
    },
    recievedFilter,
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!recievedfilter.loading) {
      if (recievedfilter.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setAssigned(recievedfilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setrecievedFilter(false);
  }, [recievedfilter.loading]);

  /** My tickets api and function  */
  const [mytickets, setMyTickets] = useState([]);
  const [mylimit, setmylimit] = useState(10);
  const [myskip, setmyskip] = useState(1);
  const [myload, setmyload] = useState(true);
  const [goformyticket, setgoformyticket] = useState(true);
  const myTickets = useFetchGet(
    API.MY_TICKETS,
    goformyticket,
    {},
    userAccessToken,
    mylimit,
    myskip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!myTickets.loading) {
      if (myTickets.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log(myTickets.response?.data.docs, 'daataaa');
        setMyTickets(prevTickets => [
          ...prevTickets,
          ...myTickets.response?.data.docs,
        ]);
        setmyskip(skip + 1);
        setmyload(false);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setgoformyticket(false);
  }, [myTickets.loading]);

  const myticketsfn = () => {
    setgoformyticket(true);
  };

  const [mySearch, setMySearch] = useState('');
  const [mySearchData, setMySearchData] = useState([]);
  const [mySearhApiCall, setmySearhApiCall] = useState(false);
  const getmySearch = useFetchGet(
    API.MY_SEARCH + `?search=${mySearch}`,
    mySearhApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getmySearch.loading) {
      if (getmySearch.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onMyApiSuccess(getmySearch);
      }
    } else {
      console.log('error occured in api call');
    }
    setmySearhApiCall(false);
  }, [getmySearch.loading, mySearch]);

  /**
   * method called on success of Api
   * @param {*} Search response
   */
  const onMyApiSuccess = getmySearch => {
    setMySearchData(getmySearch?.response?.data?.docs);
    console.log('====================================recievedd');
    console.log(getmySearch);
    console.log('====================================');
  };

  const onSubmitMy = text => {
    if (text === '') {
      setgoformyticket(true);
    } else {
      setMySearch(text);
      setmySearhApiCall(true);
    }
  };

  const handlemySearchChange = text => {
    setMySearch(text);
    setmySearhApiCall(true);
  };

  // const renderMyData = mySearch === '' ? mytickets : mySearchData;
  const [renderMyData,setrenderMyData] = useState([]);
  useEffect(() => {
    const updatedRenderData = mySearch === '' ? mytickets : mySearchData;
    setrenderMyData(updatedRenderData);
  }, [mySearch, mytickets]);

  const [myfilter, setmyFilter] = useState(false);
  const [mySort, setMySort] = useState('');
  const [myStatus, setMyStatus] = useState('');

  const myFilter = useFetchPost(
    API.MY_FILTERS,
    {
      status: myStatus,
      sortBy: mySort,
    },
    myfilter,
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!myFilter.loading) {
      console.log(myFilter.response);
      if (myFilter.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setMyTickets(null);
        setMyTickets(myFilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setmyFilter(false);
  }, [myFilter.loading]);

  const pressedMyTickets = item => {
    navigation.navigate(AUTH.OPENTICKET, {
      data: item._id,
    });
  };


  const postData = () => {
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/ticket/escalate/${escalateId._id}`,
        {

        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: userAccessToken,
          },
        },
      )
      .then(res => {
        console.log('api', res.data);
        SimpleToast.show(`Email sent successfully`)
      })
      .catch(error => {
        console.log('api error', error.response.data.error.message);
        
      });
  };


  const renderScene = ({route}) => {
    switch (route.key) {
      case 'Recieved':
        return (
          <>
            <View style={{marginTop: 10}}>
              <AnnouncementSearchBar
                onSubmit={() => onSubmitRecieve(recievedSearch)}
                value={recievedSearch}
                onChangeText={handleSearchChange}
                placeholderTextColor={colors.appLight}
                placeholder={'Search Tickets'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 12,
                  marginTop: 10,
                  justifyContent: 'space-between',
                }}>
                <ModalDropdown
                  style={{
                    backgroundColor: 'rgba(245, 246, 244, 1)',
                    zIndex: 10,
                    width: 108,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 51,
                  }}
                  options={companyData.map(company => company.name)}
                  textStyle={{
                    fontSize: 14,
                    color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                    // lineHeight: 28,
                  }}
                  dropdownTextStyle={{
                    fontSize: 14,
                    // color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                  }}
                  dropdownStyle={{width: 100}}
                  adjustFrame={style => {
                    style.left -= 8; // Adjust the left value as needed
                    style.top += 5; // Adjust the top value as needed
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Company <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    const selectedCompanyId = companyData[index]._id; // Access the ID using the index
                    console.log(selectedCompanyId, index);
                    setrecievedDrop(selectedCompanyId);
                    setrecievedFilter(true);
                  }}
                />

                <ModalDropdown
                  style={{
                    backgroundColor: 'rgba(245, 246, 244, 1)',
                    zIndex: 10,
                    width: 90,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 51,
                  }}
                  options={STATUS}
                  textStyle={{
                    fontSize: 14,
                    color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                    // lineHeight: 28,
                  }}
                  dropdownStyle={{width: 100, maxHeight: 80}}
                  dropdownTextStyle={{
                    fontSize: 14,
                    // color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                  }}
                  adjustFrame={style => {
                    style.left -= 20; // Adjust the left value as needed
                    style.top += 5; // Adjust the top value as needed
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Status <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    setrecievedStatus(option);
                    setrecievedFilter(true);
                  }}
                />
                <ModalDropdown
                  style={{
                    backgroundColor: 'rgba(245, 246, 244, 1)',
                    zIndex: 10,
                    width: 90,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 51,
                  }}
                  options={Sort_Recieved}
                  textStyle={{
                    fontSize: 14,
                    color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                    // lineHeight: 28,
                  }}
                  dropdownTextStyle={{
                    fontSize: 14,
                    // color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                  }}
                  dropdownStyle={{width: 100, maxHeight: 80}}
                  adjustFrame={style => {
                    // style.left = -8; // Adjust the left value as needed
                    style.top += 5; // Adjust the top value as needed
                    style.right = 5;
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Sort by <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    setrecievedSort(option);
                    setrecievedFilter(true);
                  }}
                />
              </View>
            </View>
            <FlatList
              data={renderData}
              keyExtractor={(item, index) => item._id}
              onEndReached={recievedTab}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                const formatDate = () => {
                  const date = new Date(item.createdAt);
                  const monthIndex = date.getMonth(); // Returns the month index (0-11)
                  const day = date.getDate(); // Returns the day of the month (1-31)

                  const months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ];

                  const formattedDate = `${months[monthIndex]} ${day}`;

                  return formattedDate;
                };
                const active = item.status;
                return (
                  <SupportTicket
                    image={{uri: item?.createdBy[0]?.profilePicture}}
                    Title={
                      item?.createdBy[0]?.firstName?.en +
                      item?.createdBy[0]?.lastName?.en
                    }
                    description={item?.createdByCompany[0]?.name}
                    BottomTitle={item?.title}
                    BottomSubText={formatDate()}
                    onPressView={() => recievedTickets(item)}
                    onPessEdit={() => escalate(item)}
                    Check={active == 'Pending' ? true : false}
                  />
                );
              }}
            />
          </>
        );
      case 'My':
        return (
          <>
            <View style={{marginTop: 10}}>
              <AnnouncementSearchBar
                onSubmit={() => onSubmitMy(mySearch)}
                value={mySearch}
                onChangeText={handlemySearchChange}
                placeholderTextColor={colors.appLight}
                placeholder={'Search Tickets'}
              />
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 12,
                  marginTop: 10,
                }}>
                <ModalDropdown
                  style={{
                    backgroundColor: 'rgba(245, 246, 244, 1)',
                    zIndex: 10,
                    width: 90,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 51,
                    marginRight: 12,
                  }}
                  options={STATUS}
                  textStyle={{
                    fontSize: 14,
                    color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                    // lineHeight: 28,
                  }}
                  dropdownStyle={{width: 100, maxHeight: 80}}
                  dropdownTextStyle={{
                    fontSize: 14,
                    // color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                  }}
                  adjustFrame={style => {
                    style.left -= 20; // Adjust the left value as needed
                    style.top += 5; // Adjust the top value as needed
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Status <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    setMyStatus(option);
                    setmyFilter(true);
                  }}
                />
                <ModalDropdown
                  style={{
                    backgroundColor: 'rgba(245, 246, 244, 1)',
                    zIndex: 10,
                    width: 90,
                    height: 32,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 51,
                  }}
                  options={Sort_Recieved}
                  textStyle={{
                    fontSize: 14,
                    color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                    // lineHeight: 28,
                  }}
                  dropdownTextStyle={{
                    fontSize: 14,
                    // color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                  }}
                  dropdownStyle={{width: 100, maxHeight: 80}}
                  adjustFrame={style => {
                    // style.left = -8; // Adjust the left value as needed
                    style.top += 5; // Adjust the top value as needed
                    style.right = 5;
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Sort by <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    setMySort(option);
                    setmyFilter(true);
                  }}
                />
              </View>
            </View>
            <FlatList
              data={renderMyData}
              keyExtractor={(item, index) => item._id}
              onEndReached={myticketsfn}
              onEndReachedThreshold={0.5}
              renderItem={({item}) => {
                const formatDate = () => {
                  const date = new Date(item.createdAt);
                  const monthIndex = date.getMonth(); // Returns the month index (0-11)
                  const day = date.getDate(); // Returns the day of the month (1-31)

                  const months = [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                  ];

                  const formattedDate = `${months[monthIndex]} ${day}`;

                  return formattedDate;
                };
                const active = item.status;
                return (
                  <MyTickets
                  Title={item?.title}
                    description={item?.createdBy?.company?.name}
                    BottomTitle={item?.title}
                    BottomSubText={formatDate()}
                    onPressView={() => pressedMyTickets(item)}
                    onPessEdit={() => escalate(item)}
                    Check={active == 'Pending' ? true : false}
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

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      inactiveColor={'rgba(125, 123, 124, 1)'}
      activeColor={'rgba(39, 38, 39, 1)'}
    />
  );
  return (
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
              Support
            </Text>
          </View>
          <AddButton
            btnstyle={{height: 32}}
            btnTxt={'Add Ticket'}
            onPress={() => navigation.navigate(AUTH.ADDTICKET)}
          />
        </View>
        <View style={{marginBottom: 16}}>
          <Text regular style={{lineHeight: 18}} body2 netural>
            Manage companies tickets and add your own tickets
          </Text>
        </View>
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

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
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
    width: 170,
  },
  indicator: {
    backgroundColor: 'rgba(39, 38, 39, 1)',
    width: '47%',
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
});

//make this component available to the app
export default Support;
