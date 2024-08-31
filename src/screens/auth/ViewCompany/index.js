//import liraries
import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {
  Allocation,
  DeactivateModal,
  DeleteModal,
  EmployeeCard,
  Text,
  ThreeDot,
} from '../../../components';
import {
  DollarCircle,
  DummyImg,
  InfoCircle,
  Left,
  ThreeDots,
  ViewCompanyImg,
} from '../../../assets';
import {useTheme} from '../../../config/theme';
import {useState} from 'react';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchDelete, useFetchGet, useFetchPut} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import SelectDropdown from 'react-native-select-dropdown';

// create a component
const ViewCompany = ({navigation, route}) => {
  const data = route?.params?.data;
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [daysleft, setDaysleft] = useState('');
  const [loading, setLoading] = useState(true);
  const [goForRemove, setGoForRemove] = useState(false);
  const [goForUpdate, setGoForUpdate] = useState(false);
  const colors = useTheme();
  const [showDropdown, setShowDropdown] = useState(false);

  const handlePress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionPress = option => {
    // Handle the selected option here
    console.log('Selected option:', option);
    if (option === 'Option 1') {
      setDeleteModal(true);
      setShowDropdown(false);
    } else if (option === 'Option 2') {
      setDeactivateModal(true);
      setShowDropdown(false);
    }
    // You can perform any action based on the selected option
  };

  const getCompany = useFetchGet(
    API.COMPANY_BYID + `${data}`,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getCompany.loading) {
      console.log(getCompany.response, 'sdasdsddsadsd');
      if (getCompany.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setCompanyData(getCompany.response?.data);
        const currentDate = new Date();
        const endDate = new Date(getCompany.response?.data.planEndDate);
        const remainingDays = Math.floor(
          (endDate - currentDate) / (1000 * 60 * 60 * 24),
        );
        setDaysleft(
          remainingDays >= 1
            ? `subscription ends after ${remainingDays} days `
            : 'Less than one day',
        );
        setLoading(false);
        // (daysLeftText)
      }
    } else {
      console.log('error in get Announceement ');
    }
    setGoForGetApiCall(false);
  }, [getCompany.loading]);

  const DotsPressed = () => {
    // // setDeleteModal(true);
    // setDeactivateModal(true);
  };

  const CompanyPressed = id => {
    console.log('====================================');
    console.log(id);
    console.log('====================================');
    navigation.navigate(AUTH.VIEWALLEMPLOYEEE, {
      data: id,
    });
  };

  /** api call for deleting product from wishlist */
  const deleteCompany = useFetchDelete(
    API.DELETE_COMPANY + `${data}`,
    {},
    goForRemove,
    userAccessToken,
  );

  /** response of api call deleting product from wishlist */
  useEffect(() => {
    if (!deleteCompany.loading) {
      console.log('====================================');
      console.log(deleteCompany.response);
      console.log('====================================');
      if (deleteCompany.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('Company Removed');
        navigation.navigate(`Directory`);
      }
    } else {
      console.log('error occured in remove from wishlist api');
    }
    setGoForRemove(false);
  }, [deleteCompany.loading]);

  const onDeletePressed = () => {
    setGoForRemove(true);
    setDeleteModal(false);
    navigation.navigate(`Directory`);
  };

  /** api call for update */
  const updateCompany = useFetchPut(
    API.DEACTIVATE_COMPANY + `${data}`,
    {
      isActive: false,
    },
    goForUpdate,
    userAccessToken,
  );

  /** response of api call for update */
  useEffect(() => {
    if (!updateCompany.loading) {
      console.log('====================================');
      console.log(updateCompany.response);
      console.log('====================================');
      if (updateCompany.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // setIsError(false);
        // onSuccessApi(updateCompany?.response);
        console.log('Company Deactivated');
        navigation.navigate(`Directory`);
      }
    } else {
      console.log('error occured in update api call');
    }
    setGoForUpdate(false);
  }, [updateCompany.loading]);

  const onDeactivePressed = () => {
    console.log('====================================');
    console.log('Pressed');
    console.log('====================================');
    setGoForUpdate(true);
    setDeactivateModal(false);
    navigation.navigate('directory');
  };

  const mainView = () => {
    setShowDropdown(false);
  };

  const options = [
    {id: 1, label: 'Delete Company'},
    {id: 2, label: 'Deactivate Company'},
  ];

  return (
    <>
      {loading ? (
        // Show the activity indicator while loading
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.appPrimary} />
        </View>
      ) : (
        <>
          <DeleteModal
            visible={deleteModal}
            navigation={navigation}
            onSwipeComplete={() => setDeleteModal(false)}
            Cancel={() => setDeleteModal(false)}
            onDelete={onDeletePressed}
            onBackdropPress
          />
          <DeactivateModal
            visible={deactivateModal}
            navigation={navigation}
            onSwipeComplete={() => setDeactivateModal(false)}
            Cancel={() => setDeactivateModal(false)}
            onDeactive={onDeactivePressed}
            onBackdropPress
          />
          <ScrollView contentContainerStyle={{backgroundColor: 'white'}}>
            <Pressable onPress={mainView} style={{paddingHorizontal: 24}}>
              <View
                style={{
                  marginTop: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  // marginBottom: 24,
                }}>
                <TouchableOpacity
                  style={{flex: 0.15}}
                  onPress={() => navigation.goBack()}>
                  <Left />
                </TouchableOpacity>
                <View style={{flex: 1}}>
                  <Text regular heading2 style={{lineHeight: 31}}>
                    {`View Company`}
                  </Text>
                </View>
                <SelectDropdown
                  data={options}
                  // defaultValueByIndex={1}
                  // defaultValue={{
                  //   title: 'England',
                  //   image: require('./Images/England.jpg'),
                  // }}
                  onSelect={(selectedItem, index) => {
                    if (selectedItem.id === 1) {
                      // navigation.navigate(AUTH.ADDEMPLOYEE);
                      setDeleteModal(true);
                      setShowDropdown(false);
                    } else {
                      // navigation.navigate(AUTH.ADDCOMPANY);
                      setDeactivateModal(true);
                      setShowDropdown(false);
                    }
                  }}
                  // buttonTextAfterSelection={(selectedItem, index) => {
                  //   return selectedItem;
                  // }}
                  rowStyle={{
                    backgroundColor: 'white',
                    borderBottomColor: 'rgba(233, 234, 233, 1)',
                    height: 56,
                  }}
                  buttonStyle={{
                    marginTop: 24,
                    height: 48,
                    width: 48,
                    marginBottom: 16,
                    backgroundColor: 'white',
                    // borderWidth: 1,
                    // borderColor: 'rgba(233, 234, 233, 1)',
                    borderRadius: 51,
                    // paddingHorizontal: 10,
                  }}
                  renderCustomizedButtonChild={(selectedItem, index) => {
                    return (
                      <View
                        style={[
                          {
                            // marginTop: 24,
                            borderRadius: 26,
                            overflow: 'hidden',
                            shadowColor: '#000',
                            shadowOffset: {
                              width: 0,
                              height: 2,
                            },
                            shadowOpacity: 0.25,
                            shadowRadius: 4,
                            elevation: 5,
                            backgroundColor: '#fff',
                            justifyContent: 'center',
                            alignItems: 'center',
                          },
                        ]}>
                        <ThreeDots />
                      </View>
                    );
                  }}
                  dropdownStyle={{
                    width: 200,
                    position: 'absolute',
                    left: '35%',
                    marginTop: 3,
                  }}
                  // rowStyle={styles.dropdown3RowStyle}
                  renderCustomizedRowChild={(item, index) => {
                    return (
                      <View
                        style={{
                          backgroundColor: 'white',
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
                {/* <View style={{width:'35%'}}>
                <ThreeDot Style={{marginTop: 0,alignSelf: 'flex-end',}} 
                // onPress={DotsPressed} 
                onPress={handlePress}
                />
                 {showDropdown && (
        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress('Option 1')}
          >
            <Text style={styles.optionText}>Delete Company</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionPress('Option 2')}
            
          >
            <Text style={styles.optionText}>Deactivate Company</Text>
          </TouchableOpacity>
        </View>
      )}
              </View> */}
              </View>
              <ScrollView>
                <View
                  style={{
                    height: 170,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius: 16,
                    borderColor: colors.appLight,
                    marginBottom: 8,
                  }}>
                  <Image
                    source={{uri: companyData.logo}}
                    style={{width: '80%', height: '80%'}}
                    resizeMode="cover"
                  />
                </View>
                <View style={{marginBottom: 5}}>
                  <Text style={{lineHeight: 24}} bold title4 blackColor>
                    {companyData.name}
                  </Text>
                </View>
                <View style={{marginBottom: 9}}>
                  <Text
                    style={{lineHeight: 24, color: 'rgba(68, 67, 68, 1)'}}
                    body1
                    regular>
                    {companyData.bio}
                  </Text>
                </View>
                <View style={{marginBottom: 14}}>
                  <Text style={{lineHeight: 24}} netural body1 regular>
                    Joined on{' '}
                    <Text style={{lineHeight: 24}} netural body1 regular>
                      {/* {companyData.planStartDate} */}
                      {new Date(companyData.planStartDate).toLocaleString()}
                    </Text>
                  </Text>
                </View>
                <View style={{marginBottom: 14}}>
                  <Text style={{lineHeight: 24}} netural body1 regular>
                    Email:{' '}
                    <Text style={{lineHeight: 24}} netural body1 regular>
                      {companyData.email}
                    </Text>
                  </Text>
                </View>
                <View style={{marginBottom: 20}}>
                  <Text style={{lineHeight: 24}} netural body1 regular>
                    Phone:{' '}
                    <Text style={{lineHeight: 24}} netural body1 regular>
                      {companyData.phone}
                    </Text>{' '}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <InfoCircle />
                  <Text
                    style={{lineHeight: 24, marginLeft: 16}}
                    regular
                    body2
                    netural>
                    {companyData.category}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <DollarCircle />
                  <Text
                    style={{lineHeight: 24, marginLeft: 16}}
                    regular
                    body2
                    netural>
                    {companyData?.plan?.description}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <InfoCircle />
                  <Text
                    style={{lineHeight: 24, marginLeft: 16}}
                    regular
                    body2
                    netural
                    numberOfLines={1}>
                    {daysleft}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <InfoCircle />
                  <Text
                    style={{
                      lineHeight: 24,
                      marginLeft: 16,
                      textDecorationLine: 'underline',
                    }}
                    regular
                    body2
                    appPrimary>
                    {companyData.website}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <InfoCircle />
                  <Text
                    style={{
                      lineHeight: 24,
                      marginLeft: 16,
                      textDecorationLine: 'underline',
                    }}
                    regular
                    body2
                    appPrimary>
                    {companyData.instagram}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}>
                  <InfoCircle />
                  <Text
                    style={{
                      lineHeight: 24,
                      marginLeft: 16,
                      textDecorationLine: 'underline',
                    }}
                    regular
                    body2
                    appPrimary>
                    {companyData.linkedin}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 30,
                  }}>
                  <InfoCircle />
                  <Text
                    style={{
                      lineHeight: 24,
                      marginLeft: 16,
                      textDecorationLine: 'underline',
                    }}
                    regular
                    body2
                    appPrimary>
                    {companyData.facebook}
                  </Text>
                </View>
                <View style={{justifyContent: 'center', marginTop: 10}}>
                  <Text style={{color: 'rgba(39, 38, 39, 1)'}} regular heading2>
                    Company Allocation
                  </Text>
                </View>
                {/* <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'space-between',
              // alignItems:'center',
              marginBottom: 10,
              // paddingHorizontal:24,
            }}>
            <Allocation Style={{marginRight: 10}} />
            <Allocation />
          </View> */}
                {/* <FlatList
  data={companyData.resources}
  renderItem={({ item }) => (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
      <Allocation Style={{ marginRight: 10 }} />
      <Allocation />
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  numColumns={2} // Change to 2 for two columns
  columnWrapperStyle={{ paddingHorizontal: 24 }} // Optional: Set padding horizontal for columns
/> */}
                {/* <FlatList
              data={companyData.resources}
              keyExtractor={(item, index) => item.id || index.toString()}
              numColumns={2} // Change to 2 for two columns
  // columnWrapperStyle={{ paddingHorizontal: 24 }} 
              renderItem={({item}) => {
                return (
                  <Allocation
                  // image={uri:item?.images}
                  Deskname={item?.description}
                  Capacity={item?.capacity}
                  Floornumber={item?.floorNumber}
                  />
                );
              }}
            /> */}
                <FlatList
                  data={companyData.resources}
                  keyExtractor={(item, index) => item.id || index.toString()}
                  numColumns={2}
                  columnWrapperStyle={{
                    justifyContent: 'space-between',
                    marginTop: 10,
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <Allocation
                        // image={{uri:item?.images}}
                        Deskname={item?.name}
                        Capacity={item?.capacity}
                        Floornumber={item?.floorNumber}
                      />
                    );
                  }}
                />
                <View style={{marginBottom: 26, marginTop: 20}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 13,
                    }}>
                    <Text regular blackColor heading2>
                      Employees{` (${companyData?.employees?.length})`}
                    </Text>
                    <TouchableOpacity
                      onPress={() => CompanyPressed(companyData._id)}>
                      <Text regular body1 appPrimary>
                        View all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {/* <EmployeeCard
              image={DummyImg}
              Title={`Ahmed Emad`}
              description={`Ahmed Emad`}
              BottomTitle={`Front End Developer`}
              BottomSubText={`Front End Developer`}
            />
            <EmployeeCard
              image={DummyImg}
              Title={`Ahmed Emad`}
              description={`Ahmed Emad`}
              BottomTitle={`Front End Developer`}
              BottomSubText={`Front End Developer`}
            />
            <EmployeeCard
              image={DummyImg}
              Title={`Ahmed Emad`}
              description={`Ahmed Emad`}
              BottomTitle={`Front End Developer`}
              BottomSubText={`Front End Developer`}
            />
            <EmployeeCard
              image={DummyImg}
              Title={`Ahmed Emad`}
              description={`Ahmed Emad`}
              BottomTitle={`Front End Developer`}
              BottomSubText={`Front End Developer`}
            />
            <EmployeeCard
              image={DummyImg}
              Title={`Ahmed Emad`}
              description={`Ahmed Emad`}
              BottomTitle={`Front End Developer`}
              BottomSubText={`Front End Developer`}
            /> */}
                  {companyData?.employees?.slice(0, 5).map(employee => (
                    <EmployeeCard
                      key={employee._id}
                      image={{uri: employee.profilePicture}}
                      Title={`${employee?.firstName?.en} ${employee?.lastName?.en}`}
                      description={employee.role}
                      BottomTitle={employee?.profession?.en}
                      BottomSubText={employee?.profession?.en}
                      dropDownCheck={false}
                    />
                  ))}
                </View>
                <View>
                  <Text regular heading2 blackColor style={{lineHeight: 31}}>
                    Booking History
                  </Text>
                  <View style={{marginBottom: 24, marginTop: 12}}>
                    <Allocation />
                  </View>
                </View>
              </ScrollView>
            </Pressable>
          </ScrollView>
        </>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
    width: '150%',
  },
  option: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 234, 233, 1)',
  },
  optionText: {
    fontSize: 16,
  },
});

//make this component available to the app
export default ViewCompany;
