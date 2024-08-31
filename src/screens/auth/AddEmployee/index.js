//import liraries
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, Pressable, TouchableOpacity} from 'react-native';
import {
  Button,
  CustomTextInput,
  SimpleDropDown,
  Text,
} from '../../../components';
import {BaseStyle} from '../../../config/styles';
import {
  Call,
  DirectoryArrrowDown,
  Email,
  InfoCircle,
  Left,
  OpenEye,
} from '../../../assets';
import {useTheme} from '../../../config/theme';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import SelectDropdown from 'react-native-select-dropdown';
import SimpleToast from 'react-native-simple-toast';
import { AUTH } from '../../../navigation/ROUTES';

// create a component
const AddEmployee = ({navigation}) => {
  const [fname, setfName] = useState('');
  const [lname, setlName] = useState('');
  const [email, setEmail] = useState('');
  const [profession, setProfession] = useState('');
  const [phone, setPhone] = useState('');
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyData, setCompnayData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [goForAddEmployee, setgoForAddEmployee] = useState(false);
  const [visible, setVisible] = useState(false);
  const [companyId, setCompanyId] = useState('');
  const [selectedResources, setSelectedResources] = useState('');
  const [skip,setskip] = useState(1)
  const [limit,setLimit] = useState(10)
  const colors = useTheme();


  const DropdownRef = useRef();

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

      // 'profession.en':,
    },
    goForAddEmployee,
    userAccessToken,
  );

  useEffect(() => {
    if (!addEmployee.loading) {
      console.log('====================================');
      console.log(addEmployee.response?.status);
      console.log('====================================');
      if (addEmployee.response?.status === 200) {
        console.log('====================================');
        console.log(addEmployee.response);
        console.log('====================================');
        onSuccessApi(addEmployee?.response);
        navigation.navigate(AUTH.HOME);
      }
    } else {
      console.log('error occured in signin api call');
    }
    setgoForAddEmployee(false);
  }, [addEmployee.loading]);

  const onSuccessApi = async response => {
    console.log('Success:', response);
    SimpleToast.show('Employee Added');
   
  };

  /**
   * function called onpress of login
   */
  const savePressed = () => {
    // setLoading(true);
    setgoForAddEmployee(true);
  };

  const options = [
    {id: 1, label: 'Option 1'},
    {id: 2, label: 'Option 2'},
    {id: 3, label: 'Option 3'},
    {id: 3, label: 'Option 3'},
    {id: 3, label: 'Option 3'},
  ];

  const onSelectOption = option => {
    console.log('Selected option:', option);
  };

  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetApiCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      console.log('====================================');
      // console.log(getComapny.response?.data);
      console.log('====================================');
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // Append the newly loaded data to the existing companyData array
        setCompnayData(prevData => [...prevData, ...getComapny.response?.data?.docs]);

        setskip(skip + 1);
      }
    } else {
      console.log('error in All users');
    }
    setGoForGetApiCall(false);
  }, [getComapny.loading]);
  


  const loadMoreData = () => {
   setGoForGetApiCall(true);
  };
  

  // const clearfilter = () =>{
  //   setSelectedOption(null); // Update this line
  // setCompanyId('');
  // setSelectedResources('');
  // setVisible(false);
  // console.log('====================================');
  // console.log(selectedOption);
  // console.log('====================================');
  // DropdownRef.current.reset();
  // }



  return (
    <View style={[BaseStyle.container, BaseStyle.safeAreaView]}>
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
          {`Add Employee`}
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
          // ref={DropdownRef}
          onScrollEndReached={loadMoreData}
          // defaultValueByIndex={1}
          // defaultValue={{
          //   title: 'England',
          //   image: require('./Images/England.jpg'),
          // }}
          onSelect={(selectedItem, index) => {
            // console.log(selectedItem.resources, index, 'dsaasdasss');
            setskip(1);

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
        {/* <View>
          <Button
          onPress={clearfilter}
          />
        </View> */}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <Button
          buttonStyle={{flex: 0.42}}
          title={`Back`}
          
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
export default AddEmployee;
