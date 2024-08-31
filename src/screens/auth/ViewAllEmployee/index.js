//import liraries
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {DummyImg, Left} from '../../../assets';
import {EmployeeCard, Text} from '../../../components';
import { API, useFetchGet } from '../../../services';
import { useSelector } from 'react-redux';
import { GeneralResponses } from '../../../services/responses';
import { FlatList } from 'react-native';
import { useTheme } from '../../../config/theme';


// create a component
const ViewAllEmployee = ({navigation,route}) => {
  const data = route?.params?.data;
  console.log('====================================datacomoing');
  console.log(data);
  console.log('====================================');
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [employeeData,setEmployeeData] = useState([]);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [loading, setLoading] = useState(true);
  const colors = useTheme();

  const getCompanyEemployees = useFetchGet(
    API.COMPANY_EMPLOYEES + `${data}/users`,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getCompanyEemployees.loading) {
      console.log(getCompanyEemployees.response);
      if (getCompanyEemployees.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setEmployeeData(getCompanyEemployees.response?.data.docs);
        setLoading(false);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setGoForGetApiCall(false);
  }, [getCompanyEemployees.loading]);

  // render each employee card
  const renderEmployeeCard = ({ item }) => (
    <EmployeeCard
      image={{uri:item?.profilePicture}}
      Title={`${item?.firstName?.en} ${item?.lastName?.en}`}
      description={item?.role}
      BottomTitle={item?.profession?.en}
      BottomSubText={item?.profession?.en}
      dropDownCheck={false}
    />
  );

  return (
    <>
    {loading ? (
      // Show the activity indicator while loading
      <View style={{flex:1,justifyContent:'center'}}>
        <ActivityIndicator size="large" color={colors.appPrimary} />
      </View>
    ) :( <SafeAreaView style={[BaseStyle.safeAreaView]}>
      <View style={{paddingHorizontal:24,flex:1}}>
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
          {`Employee`}
        </Text>
      </View>
      {/* <ScrollView>
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
          BottomSub
          Text={`Front End Developer`}
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
      </ScrollView> */}
      <FlatList
        data={employeeData}
        renderItem={renderEmployeeCard}
        keyExtractor={(item) => item.id}
      />
      </View>
    </SafeAreaView>) }
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default ViewAllEmployee;
