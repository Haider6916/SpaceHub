//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {BigDummy, DummyImg, Left} from '../../../assets';
import {Allocation, Status, Text, ThreeDot} from '../../../components';
import {API, useFetchGet} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {useTheme} from '../../../config/theme';
// create a component
const ViewEmployee = ({navigation, route}) => {
  const data = route?.params?.data;
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [loading, setLoading] = useState(true);
  const [EmployeeData, setEmployeeData] = useState([]);
  const colors = useTheme();

  const getUser = useFetchGet(
    API.VIEW_USER + `${data}`,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getUser.loading) {
      if (getUser.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('====================================');
        console.log(getUser.response?.data);
        console.log('====================================');
        setEmployeeData(getUser?.response?.data);
        setLoading(false);
        // (daysLeftText)
      }
    } else {
      console.log('error in get Announceement ');
    }
    setGoForGetApiCall(false);
  }, [getUser.loading]);
  
  return (
    <>
      {loading ? (
        // Show the activity indicator while loading
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color={colors.appPrimary} />
        </View>
      ) : (
        <SafeAreaView style={[BaseStyle.safeAreaView]}>
          <View style={{flex:1,paddingHorizontal:24}}>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <TouchableOpacity
              style={{flex: 0.15}}
              onPress={() => navigation.goBack()}>
              <Left />
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <Text regular heading2 style={{lineHeight: 31}}>
                {`View Employee`}
              </Text>
            </View>
            <View>
              <ThreeDot Style={{marginTop: 0}} />
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}>
              <View
                style={{
                  height: 140,
                  width: 140,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{uri: EmployeeData?.profilePicture}}
                  style={{
                    height: 139,
                    width: 139,
                    borderRadius: 16,
                    borderWidth: 1,
                    borderColor: colors.appLight,
                  }}
                />
              </View>
              <View style={{flex: 1, marginLeft: 15}}>
                <View style={{flex: 0.45}}>
                  <Text
                    bold
                    heading2
                    style={{lineHeight: 31}}
                    numberOfLines={1}>
                    {`${EmployeeData?.firstName?.en} ${EmployeeData?.lastName?.en}`}
                  </Text>
                </View>
                <View>
                  <Status />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 19}}>
              <Text appLight regular body1 style={{lineHeight: 24}}>
                Part of:{' '}
                <Text regular body1 appPrimary style={{lineHeight: 24}}>
                  {EmployeeData?.company?.name}
                </Text>
              </Text>
            </View>
            <View style={{marginBottom: 14}}>
              <Text regular body1 netural style={{lineHeight: 24}}>
                Joined on{' '}
                <Text regular body1 netural style={{lineHeight: 24}}>
                  {new Date(EmployeeData?.joinedOn).toLocaleString()}
                </Text>
              </Text>
            </View>
            <View style={{marginBottom: 14}}>
              <Text regular body1 netural style={{lineHeight: 24}}>
                Email:{' '}
                <Text regular body1 netural style={{lineHeight: 24}}>
                  {EmployeeData?.company?.email}
                </Text>
              </Text>
            </View>
            <View style={{marginBottom: 16}}>
              <Text regular body1 netural style={{lineHeight: 24}}>
                Phone:
                <Text regular body1 netural style={{lineHeight: 24}}>
                  {` ${EmployeeData?.company?.phone}`}
                </Text>
              </Text>
            </View>
            <View style={{marginBottom: 4}}>
              <Text bold heading2 style={{lineHeight: 31}}>
                Allocation
              </Text>
              <View style={{marginBottom: 24}}>
                <FlatList
                  data={EmployeeData?.allocation}
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
              </View>
              <View style={{marginBottom: 4}}>
                <Text bold heading2 style={{lineHeight: 31}}>
                  Booking History
                </Text>
              </View>
              <View style={{marginBottom: 24}}>
                <Allocation />
              </View>
            </View>
          </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default ViewEmployee;
