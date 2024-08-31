//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {
  Add,
  Call,
  DirectoryArrrowDown,
  Email,
  Facebook,
  Instagram,
  Left,
  LinkedinLogo,
  Web,
} from '../../../assets';
import {
  Button,
  CustomTextInput,
  SimpleDropDown,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {AUTH} from '../../../navigation/ROUTES';
import SelectDropdown from 'react-native-select-dropdown';
import {API, useFetchGet} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {launchImageLibrary} from 'react-native-image-picker';
import SimpleToast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';

// create a component
const AddCompany = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [web, setWeb] = useState('');
  const [linked, setLinked] = useState('');
  const [bio, setBio] = useState('');
  const [insta, setInsta] = useState('');
  const [facebook, setFacebook] = useState('');
  const [selected, setSelected] = useState('');
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyCategories, setCompnayCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [logo, setlogo] = useState('');
  const focused = useIsFocused();

  const openGallery = async () => {
    const images = await launchImageLibrary(options);
    setlogo(images);
    console.log(images);
    setSelectedImage(images.assets[0].uri);
  };

  const options = {
    mediaType: 'photo',
    quality: 0.7,
    // maxWidth: 200,
    // maxHeight: 200,
  };
  console.log('====================================Seleected');
  console.log(selected);
  console.log('====================================');
  const colors = useTheme();

  // const options = [
  //   {id: 1, label: 'Information Technology'},
  //   {id: 2, label: 'Engineering'},
  //   {id: 3, label: 'Computer Science'},
  // ];

  const onSelectOption = option => {
    console.log('Selected option:', option);
    setSelected(option.label);
  };

  const nextPressed = () => {
    if (logo === '') {
      SimpleToast.show('Please set the Company logo');
    } else if (name === '') {
      SimpleToast.show('Company Name is Required');
    } else {
      navigation.navigate(AUTH.SELECTPLAN, {
        name: name,
        email: email,
        phone: phone,
        web: web,
        linked: linked,
        bio: bio,
        insta: insta,
        facebook: facebook,
        selected: selected,
        logo: logo,
      });
    }
  };

  useEffect(() => {
    setName('');
    setEmail('');
    setPhone('');
    setWeb('');
    setLinked('');
    setBio('');
    setInsta('');
    setFacebook('');
    setSelected(''), setSelectedImage(null);
    console.log('done');
  }, [focused]);

  const getComapnyCategories = useFetchGet(
    API.COMPANY_CATEGORIES,
    goForGetApiCall,
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
        setCompnayCategories(getComapnyCategories.response?.data?.categories);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForGetApiCall(false);
  }, [getComapnyCategories.loading]);

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]}>
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
        <ScrollView>
          <View style={{marginBottom: 10}}>
            <Text regular appPrimary body1 style={{lineHeight: 21}}>
              1/5 step
            </Text>
          </View>
          <View styel={{marginBottom: 16}}>
            <Text regular blackColor heading2 style={{lineHeight: 31}}>
              General Details
            </Text>
          </View>
          <CustomTextInput
            placeholder="Name"
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
              marginTop: 14,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16}}
            onChangeText={setName}
            value={name}
          />
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
              marginBottom: 18,
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
            onChangeText={setPhone}
            placeholder="Phone Number"
            value={phone}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16}}
            icon={
              <View style={styles.eyeBtn}>
                <Call />
              </View>
            }
          />
          <CustomTextInput
            onChangeText={setWeb}
            placeholder="Website Link (optional)"
            value={web}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16}}
            icon={
              <View style={styles.eyeBtn}>
                <Web />
              </View>
            }
          />
          {/* <SimpleDropDown
          options={options}
          onSelect={onSelectOption}
          mainText={`Select company category (optional)`}
          mainStyle={{marginBottom: 8, zIndex: 10}}
        /> */}
          <SelectDropdown
            data={companyCategories}
            // defaultValueByIndex={1}
            // defaultValue={{
            //   title: 'England',
            //   image: require('./Images/England.jpg'),
            // }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index, 'dsaasdasss');
              setSelected(selectedItem);
            }}
            // buttonTextAfterSelection={(selectedItem, index) => {
            //   return selectedItem;
            // }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
            }}
            buttonStyle={{
              width: '100%',
              marginBottom: 8,
              backgroundColor: `rgba(250, 250, 250, 1)`,
              borderWidth: 1,
              borderColor: 'rgba(233, 234, 233, 1)',
              marginBottom: 18,
              paddingHorizontal: 10,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'rgba(250, 250, 250, 1)',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedItem ? 'black' : colors.secondaryColor,
                    }}>
                    {selectedItem
                      ? selectedItem
                      : 'Select company category (optional)'}
                  </Text>
                  <DirectoryArrrowDown width={20} height={20} />
                </View>
              );
            }}
            // dropdownStyle={styles.dropdown3DropdownStyle}
            // rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 16,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          <CustomTextInput
            onChangeText={setLinked}
            placeholder="LinkedIn (optional)"
            value={linked}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16}}
            icon={
              <View style={styles.eyeBtn}>
                <LinkedinLogo />
              </View>
            }
          />
          <CustomTextInput
            onChangeText={setBio}
            placeholder="Bio (optional)"
            value={bio}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28}}
          />
          {/* <CustomTextInput
            onChangeText={setInsta}
            placeholder="Bio (optional)"
            value={insta}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28, height: 200}}
            icon={
              <View style={styles.eyeBtn}>
                <Instagram />
              </View>
            }
          /> */}
           <CustomTextInput
            onChangeText={setInsta}
            placeholder="Instagram (optional)"
            value={insta}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28}}
            icon={
              <View style={styles.eyeBtn}>
                <Instagram />
              </View>
            }
          />
          <CustomTextInput
            onChangeText={setFacebook}
            placeholder="Facebook (optional)"
            value={facebook}
            maxLength={50}
            mainStyle={{
              borderWidth: 1,
              height: 56,
              borderColor: colors.textGreyDark,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              marginBottom: 18,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28}}
            icon={
              <View style={styles.eyeBtn}>
                <Facebook />
              </View>
            }
          />
          <View style={{marginBottom: 30}}>
            <Text regular body2 style={{lineHeight: 18}}>
              Upload company Logo
            </Text>
            {selectedImage ? (
              <TouchableOpacity
                onPress={openGallery}
                style={{height: 83, width: '100%'}}>
                <Image
                  source={{uri: selectedImage}}
                  style={{height: 83, width: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  height: 83,
                  borderWidth: 1,
                  marginHorizontal: 25,
                  backgroundColor: colors.appPrimaryLight,
                  borderStyle: 'dashed',
                  borderColor: colors.appPrimary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={openGallery}>
                <Add />
                <Text
                  style={{marginTop: 10, lineHeight: 28}}
                  regular
                  body2
                  appPrimary>
                  Company Logo
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              marginBottom: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
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
              onPress={nextPressed}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default AddCompany;
