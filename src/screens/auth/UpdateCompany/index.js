//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {API, useFetchGet} from '../../../services';
import axios from 'axios';
import {ScrollView} from 'react-native';
import {
  AllocationCheck,
  Button,
  CustomTextInput,
  Plan,
  Text,
} from '../../../components';
import {
  Add,
  Call,
  DirectoryArrrowDown,
  Email,
  Facebook,
  InfoCircle,
  Instagram,
  LinkedinLogo,
  Web,
} from '../../../assets';
import SelectDropdown from 'react-native-select-dropdown';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import {useTheme} from '../../../config/theme';
import {launchImageLibrary} from 'react-native-image-picker';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import {BaseStyle} from '../../../config/styles';
import {styles} from './styles';

// create a component
const UpdateCompany = ({navigation, route}) => {
  const data = route?.params?.data;
  const [fname, setfName] = useState(data?.firstName?.en);
  const [lname, setlName] = useState(data?.lastName?.en);
  //   const [email, setEmail] = useState(data?.email);
  const [profession, setProfession] = useState(data?.profession?.en);
  //   const [phone, setPhone] = useState(data?.phoneNumber);
  //   const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyData, setCompnayData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [goForUpdateEmployee, setgoForUpdateEmployee] = useState(false);
  //   const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [companyId, setCompanyId] = useState(data?.company?._id);
  const [selectedResources, setSelectedResources] = useState(
    data?.allocation?._id,
  );
  //   const [name, setName] = useState('');
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
  const colors = useTheme();

  console.log('====================================data');
  console.log(data._id);
  console.log('====================================');

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

  /**Get all company */
  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setCompnayData(getComapny.response?.data?.docs);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForGetApiCall(false);
  }, [getComapny.loading]);

  useEffect(() => {
    setfName(ownerFirstName);
    setlName(ownerLastName);
    setEmail(data?.email);
    setProfession(data?.profession?.en);
    setPhone(data?.phone);
    setName(data?.name);
    setWeb(data?.website);
    setLinked(data?.linkedin);
    setBio(data?.bio);
    setInsta(data?.instagram);
    setFacebook(data?.facebook);
    setSelectedImage(data?.logo);
    setSelectedPlanOption(data?.plan._id);
    setfEmail(owneereemail);
    setfPhone(ownerphone);
    setfProfession(ownerProofesion);
  }, []);

  const postData = () => {
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/company/${data._id}`,
        {
          name: name,
          email: email,
          phone: phone,
          bio: bio,
          website: web,
          instagram: insta,
          linkedin: linked,
          facebook: facebook,
          plan: selectedPlanOption,
          category: selected,
          resources: checkedData,
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
        SimpleToast.show('Updated');
        setStep(1);
      })
      .catch(error => {
        console.log('api error', error.response.data.error.message);
        console.log('====================================');
        console.log('error');
        console.log('====================================');
      });
  };

  const updatePressed = async () => {
    postData();
    navigation.goBack(); 
    // setgoForUpdateEmployee(true);
  };

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      console.log('====================================');
      console.log('Invalid');
      console.log('====================================');
    }
  };

  const resetModal = () => {
    setStep(1);
  };

  const companyOwner = data?.employees?.find(
    employee => employee.role === 'company_owner',
  );
  const ownerFirstName = companyOwner?.firstName.en;
  const ownerLastName = companyOwner?.lastName.en;
  const owneereemail = companyOwner?.email;
  const ownerProofesion = companyOwner?.profession.en;
  const ownerphone = companyOwner?.phoneNumber;
  const companyOwnerName = `${ownerFirstName} ${ownerLastName}`;

  console.log(
    'Company Owner Name:',
    companyOwnerName,
    owneereemail,
    ownerProofesion,
    ownerphone,
  );

  /** Plan Api */
  const [planoptions, setplanOptions] = useState([]);
  const [selectedPlanOption, setSelectedPlanOption] = useState(null);
  const [goForPlanGetApiCall, setGoForGetPlanApiCall] = useState(true);
  const getPlans = useFetchGet(
    API.GET_PLANS,
    goForPlanGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Plans screen data */
  useEffect(() => {
    if (!getPlans.loading) {
      console.log(getPlans?.response);
      if (getPlans?.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setplanOptions(getPlans.response.data.plans);
      }
    } else {
      console.log('error in get Plans ');
    }
    setGoForGetPlanApiCall(false);
  }, [getPlans.loading]);

  /** Allocations */
  const [allocationdata, setallocationdata] = useState([]);
  const [checkedData, setCheckedData] = useState([]);
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
        setallocationdata(getResources.response?.data?.docs);
        // console.log(getResources?.response?.data?.docs);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setGoForGetApiCall(false);
  }, [getResources.loading]);

  const handleCheckedData = (isChecked, id) => {
    if (isChecked) {
      // Add the ID to the checkedData
      setCheckedData(prevData => [...prevData, id]);
    } else {
      // Remove the ID from the checkedData
      setCheckedData(prevData => prevData.filter(item => item !== id));
    }
  };

  /** Ownwer */
  const [femail, setfEmail] = useState('');
  const [fphone, setfPhone] = useState('');
  const [fprofession, setfProfession] = useState('');
  const [goForcompanyGetApiCall, setgoForcompanyGetApiCall] = useState(true);

  const getComapnyCategories = useFetchGet(
    API.COMPANY_CATEGORIES,
    goForcompanyGetApiCall,
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
    setgoForcompanyGetApiCall(false);
  }, [getComapnyCategories.loading]);

  return (
    <View style={styles.container}>
      {step === 1 && (
        <ScrollView style={{flex:1,marginTop:30}}>
          <View style={{marginBottom: 10}}>
            <Text regular appPrimary body1 style={{lineHeight: 21}}>
              1/4 step
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
              marginBottom: 8,
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
              marginBottom: 8,
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
              marginBottom: 8,
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
              marginBottom: 8,
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
              borderRadius: 8,
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
                      color: 'black',
                    }}>
                    {selectedItem ? selectedItem : data?.category}
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
              marginBottom: 8,
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
              marginBottom: 8,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28}}
          />
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
              marginBottom: 8,
            }}
            placeholderTextColor={colors.secondaryColor}
            inpStyle={{fontSize: 16, lineHeight: 28, height: 200}}
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
              marginBottom: 11,
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
              title="Cancel"
              buttonStyle={{flex: 0.4}}
              onPress={() => navigation.goBack()}
            />
            <Button
              title="Next"
              buttonStyle={{flex: 0.4, backgroundColor: colors.appPrimary}}
              textStyles={{color: colors.whiteBackground}}
              onPress={handleNextStep}
            />
          </View>
        </ScrollView>
      )}
      {step === 2 && (
        <SafeAreaView style={[BaseStyle.safeAreaView,{marginTop:30}]}>
          <View style={{paddingHorizontal: 24, flex: 1}}>
            <ScrollView>
              <View style={{marginBottom: 10}}>
                <Text regular appPrimary body1 style={{lineHeight: 21}}>
                  2/4 step
                </Text>
              </View>
              <View styel={{marginBottom: 16}}>
                <Text regular blackColor heading2 style={{lineHeight: 31}}>
                  Select contract plan
                </Text>
              </View>
              {/* <Plan options={options}/> */}
              {planoptions && planoptions.length > 0 ? (
                <Plan
                  options={planoptions}
                  onSelectOption={optionId => setSelectedPlanOption(optionId)}
                  selectedOptionId={selectedPlanOption}
                />
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
                onPress={() => setStep(1)}
              />
              <Button
                title="Next"
                buttonStyle={{flex: 0.4, backgroundColor: colors.appPrimary}}
                textStyles={{color: colors.whiteBackground}}
                onPress={handleNextStep}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
      {step === 3 && (
        <View style={{flex: 1,marginTop:30}}>
          <ScrollView>
            <View style={{marginBottom: 10}}>
              <Text regular appPrimary body1 style={{lineHeight: 21}}>
                3/4 step
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
              data={allocationdata}
              keyExtractor={(item, index) => item._id || index.toString()}
              numColumns={2}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                marginTop: 10,
              }}
              renderItem={({item, index}) => {
                const ids = data?.resources.map(item => item._id);
                console.log(ids);
                // const selectedIds = apiSelectedIds.includes(item._id) ? [item._id] : [];
                // console.log(data?.resources,'asdasdasdasdiIIDDDD');
                return (
                  <AllocationCheck
                    // image={{uri:item?.images}}
                    id={item._id}
                    DeskName={item?.name}
                    Capacity={`Capacity ${item?.capacity}`}
                    FlooNumber={`Floor number ${item?.floorNumber}`}
                    onCheckedData={handleCheckedData}
                    selectedIds={ids}
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
              onPress={() => setStep(2)}
            />
            <Button
              title="Next"
              buttonStyle={{flex: 0.4, backgroundColor: colors.appPrimary}}
              textStyles={{color: colors.whiteBackground}}
              // onPress={() => navigation.navigate(AUTH.ADDCEMPLOYEE)}
              onPress={updatePressed}
            />
          </View>
        </View>
      )}
    </View>
  );
};


//make this component available to the app
export default UpdateCompany;
