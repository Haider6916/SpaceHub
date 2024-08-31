import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TabView, TabBar} from 'react-native-tab-view';
import {
  AnnouncementSearchBar,
  CompanyCard,
  CustomDropdown,
  EmployeeCard,
  Icon,
  Text,
  UpdateAnn,
  UpdateCompanyModal,
} from '..';
import {CompanyDummy, DirectoryArrrowDown, DummyImg} from '../../assets';
import {AUTH} from '../../navigation/ROUTES';
// import ModalDropdown from './ModalDropdown';
import ModalDropdown from 'react-native-modal-dropdown';
import {API, useFetchGet, useFetchPost} from '../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../services/responses';
import {useTheme} from '../../config/theme';
import axios from 'axios';

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

const CustomTopTabBar = ({
  navigation,
  // activeTab
}) => {
  const [index, setIndex] = useState(0);
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [goForGetCompanyApiCall, setgoForGetCompanyApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyData, setCompnayData] = useState([]);
  // const [goForGetUserCall, setGoForGetUserCall] = useState(true);
  const [userData, setUserData] = useState([]);
  const [searchUserData, setSearchUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [goForSearchUserApiCall, setGoForSearchUserApiCall] = useState(true);
  const [search, setSearch] = useState('');
  const colors = useTheme();

  /**Search Company */
  const [companySearch, setCompanySearch] = useState('');
  const [goForSearchCompanyApiCall, setGoForSearchCompanyApiCall] =
    useState(true);
  const [searchCompanyData, setSearchCompanyData] = useState([]);

  const getSearchCompany = useFetchGet(
    API.SEARCH_COMPANY + `?searchQuery=${companySearch}`,
    goForSearchCompanyApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getSearchCompany.loading) {
      if (
        getSearchCompany.response?.status === GeneralResponses.STATUS_OK.CODE
      ) {
        onApiHit(getSearchCompany);
        setLoading(false);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForSearchCompanyApiCall(false);
  }, [getSearchCompany.loading, companySearch]);

  /**
   * method called on success of Api
   * @param {*} Search response
   */
  const onApiHit = getSearchCompany => {
    setSearchCompanyData(getSearchCompany?.response?.data?.docs);
  };

  const onEnd = text => {
    if (text === '') {
      setGoForGetApiCall(true);
    } else {
      setCompanySearch(text);
      setGoForSearchCompanyApiCall(true);
      setCompanySort('');
      setCompanyStatus('');
      setCompanyDrop('');
    }
  };

  const companySearchData =
    companySearch === '' ? companyData : searchCompanyData;

  const handleCompanyChange = text => {
    setCompanySearch(text);
    setGoForSearchCompanyApiCall(true);
  };

  const getSearchUser = useFetchGet(
    API.SEARCH_USER + `?searchQuery=${search}`,
    goForSearchUserApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for getting Search Announcment */
  useEffect(() => {
    if (!getSearchUser.loading) {
      if (getSearchUser.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onApiSuccess(getSearchUser);
        setLoading(false);
      }
    } else {
      console.log('error occured in api call');
    }
    setGoForSearchUserApiCall(false);
  }, [getSearchUser.loading, search]);

  /**
   * method called on success of Api
   * @param {*} Search response
   */
  const onApiSuccess = getSearchUser => {
    setSearchUserData(getSearchUser?.response?.data?.docs);
  };

  const onSubmit = text => {
    if (text === '') {
      setGoForGetApiCall(true);
    } else {
      setSearch(text);
      setGoForSearchUserApiCall(true);
    }
  };

  const renderData = search === '' ? userData : searchUserData;

  const [routes] = useState([
    {key: 'first', title: 'Employees'},
    {key: 'second', title: 'Companies'},
  ]);

  const STATUS = ['Active', 'In-Active'];
  const SORTBY_COMPANY = ['RegisteredOn', 'Name'];
  const SORTBY_EMPLOYEE = ['JoinedOn', 'Name'];

  const EmployeePressed = id => {
    navigation.navigate(AUTH.VIEWEMPLOYEE, {
      data: id,
    });
  };

  const CompanyPressed = id => {
    navigation.navigate(AUTH.VIEWCOMPANY, {
      data: id,
    });
  };

  /**Get all users */
  const [skip, setskip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loadMore, setloadMore] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/user', {
        headers: {
          Authorization: userAccessToken,
          'x-pagination-skip': skip,
          'x-pagination-limit': limit,
        },
      })

      .then(res => res)

      .then(res => {
        // console.log('api', res.data);
        console.log('api', res);

        //    if(res.data.docs.length == 0){

        //      setloadMore(false)

        //    }
         // Filter out duplicate data based on a unique key
      const filteredData = res.data.docs.filter(item => {
        // Replace 'uniqueKey' with the actual unique key in your data
        return !userData.find(existingItem => existingItem._id === item._id);
      });


        setUserData([...userData, ...filteredData]);

        setskip(skip + 1);
        setloadMore(false);
      })
      .catch(error => {
        console.log('====================================');

        console.log(error);

        console.log('====================================');
      });
  };

  /**Get  All Company */
  const [coskip, setcoskip] = useState(1);
  const [colimit, setcoLimit] = useState(10);
  const [coloadMore, setcoloadMore] = useState(true);

  // const getUser = useFetchGet(
  //   API.GET_ALLUSERS,
  //   goForGetApiCall,
  //   {},
  //   userAccessToken,
  // );

  // /** response of api call for Announcment screen data */
  // useEffect(() => {
  //   if (!getUser?.loading) {
  //     if (getUser?.response?.status === GeneralResponses.STATUS_OK.CODE) {
  //       setUserData(getUser?.response?.data?.docs);
  //       setLoading(false);
  //     }
  //   } else {
  //     console.log('error in All users ');
  //   }
  //   setGoForGetApiCall(false);
  // }, [getUser.loading]);

  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetCompanyApiCall,
    {},
    userAccessToken,
    colimit,
    coskip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // setCompnayData(getComapny.response?.data?.docs);
        // setLoading(false);
        setCompnayData([...companyData, ...getComapny.response?.data?.docs]);

        setcoskip(coskip + 1);
        setcoloadMore(false);
      }
    } else {
      console.log('error in All users ');
    }
    setgoForGetCompanyApiCall(false);
  }, [getComapny.loading]);

  const handleSearchChange = text => {
    setSearch(text);
    setGoForSearchUserApiCall(true);
  };

  /**User Professions */
  const [goForUserProfession, setgoForUserProfession] = useState(true);
  const [userProfession, setUserProfession] = useState([]);

  const getProfesssion = useFetchGet(
    API.USER_PROFESSION,
    goForUserProfession,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getProfesssion.loading) {
      if (getProfesssion.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // setUserProfession(getProfesssion.response?.data?.docs);
        setUserProfession(getProfesssion.response.data?.professions);
      }
    } else {
      console.log('error in All users ');
    }
    setgoForUserProfession(false);
  }, [getProfesssion.loading]);

  /**Company Categories */
  const [goForCompanyCategory, setgoForCompanyCategory] = useState(true);
  const [company, setCompany] = useState([]);

  const getComapnyCategories = useFetchGet(
    API.COMPANY_CATEGORIES,
    goForCompanyCategory,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapnyCategories.loading) {
      if (
        getComapnyCategories.response?.status ===
        GeneralResponses.STATUS_OK.CODE
      ) {
        setCompany(getComapnyCategories.response?.data?.categories);
      }
    } else {
      console.log('error in All users ');
    }
    setgoForCompanyCategory(false);
  }, [getComapnyCategories.loading]);

  /** Company Filter */
  const [companyFilter, setCompanyFilter] = useState(false);
  const [CompanySort, setCompanySort] = useState('');
  const [CompanyDrop, setCompanyDrop] = useState('');
  const [CompanyStatus, setCompanyStatus] = useState('');
  const companyfilter = useFetchPost(
    API.COMPANY_FILTER,
    {
      category: CompanyDrop,
      status: CompanyStatus,
      sortBy: CompanySort,
    },
    companyFilter,
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!companyfilter.loading) {
      if (companyfilter.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setCompnayData(companyfilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setCompanyFilter(false);
  }, [companyfilter.loading]);

  /** User Filter */
  const [userFilter, setuserFilter] = useState(false);
  const [userSort, setUserSort] = useState('');
  const [userDrop, setUserDrop] = useState('');
  const [userStatus, setUserStatus] = useState('');
  const profession = {
    en: userDrop,
  };

  const userfilter = useFetchGet(
    API.USER_FILTER,
    userFilter,
    {
      profession: profession,
      status: userStatus,
      sortBy: userSort,
    },
    userAccessToken,
  );

  /** response of api call for verify api */
  useEffect(() => {
    if (!userfilter.loading) {
      if (userfilter.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setUserData(userfilter.response?.data?.docs);
      }
    } else {
      console.log('error occured in verify api call');
    }
    setuserFilter(false);
  }, [userfilter.loading]);

  /**View and edit Employee */
  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateCompany, setUpdateCompany] = useState(false);
  const [dataUpdate, setDataUpdate] = useState('');
  const [companydata, setCompanyData] = useState('');

  const threedotspressed = item => {
    navigation.navigate(AUTH.VIEWEMPLOYEE, {
      data: item._id,
    });
  };

  const editPressed = item => {
    setDataUpdate(item);
    setUpdateModal(true);
  };

  const renderScene = ({route}) => {
    if (loading) {
      // Show loader while data is loading
      return (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#8D55A2" />
        </View>
      );
    }
    const employeeEnd = () => {
      console.log('====================================');
      console.log('endReacherd');
      console.log('====================================');
      fetchData();
    };
    const companyEnd = () => {
      console.log('====================================');
      console.log('company');
      console.log('====================================');
      setgoForGetCompanyApiCall(true);
    };

    const modalPressed = () => {
      fetchData()
    }

    switch (route.key) {
      case 'first':
        return (
          <>
            <UpdateAnn
              visible={UpdateModal}
              navigation={navigation}
              onSwipeComplete={() => setUpdateModal(false)}
              backPressed={() => setUpdateModal(false)}
              // onDelete={onDeletePressed}
              onBackdropPress
              data={dataUpdate}
              updated={modalPressed}
            />
            <ScrollView contentContainerStyle={[styles.page]}>
              <View style={{marginTop: 20, marginBottom: 8}}>
                <AnnouncementSearchBar
                  onSubmit={() => onSubmit(search)}
                  value={search}
                  onChangeText={handleSearchChange}
                  placeholderTextColor={colors.appLight}
                  placeholder={'Search Directorys'}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 12,
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
                  options={userProfession}
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
                      Profession <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    setUserDrop(option);
                    setuserFilter(true);
                  }}
                  // renderButtonText={(option) => (
                  //   <React.Fragment>
                  //     <Icon name="your-icon-name" /> {option}
                  //   </React.Fragment>
                  // )}
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
                    if (option === 'Active') {
                      setUserStatus('true');
                      setuserFilter(true);
                    } else if (option === 'In-Active') {
                      setUserStatus('false');
                      setuserFilter(true);
                    }
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
                  options={SORTBY_EMPLOYEE}
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
                    setUserSort(option);
                    setuserFilter(true);
                  }}
                />
              </View>
              <FlatList
                data={renderData}
                keyExtractor={(item, index) => item._id}
                onEndReached={employeeEnd}
                onEndReachedThreshold={0.5}
                renderItem={({item}) => {
                  const active = item.isActive;
                  return (
                    <EmployeeCard
                      image={{uri: item?.profilePicture}}
                      Title={item?.firstName?.en + item?.lastName?.en}
                      description={item?.role}
                      BottomTitle={item?.profession?.en}
                      BottomSubText={item?.role}
                      onPressView={() => threedotspressed(item)}
                      onPessEdit={() => {
                        console.log(item, 'item');
                        setDataUpdate(item);
                        setUpdateModal(true);
                      }}
                      Check={active == false ? true : false}
                      // ()=> editPressed(item)}
                    />
                  );
                }}
              />
            </ScrollView>
          </>
        );
      case 'second':
        // if (activeTab === 1) {
        return (
          <>
            <UpdateCompanyModal
              visible={UpdateCompany}
              navigation={navigation}
              onSwipeComplete={() => setUpdateCompany(false)}
              backPressed={() => setUpdateCompany(false)}
              // onDelete={onDeletePressed}
              onBackdropPress
              data={companydata}
            />
            <ScrollView contentContainerStyle={[styles.page]}>
              <View style={{marginTop: 20, marginBottom: 8}}>
                <AnnouncementSearchBar
                  onSubmit={() => onEnd(companySearch)}
                  value={companySearch}
                  onChangeText={handleCompanyChange}
                  placeholderTextColor={colors.appLight}
                  placeholder={'Search Directorys'}
                />
              </View>
              {/* <View style={{flexDirection: 'row', marginBottom: 12, flex: 1}}>
              <CustomDropdown
                options={options}
                onSelect={onSelectOption}
                mainText={'Company'}
                mainStyle={{zIndex: 10, width: 110}}
                // mainStyle={{Index: 10, width: 100}}
              />
              <CustomDropdown
                options={options}
                onSelect={onSelectOption}
                mainText={'Status'}
                mainStyle={{marginLeft: 12, zIndex: 10, width: 90}}
              />
              <CustomDropdown
                options={options}
                onSelect={onSelectOption}
                mainText={'Sort by'}
                mainStyle={{marginLeft: 12, zIndex: 10, width: 90}}
              />
            </View> */}
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 12,
                  justifyContent: 'space-between',
                }}>
                {/* <CustomDropdown
                options={options}
                onSelect={onSelectOption}
                mainText={'Company'}
                mainStyle={{zIndex: 10,width:110}}
              /> */}
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
                  options={company}
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
                    // style.top += 10; // Adjust the top value as needed
                    style.top += 5;
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Categories <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    setCompanyDrop(option);
                    setCompanyFilter(true);
                  }}
                  // renderButtonText={(option) => (
                  //   <React.Fragment>
                  //     <Icon name="your-icon-name" /> {option}
                  //   </React.Fragment>
                  // )}
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
                  dropdownTextStyle={{
                    fontSize: 14,
                    // color: 'rgba(68, 67, 68, 1)',
                    fontFamily: 'DM Sans',
                    fontWeight: '400',
                  }}
                  dropdownStyle={{width: 100, maxHeight: 80}}
                  adjustFrame={style => {
                    style.left -= 20; // Adjust the left value as needed
                    // style.top += 10; // Adjust the top value as needed
                    style.top += 5;
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Status <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  onSelect={(index, option) => {
                    if (option === 'Active') {
                      setCompanyStatus('true');
                      setCompanyFilter(true);
                    } else if (option === 'In-Active') {
                      setCompanyStatus('false');
                      setCompanyFilter(true);
                    }
                  }}
                  // renderButtonText={(option) => (
                  //   <React.Fragment>
                  //     <Icon name="your-icon-name" /> {option}
                  //   </React.Fragment>
                  // )}
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
                  options={SORTBY_COMPANY}
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
                    // style.top += 10; // Adjust the top value as needed
                    style.right = 5;
                    style.top += 5;
                    return style;
                  }}
                  defaultValue={
                    <React.Fragment>
                      Sort by <DirectoryArrrowDown />
                    </React.Fragment>
                  }
                  // renderButtonText={(option) => (
                  //   <React.Fragment>
                  //     <Icon name="your-icon-name" /> {option}
                  //   </React.Fragment>
                  // )}
                  onSelect={(index, option) => {
                    setCompanySort(option);
                    setCompanyFilter(true);
                  }}
                />
              </View>
              <FlatList
                data={companySearchData}
                keyExtractor={(item, index) => item.id || index.toString()}
                onEndReached={companyEnd}
                onEndReachedThreshold={0.5}
                renderItem={({item}) => {
                  const currentDate = new Date();
                  const endDate = new Date(item.planEndDate);
                  const remainingDays = Math.floor(
                    (endDate - currentDate) / (1000 * 60 * 60 * 24),
                  );
                  let daysLeftText =
                    remainingDays >= 1
                      ? `${remainingDays} days left`
                      : 'Less than one day';
                  const active = item.isActive;
                  return (
                    <CompanyCard
                      image={{uri: item?.logo}}
                      Title={item?.name}
                      description={`${item?.employees?.length} employees`}
                      BottomTitle={daysLeftText}
                      BottomSubText={`${item.plan.meetingRoomHours} hours meeting room`}
                      onPressView={() => CompanyPressed(item._id)}
                      onPessEdit={() => {
                        console.log(item, 'item');
                        setCompanyData(item);
                        setUpdateCompany(true);
                      }}
                      Check={active == false ? true : false}
                    />
                  );
                }}
              />
            </ScrollView>
          </>
        );
      // }
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </View>
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
    width: 140,
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
  page: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default CustomTopTabBar;
