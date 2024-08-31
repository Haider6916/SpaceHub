//import liraries
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useTheme} from '../../../config/theme';
import {
  ArrowDown,
  DirectoryArrrowDown,
  DrawerIcon,
  Message,
  Notification,
} from '../../../assets';
import {
  AnnouncementSearchBar,
  CompanyCard,
  CustomTopTabBar,
  EmployeeCard,
  Text,
  UpdateAnn,
  UpdateCompanyModal,
} from '../../../components';
import {AUTH} from '../../../navigation/ROUTES';
import {useIsFocused} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';
import {TabBar, TabView} from 'react-native-tab-view';
import ModalDropdown from 'react-native-modal-dropdown';
import {FlatList} from 'react-native';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';

const Directory = ({navigation}) => {
  const isFocused = useIsFocused();
  const userAccessToken = useSelector(state => state.user.userAccessToken);

  const colors = useTheme();
  //  const [activeTab,setActiveTab] = useState(exitPoint === 'HomeViewAll' ? 1 : 0);

  const options = [
    {id: 1, label: 'Add Employee'},
    {id: 2, label: 'Add company'},
  ];

  /** Employee Stufff */
  const [UpdateModal, setUpdateModal] = useState(false);
  const [dataUpdate, setDataUpdate] = useState('');
  const [search, setSearch] = useState('');
  const [userProfession, setUserProfession] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchUserData, setSearchUserData] = useState([]);
  const [goForuserGetApiCall, setGoForuserGetApiCall] = useState(true);
  const [renderData, setRenderData] = useState([]);
  const [goForSearchUserApiCall, setGoForSearchUserApiCall] = useState(true);
  const [skip, setskip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loadMore, setloadMore] = useState(true);

  const handleSearchChange = text => {
    setSearch(text);
    setGoForSearchUserApiCall(true);
    console.log('====================================');
  };

  const STATUS = ['Active', 'In-Active'];
  const SORTBY_COMPANY = ['RegisteredOn', 'Name'];
  const SORTBY_EMPLOYEE = ['JoinedOn', 'Name'];

  useEffect(() => {
    const updatedRenderData = search === '' ? userData : searchUserData;
    setRenderData(updatedRenderData);
  }, [search, userData]);

  const employeeEnd = () => {
    console.log('====================================');
    console.log('EmployeeendReacherd');
    console.log('====================================');
    setGoForuserGetApiCall(true);
  };

  const threedotspressed = item => {
    navigation.navigate(AUTH.VIEWEMPLOYEE, {
      data: item._id,
    });
  };

  const editPressed = item => {
    navigation.navigate(AUTH.UPDATEEMPLOYEE, {
      data: item,
    });
  };

  /** Employee Apis */
  const getUser = useFetchGet(
    API.GET_ALLUSERS,
    goForuserGetApiCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getUser?.loading) {
      if (getUser?.response?.status === GeneralResponses.STATUS_OK.CODE) {
        const filteredData = getUser?.response?.data?.docs.filter(item => {
          // Replace 'uniqueKey' with the actual unique key in your data
          return !userData.find(existingItem => existingItem._id === item._id);
        });
        setUserData([...userData, ...filteredData]);

        setskip(skip + 1);
        setloadMore(false);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForuserGetApiCall(false);
  }, [getUser.loading]);

  /** Emplooyee Search */
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
        // setLoading(false);
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
      setGoForuserGetApiCall(true);
    } else {
      setSearch(text);
      setGoForSearchUserApiCall(true);
    }
  };

  /**User Professions */
  const [goForUserProfession, setgoForUserProfession] = useState(true);

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

  /** Company Apis */
  const [UpdateCompany, setUpdateCompany] = useState(false);
  const [companydata, setCompanyData] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [goForSearchCompanyApiCall, setGoForSearchCompanyApiCall] =
    useState(true);
  const [searchCompanyData, setSearchCompanyData] = useState([]);
  const [companyData, setCompnayData] = useState([]);
  const [company, setCompany] = useState([]);
  const [goForGetCompanyApiCall, setgoForGetCompanyApiCall] = useState(true);
  const [companySearchData, setcompanySearchData] = useState([]);
  const [coskip, setcoskip] = useState(1);
  const [colimit, setcoLimit] = useState(10);
  const [coloadMore, setcoloadMore] = useState(true);

  useEffect(() => {
    const updatedCompanyData =
      companySearch === '' ? companyData : searchCompanyData;
    setcompanySearchData(updatedCompanyData);
  }, [companySearch, companyData]);

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
        const filteredompanyData = getComapny.response?.data?.docs.filter(
          item => {
            // Replace 'uniqueKey' with the actual unique key in your data
            return !companyData.find(
              existingItem => existingItem._id === item._id,
            );
          },
        );
        setCompnayData([...companyData, ...filteredompanyData]);

        setcoskip(coskip + 1);
        setcoloadMore(false);
      }
    } else {
      console.log('error in All users ');
    }
    setgoForGetCompanyApiCall(false);
  }, [getComapny.loading]);

  /**Company Categories */
  const [goForCompanyCategory, setgoForCompanyCategory] = useState(true);

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

  /**Search Company */
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
        //  setLoading(false);
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
      setgoForGetCompanyApiCall(true);
    } else {
      setCompanySearch(text);
      setGoForSearchCompanyApiCall(true);
    }
  };

  const handleCompanyChange = text => {
    setCompanySearch(text);
    setGoForSearchCompanyApiCall(true);
  };

  const companyEnd = () => {
    console.log('====================================');
    console.log('company');
    console.log('====================================');
    setgoForGetCompanyApiCall(true);
  };

  const CompanyPressed = id => {
    navigation.navigate(AUTH.VIEWCOMPANY, {
      data: id,
    });
  };

  const companyeditPressed = item => {
    console.log(item, 'item');
    navigation.navigate(AUTH.UPDATECOMPANY, {
      data: item,
    });
  };

  useEffect(() => {
    setcoskip(1);
    setcoLimit(10);
    setcompanySearchData([]);
    setCompnayData([]);
    setUserData([]);
    setRenderData([]);
    setskip(1);
    setLimit(10);
    setGoForuserGetApiCall(true);
    setgoForGetCompanyApiCall(true);
  }, [isFocused, navigation]);

  // Define the tabs and their routes
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'employee', title: 'Employees'},
    {key: 'company', title: 'Companies'},
  ]);

  // Render each tab scene
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'employee':
        return (
          <View style={{flex: 1}}>
            <UpdateAnn
              visible={UpdateModal}
              navigation={navigation}
              onSwipeComplete={() => setUpdateModal(false)}
              backPressed={() => setUpdateModal(false)}
              // onDelete={onDeletePressed}
              onBackdropPress
              data={dataUpdate}
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
                      onPessEdit={() => editPressed(item)}
                      Check={active == false ? true : false}
                    />
                  );
                }}
              />
            </ScrollView>
          </View>
        );
      case 'company':
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
                keyExtractor={(item, index) => item._id || index.toString()}
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
                      onPessEdit={() => companyeditPressed(item)}
                      Check={active == false ? true : false}
                    />
                  );
                }}
              />
            </ScrollView>
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
          <Text heading2 bold style={{lineHeight: 31}}>{`Directory`}</Text>
          <SelectDropdown
            data={options}
            onSelect={(selectedItem, index) => {
              if (selectedItem.id === 1) {
                navigation.navigate(AUTH.ADDEMPLOYEE);
              } else {
                navigation.navigate(AUTH.ADDCOMPANY);
              }
            }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
              height: 56,
            }}
            buttonStyle={{
              width: 98,
              height: 32,
              marginBottom: 16,
              backgroundColor: colors.appPrimary,
              borderRadius: 51,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.appPrimary,
                    height: 32,
                    width: '100%',
                    marginHorizontal: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      lineHeight: 28,
                      fontWeight: '500',
                    }}>
                    {`Add`}
                  </Text>
                  <ArrowDown width={20} height={20} />
                </View>
              );
            }}
            dropdownStyle={{
              width: 200,
              position: 'absolute',
              left: '35%',
              marginTop: 3,
            }}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    // alignItems: 'center',
                    backgroundColor: 'white',
                    // width:400
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 16,
                    }}>
                    {item.label}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <View style={{marginTop: 17, marginBottom: 17}}>
          <Text netural regular body2 style={{lineHeight: 18}}>
            {`Add and Manage companies, employees and more`}
          </Text>
        </View>
      </View>
      {/* <CustomTopTabBar
        navigation={navigation}
        // activeTab={activeTab}
        // {...props}
      /> */}
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

// define your styles
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

//make this component available to the app
export default Directory;
