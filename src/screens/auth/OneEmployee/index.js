//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {
  Call,
  DirectoryArrrowDown,
  Email,
  InfoCircle,
  Left,
} from '../../../assets';
import {
  BiggerCheckBox,
  Button,
  Checkbox,
  CustomTextInput,
  SimpleDropDown,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import {GeneralResponses} from '../../../services/responses';
import { AUTH } from '../../../navigation/ROUTES';

// create a component
const OneEmployee = ({navigation,route}) => {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState(name);
  const colors = useTheme();
 const name = route?.params?.name;
console.log('====================================');
console.log(name);
console.log('====================================');
  const [goForAddEmployee, setgoForAddEmployee] = useState(false);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [companyData, setCompnayData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [visible, setVisible] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [selectedResources, setSelectedResources] = useState('');
  const [Checked, setChecked] = useState(true);

    /** api call for signin */
    const addEmployee = useFetchPost(
      API.COMPANY_EMPLOYEE,
      {
        'firstName.en': fname,
        'lastName.en': lname,
        email: email,
        phoneNumber: phone,
        company: companyId,
        resources: selectedResources,
        'profession.en':profession,
      },
      goForAddEmployee,
      userAccessToken,
    );
  
    useEffect(() => {
      if (!addEmployee.loading) {
        console.log('====================================');
        console.log(addEmployee?.response);
        console.log('====================================');
        if (addEmployee.response?.status === 200) {
            onSuccessApi(addEmployee?.response);
            
        }
      } else {
        console.log('error occured in signin api call');
      }
      setgoForAddEmployee(false);
    }, [addEmployee.loading]);
  
    const onSuccessApi = async response => {
      if (Checked) {
        navigation.replace(AUTH.ONEEMPLOYEEE);
      } else {
        navigation.navigate(AUTH.ADDCEMPLOYEE);
      }
      savePressed();
    };
  
    /**
     * function called onpress of login
     */
    const savePressed = () => {
      // setLoading(true);
      setgoForAddEmployee(true);
    };

  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      console.log('====================================');
      // console.log(getComapny.response?.data);
      console.log('====================================');
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setCompnayData(getComapny.response?.data?.docs);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForGetApiCall(false);
  }, [getComapny.loading]);

  const options = [
    {id: 1, label: 'Option 1'},
    {id: 2, label: 'Option 2'},
    {id: 3, label: 'Option 3'},
  ];

  const onSelectOption = option => {
    console.log('Selected option:', option);
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
        <View style={{marginBottom: 26}}>
          <Text regular blackColor heading2 style={{lineHeight: 31}}>
            Add employee
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
              inpStyle={{fontSize: 16, lineHeight: 28}}
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
              inpStyle={{fontSize: 16, lineHeight: 28}}
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
            inpStyle={{fontSize: 16, lineHeight: 28}}
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
            inpStyle={{fontSize: 16, lineHeight: 28}}
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
            inpStyle={{fontSize: 16, lineHeight: 28}}
            icon={
              <Pressable style={styles.eyeBtn}>
                <Call />
              </Pressable>
            }
          />
          {/* <SimpleDropDown
            options={options}
            onSelect={onSelectOption}
            mainText={`Select company`}
            mainStyle={{marginBottom: 14, zIndex: 20}}
          /> */}
          <SelectDropdown
            data={companyData}
            // defaultValueByIndex={1}
            // defaultValue={{
            //   title: 'England',
            //   image: require('./Images/England.jpg'),
            // }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem.resources, index, 'dsaasdasss');
              setSelectedOption(selectedItem.resources);
              setCompanyId(selectedItem._id);
              setVisible(true);
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
              marginBottom: 16,
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
                      color: selectedItem ? 'black' : colors.secondaryColor,
                    }}>
                    {selectedItem ? selectedItem.name : 'Select Company'}
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
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
          {/* <SimpleDropDown
            options={options}
            onSelect={onSelectOption}
            mainText={`Assign resources`}
            mainStyle={{zIndex: 10}}
          /> */}
          {visible ? (
            <SelectDropdown
              data={selectedOption}
              // defaultValueByIndex={1}
              // defaultValue={{
              //   title: 'England',
              //   image: require('./Images/England.jpg'),
              // }}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index, 'dsaasdasss');
                setSelectedResources(selectedItem._id);
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
                marginBottom: 16,
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
                        color: selectedItem ? 'black' : colors.secondaryColor,
                      }}>
                      {selectedItem ? selectedItem.name : 'Assign Resources'}
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
                      {item.name}
                    </Text>
                  </View>
                );
              }}
            />
          ) : (
            <></>
          )}
          <View style={{marginTop: 21}}>
            <BiggerCheckBox  checked={Checked} onChecked={setChecked}/>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 14,
        }}>
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
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default OneEmployee;
