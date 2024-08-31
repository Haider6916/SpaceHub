//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Left} from '../../../assets';
import {BaseStyle} from '../../../config/styles';
import {AllocationCheck, Button, Text} from '../../../components';
import {useTheme} from '../../../config/theme';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchGet} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';

// create a component
const Allocations = ({navigation, route}) => {
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedData, setCheckedData] = useState([]);
  const [name, setName] = useState(route?.params?.name);
  const [email, setEmail] = useState(route?.params?.email);
  const [phone, setPhone] = useState(route?.params?.phone);
  const [web, setWeb] = useState(route?.params?.web);
  const [selected, setSelected] = useState(route?.params?.selected);
  const [linked, setLinked] = useState(route?.params?.linked);
  const [bio, setBio] = useState(route?.params?.bio);
  const [insta, setInsta] = useState(route?.params?.insta);
  const [facebook, setFacebook] = useState(route?.params?.facebook);
  const [id, setId] = useState(route?.params?.id);
  const [logo, setlogo] = useState(route?.params?.logo);

  console.log(checkedData);
  console.log('====================================');
  console.log(name, 'nameeeeeee');
  console.log(email, 'nameeeeeee');
  console.log(phone, 'nameeeeeee');
  console.log(web, 'nameeeeeee');
  console.log(selected, 'nameeeeeee');
  console.log(linked, 'nameeeeeee');
  console.log(bio, 'nameeeeeee');
  console.log(insta, 'nameeeeeee');
  console.log(facebook, 'nameeeeeee');
  console.log(id, 'sadasdssPlan');
  console.log(logo,'logo')
  console.log('====================================');

  const colors = useTheme();

  const getResources = useFetchGet(
    API.GET_RESOURCES,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getResources.loading) {
      console.log(getResources.response?.data?.docs);
      if (getResources.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setData(getResources.response?.data?.docs);
        setLoading(false);
        // console.log(getResources?.response?.data?.docs);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setGoForGetApiCall(false);
  }, [getResources.loading]);

  // Callback function to handle checked data
  const handleCheckedData = (isChecked, id) => {
    if (isChecked) {
      // Add the ID to the checkedData
      setCheckedData(prevData => [...prevData, id]);
    } else {
      // Remove the ID from the checkedData
      setCheckedData(prevData => prevData.filter(item => item !== id));
    }
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]}>
      <View style={{flex:1,paddingHorizontal:24}}>
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
      <ScrollView>
        <View style={{marginBottom: 10}}>
          <Text regular appPrimary body1 style={{lineHeight: 21}}>
            3/5 step
          </Text>
        </View>
        <View style={{marginBottom: 24}}>
          <Text regular blackColor heading2 style={{lineHeight: 31}}>
            Allocations
          </Text>
        </View>
        <View style={{marginBottom: 13}}>
          <Text regular title4 blackColor style={{lineHeight: 23}}>
            Available Desks
          </Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id || index.toString()}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between', marginTop: 10}}
          renderItem={({item, index}) => {
            return (
              <AllocationCheck
                // image={{uri:item?.images}}
                id={item._id}
                DeskName={item?.name}
                Capacity={`Capacity ${item?.capacity}`}
                FlooNumber={`Floor number ${item?.floorNumber}`}
                onCheckedData={handleCheckedData}
              />
            );
          }}
        />
      </ScrollView>
      <View
        style={{
          marginBottom: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <Button
          title="Back"
          buttonStyle={{flex: 0.4}}
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Next"
          buttonStyle={{flex: 0.4, backgroundColor: colors.appPrimary}}
          textStyles={{color: colors.whiteBackground}}
          // onPress={() => navigation.navigate(AUTH.ADDCEMPLOYEE)}
          onPress={() =>
            navigation.navigate(AUTH.ADDOWNER, {
              resources: checkedData,
              name: name,
              email: email,
              phone: phone,
              web: web,
              linked: linked,
              bio: bio,
              insta: insta,
              facebook: facebook,
              selected: selected,
              id: id,
              logo:logo,
            })
          }
        />
      </View>
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
});

//make this component available to the app
export default Allocations;
