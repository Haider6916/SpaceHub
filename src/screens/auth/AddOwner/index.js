//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import {
  Button,
  CustomTextInput,
  SimpleDropDown,
  Text,
} from '../../../components';
import {BaseStyle} from '../../../config/styles';
import {Call, Email, InfoCircle, Left} from '../../../assets';
import {useTheme} from '../../../config/theme';
import {AUTH} from '../../../navigation/ROUTES';
import {API, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import axios from 'axios';
import SimpleToast from 'react-native-simple-toast';

// create a component
const AddOwner = ({navigation, route}) => {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [routename, setrouteName] = useState(route?.params?.name);
  const [routeemail, setrouteEmail] = useState(route?.params?.email);
  const [routephone, setroutePhone] = useState(route?.params?.phone);
  const [web, setWeb] = useState(route?.params?.web);
  const [selected, setSelected] = useState(route?.params?.selected);
  const [linked, setLinked] = useState(route?.params?.linked);
  const [bio, setBio] = useState(route?.params?.bio);
  const [insta, setInsta] = useState(route?.params?.insta);
  const [facebook, setFacebook] = useState(route?.params?.facebook);
  const [id, setId] = useState(route?.params?.id);
  const [resources, setResources] = useState(route?.params?.resources);
  const [goForAddCompany, setgoForAddCompany] = useState(false);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [logo, setLogo] = useState(route?.params?.logo);
  const [authtoken, setauthtoken] = useState(userAccessToken);
  console.log('====================================token');
  console.log(authtoken);
  console.log('====================================');
  const companyOwner = {
    firstName: {
      en: fname, // Set the value of firstName.en to the fname state
    },
    lastName: {
      en: lname, // Set the value of lastName.en to the lname state
    },
    email: email,
    phoneNumber: phone,
    profession: {
      en: 'CEO', // Set the English value of the profession field
      ar: 'arabic', // Set the Arabic value of the profession field
    },
  };

  console.log('====================================');
  console.log(routename, 'nameeeeeee');
  console.log(routeemail, 'nameeeeeee');
  console.log(routephone, 'nameeeeeee');
  console.log(web, 'nameeeeeee');
  console.log(selected, 'nameeeeeee');
  console.log(linked, 'nameeeeeee');
  console.log(bio, 'nameeeeeee');
  console.log(insta, 'nameeeeeee');
  console.log(facebook, 'nameeeeeee');
  console.log(id, 'sadasdss');
  console.log(resources, 'sadsd');
  console.log(logo, 'logo');
  console.log('====================================');

  const colors = useTheme();
  const formdata = new FormData();
  formdata.append('name', routename);
  formdata.append('email', routeemail);
  formdata.append('phone', routephone);
  formdata.append('category', selected);
  formdata.append('website', web);
  formdata.append('instagram', insta);
  formdata.append('linkedin', linked);
  formdata.append('facebook', facebook);
  formdata.append('plan', id);
  formdata.append('companyOwner', JSON.stringify(companyOwner));
  resources.forEach(value => {
    formdata.append('resources', value);
  });
  formdata.append('logo', {
    uri: logo.assets[0].uri,
    type: logo.assets[0].type,
    name: logo.assets[0].fileName,
  });

  // /** api call for signin */
  // const addCompany = useFetchPost(
  //   API.CREATE_COMPANY,
  //   {
  //     name: routename,
  //     bio: bio,
  //     email:routeemail,
  //     phone:routephone,
  //     category:selected,
  //     website:web,
  //     instagram:insta,
  //     linkedin:linked,
  //     facebook:facebook,
  //     logo:'',
  //     resources:resources,
  //     plan:id,
  //     companyOwner:companyOwner
  //   },
  //   goForAddCompany,
  //   userAccessToken,
  // );

  // useEffect(() => {
  //   if (!addCompany.loading) {
  //     console.log('====================================');
  //     console.log(addCompany?.response);
  //     console.log('====================================');
  //     if (addCompany.response?.status === 201) {
  //       onSuccessApi(addCompany?.response);
  //       // navigation.navigate(AUTH.ADDCEMPLOYEE);
  //       navigation.navigate(AUTH.ADDCEMPLOYEE,{
  //         name:routename,
  //       });
  //     }
  //   } else {
  //     console.log('error occured in signin api call');
  //   }
  //   setgoForAddCompany(false);
  // }, [addCompany.loading]);

  // const onSuccessApi = async response => {
  //   savePressed()
  // };

  /**
   * function called onpress of login
   */
  const savePressed = () => {
    postData();
  };

  const postData = () => {
    axios
      .post(
        'https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/company',
        formdata,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: authtoken,
          },
        },
      )
      .then(res => {
        console.log('api', res);
        console.log('id', res?.data?._id);
          navigation.navigate(AUTH.ADDCEMPLOYEE, {
            name: routename,
            id: res?.data?._id,
          });
      })
      .catch(error => {
        console.log('api error', error.response.data.error.message);
        if(fname === '') {
          SimpleToast.show('First name is required')
        }
        else if(lname === ''){
          SimpleToast.show('Last name is required')
        }
        else if (email === ''){
          SimpleToast.show('Email is required')
        }
        else if (phone === ''){
          SimpleToast.show('Phone number is required')
        }
      });
  };

  return (
    <View style={[BaseStyle.container, BaseStyle.safeAreaView]}>
      <View
        style={{
          marginTop: 40,
          // alignItems: 'center',
          marginBottom: 24,
        }}>
        <TouchableOpacity
          style={{flex: 0.3}}
          onPress={() => navigation.goBack()}>
          <Left />
        </TouchableOpacity>
      </View>
      <View>
      <View style={{marginBottom: 10,marginTop:10}}>
          <Text regular appPrimary body1 style={{lineHeight: 21}}>
            4/5 step
          </Text>
        </View>
      <Text regular heading2 style={{lineHeight: 31,marginBottom:10}}>
          {`Add Space Owner`}
        </Text>
      </View>
      <View style={{flex: 0.95}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <CustomTextInput
            placeholder="First Name"
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 16,
              flex: 0.45,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16}}
            onChangeText={setfName}
            value={fname}
          />
          <CustomTextInput
            placeholder="Last Name"
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 16,
              flex: 0.45,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16}}
            onChangeText={setlName}
            value={lname}
          />
        </View>
        <CustomTextInput
          onChangeText={setEmail}
          placeholder="Email"
          value={email}
          maxLength={50}
          mainStyle={{
            borderWidth: 1,
            height: 56,
            borderColor: colors.textGreyDark,
            backgroundColor: 'rgba(250, 250, 250, 1)',
            marginBottom: 16,
          }}
          placeholderTextColor={colors.secondaryColor}
          inpStyle={{fontSize: 16}}
          icon={
            <View style={styles.eyeBtn}>
              <Email />
            </View>
          }
        />
        <CustomTextInput
          onChangeText={setProfession}
          placeholder="Profession (Optional)"
          value={profession}
          maxLength={50}
          mainStyle={{
            borderWidth: 1,
            height: 56,
            borderColor: colors.textGreyDark,
            backgroundColor: 'rgba(250, 250, 250, 1)',
            marginBottom: 16,
          }}
          placeholderTextColor={colors.secondaryColor}
          inpStyle={{fontSize: 16}}
          icon={
            <View style={styles.eyeBtn}>
              <InfoCircle />
            </View>
          }
        />
        <CustomTextInput
          onChangeText={setPhone}
          placeholder="Phone Number"
          maxLength={50}
          value={phone}
          mainStyle={{
            borderWidth: 1,
            height: 56,
            borderColor: colors.textGreyDark,
            backgroundColor: 'rgba(250, 250, 250, 1)',
            marginBottom: 16,
          }}
          placeholderTextColor={colors.secondaryColor}
          inpStyle={{fontSize: 16}}
          icon={
            <Pressable style={styles.eyeBtn}>
              <Call />
            </Pressable>
          }
        />
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          buttonStyle={{flex: 0.42}}
          title={`Back`}
          onPress={() => navigation.goBack()}
        />
        <Button
          buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
          title={`Save`}
          textStyles={{color: colors.whiteBackground}}
          onPress={savePressed}
        />
      </View>
    </View>
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
export default AddOwner;
