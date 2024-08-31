//import liraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { API, useFetchGet, useFetchPut } from '../../../services';
import { GeneralResponses } from '../../../services/responses';
import SimpleToast from 'react-native-simple-toast';
import { useTheme } from '../../../config/theme';
import { Button, CustomTextInput } from '../../../components';
import SelectDropdown from 'react-native-select-dropdown';
import { Call, DirectoryArrrowDown, Email, InfoCircle, Left } from '../../../assets';
import { TouchableOpacity } from 'react-native';
import { Text } from '../../../components';
import { useIsFocused } from '@react-navigation/native';
import { AUTH } from '../../../navigation/ROUTES';

// create a component
const UpdateEmployee = ({navigation,route}) => {
    const isFFoused = useIsFocused()
    const data = route?.params?.data;
    const [fname, setfName] = useState(data?.firstName?.en);
    const [lname, setlName] = useState(data?.lastName?.en);
    const [email, setEmail] = useState(data?.email);
    const [profession, setProfession] = useState(data?.profession?.en);
    const [phone, setPhone] = useState(data?.phoneNumber);
    const userAccessToken = useSelector(state => state.user.userAccessToken);
    const [companyData, setCompnayData] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);
    const [goForUpdateEmployee, setgoForUpdateEmployee] = useState(false);
    const [goForGetApiCall, setGoForGetApiCall] = useState(true);
    const [companyId, setCompanyId] = useState(data?.company?._id);
    const [selectedResources, setSelectedResources] = useState(
      data?.allocation?._id,
    );

    const colors = useTheme();

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

  const updateEmployee = useFetchPut(
    API.UPDATE_USER + `${data._id}`,
    {
      'firstName.en': fname,
      'lastName.en': lname,
      'profession.en': profession,
      email: email,
      phoneNumber: phone,
      company: companyId,
      allocation: selectedResources,
    },
    goForUpdateEmployee,
    userAccessToken,
  );

  /** response of api call for update */
  useEffect(() => {
    if (!updateEmployee.loading) {
      console.log('====================================');
      console.log(updateEmployee.response);
      console.log('====================================');
      if (updateEmployee.response?.status === GeneralResponses.STATUS_OK.CODE) {
        console.log('====================================hit');
        console.log(updateEmployee.response);
        console.log('====================================');
        // setIsError(false);
        onSuccessApi(updateEmployee?.response);
      }
    } else {
      console.log('error occured in update api call');
    }
    setgoForUpdateEmployee(false);
  }, [updateEmployee.loading]);

  /**
   * method on success of api
   * @param {*} updateEmployee api response
   */
  const onSuccessApi = addAddressApi => {
    SimpleToast.show('Updated', SimpleToast.SHORT);
    navigation.goBack('directory');
  };

  /**
   * Method Called onpress of Save Address
   */
  const updatePressed = async () => {
    setgoForUpdateEmployee(true);
    
  };

  const backPressed = () =>{
    navigation.goBack();
  }
    
    return (
        <View style={styles.container}>
              <View
        style={{
          marginTop: 40,
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 24,
        }}>
        <TouchableOpacity
          style={{flex: 0.3}}
          onPress={() => navigation.goBack()}>
          <Left />
        </TouchableOpacity>
        <Text regular heading2 style={{lineHeight: 31}}>
          {`Update Employee`}
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
            icon={ <Call />}
          />
          {/* <SimpleDropDown
          options={options}
          onSelect={onSelectOption}
          mainText={`Select company`}
          mainStyle={{marginBottom: 14, zIndex: 20}}
        /> */}
          <SelectDropdown
            data={companyData}
            //   defaultValue={data?.company?.name }
            // defaultValueByIndex={1}
            // defaultValue={{
            //   title: 'England',
            //   image: require('./Images/England.jpg'),
            // }}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem.resources, index, 'dsaasdasss');
              setSelectedOption(selectedItem.resources);
              setCompanyId(selectedItem._id);
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
                      color: 'black',
                    }}>
                    {selectedItem ? selectedItem.name : data?.company?.name}
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
                      color: 'black',
                    }}>
                    {selectedItem
                      ? selectedItem.name
                      : data?.allocation[0]?.name}
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
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            buttonStyle={{flex: 0.42}}
            title={`Back`}
            onPress={backPressed}
          />
          <Button
            buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
            title={`Update`}
            textStyles={{color: colors.whiteBackground}}
            onPress={updatePressed}
          />
        </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal:24,
        backgroundColor:'white',
    },
});

//make this component available to the app
export default UpdateEmployee;
