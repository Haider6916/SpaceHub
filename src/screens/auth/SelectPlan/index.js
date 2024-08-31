//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Left} from '../../../assets';
import {Button, Plan, Text} from '../../../components';
import {BaseStyle} from '../../../config/styles';
import {useTheme} from '../../../config/theme';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchGet} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import SimpleToast from 'react-native-simple-toast';

// create a component
const SelectPlan = ({navigation, route}) => {
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(selectedOption?._id);
  const [name, setName] = useState(route?.params?.name);
  const [email, setEmail] = useState(route?.params?.email);
  const [phone, setPhone] = useState(route?.params?.phone);
  const [web, setWeb] = useState(route?.params?.web);
  const [selected, setSelected] = useState(route?.params?.selected);
  const [linked, setLinked] = useState(route?.params?.linked);
  const [bio, setBio] = useState(route?.params?.bio);
  const [insta, setInsta] = useState(route?.params?.insta);
  const [facebook, setFacebook] = useState(route?.params?.facebook);
  const [logo,setLogo] = useState(route?.params?.logo);
  // const name =
  // const email = ;
  // const phone = ;
  // const web = ;
  // const selected = ;
  // const linked =
  // const bio = ;
  // const insta = ;
  // const facebook = ;

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
  console.log(logo,'logo')
  console.log('====================================');

  const colors = useTheme();

  const [options, setOptions] = useState([]);

  const getPlans = useFetchGet(
    API.GET_PLANS,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Plans screen data */
  useEffect(() => {
    if (!getPlans.loading) {
      console.log(getPlans?.response);
      if (getPlans?.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setOptions(getPlans.response.data.plans);
      }
    } else {
      console.log('error in get Plans ');
    }
    setGoForGetApiCall(false);
  }, [getPlans.loading]);

  const planSelected = () =>{
    if(selectedOption === null){
      SimpleToast.show('Please Select at least one option')
    }
    else{
      navigation.navigate(AUTH.ALLOCATIONS, {
        name: name,
        email: email,
        phone: phone,
        web: web,
        linked: linked,
        bio: bio,
        insta: insta,
        facebook: facebook,
        selected: selected,
        id: selectedOption,
        logo:logo,
      })
    }
  }

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]}>
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
      <ScrollView>
        <View style={{marginBottom: 10}}>
          <Text regular appPrimary body1 style={{lineHeight: 21}}>
            2/5 step
          </Text>
        </View>
        <View styel={{marginBottom: 16}}>
          <Text regular blackColor heading2 style={{lineHeight: 31}}>
            Select contract plan
          </Text>
        </View>
        {/* <Plan options={options}/> */}
        {options && options.length > 0 ? (
          <Plan options={options} onSelectOption={setSelectedOption} />
        ) : (
          <Text>No data available</Text>
        )}

        {/* {selectedOption && ( // Display the selected option if it exists
          <Text>{selectedOption.description}</Text>
        )} */}
      </ScrollView>
      <View
        style={{
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
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
          onPress={planSelected}
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
export default SelectPlan;
