//import liraries
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Button,
  CustomTextInput,
  SimpleDropDown,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {
  DirectoryArrrowDown,
  DummyImg,
  Email,
  InfoCircle,
  Left,
} from '../../../assets';
import {Calendar} from '../../../assets';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {useEffect} from 'react';
import {AUTH} from '../../../navigation/ROUTES';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleToast from 'react-native-simple-toast';

// create a component
const AddVisitors = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [visitDuration, setVisitDuration] = useState('');
  const [visitReason, setVisitReason] = useState('');
  const [goForAdd, setGoForAdd] = useState(false);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState('');

  const colors = useTheme();
  // const options = [
  //   {id: 1, label: 'Ahmed Emad (current user)',image:DummyImg},
  //   {id: 2, label: 'haider ',image:DummyImg},
  //   {id: 3, label: 'Ali ',image:DummyImg},
  //   {id: 4, label: 'Emad 4',image:DummyImg},
  //   {id: 4, label: 'Emad 4',image:DummyImg},
  //   {id: 4, label: 'Emad 4',image:DummyImg},
  //   {id: 4, label: 'Emad 4',image:DummyImg},
  //   {id: 4, label: 'Emad 4',image:DummyImg},
  //   {id: 4, label: 'Emad 4',image:DummyImg},

  // ];

  const [selectedOption, setSelectedOption] = useState('');

  // const onSelectOption = option => {
  //   console.log('Selected option:', option);
  //   setSelectedOption(option.id)
  // };

  const addVisitor = useFetchPost(
    API.ADD_VISTORS,
    {
      name: name,
      host: selectedOption,
      email: email,
      visitDuration: visitDuration,
      visitReason: visitReason,
    },
    goForAdd,
    userAccessToken,
  );

  useEffect(() => {
    if (!addVisitor.loading) {
      console.log('====================================');
      setError(addVisitor?.response?.data?.error?.message);
      console.log('====================================');
      if (addVisitor.response?.status === GeneralResponses.STATUS_OK.CODE) {
        onSuccessApi(addVisitor?.response);
        console.log(addVisitor?.response);
        navigation.navigate(AUTH.VISITORS);
      }
    } else {
      console.log(error);
      SimpleToast.show(error)
      // setError(addVisitor?.response)
    }
    setGoForAdd(false);
  }, [addVisitor.loading]);

  const onSuccessApi = async response => {
    savePress();
  };

  /**
   * function called onpress of login
   */
  const savePress = () => {
    setGoForAdd(true);
  };

  const getUser = useFetchGet(
    API.GET_ALLUSERS,
    goForGetApiCall,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getUser?.loading) {
      if (getUser?.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setUserData(getUser?.response?.data?.docs);
        console.log('====================================');
        console.log(getUser?.response?.data.docs?.length);
        console.log('====================================');
        setLoading(false);
      }
    } else {
      console.log('error in All users ');
    }
    setGoForGetApiCall(false);
  }, [getUser.loading]);

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex:1, paddingHorizontal: 24}}>
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
          {`Add Visitors`}
        </Text>
      </View>
      <View style={{flex: 0.95}}>
        <CustomTextInput
          placeholder="Name"
          mainStyle={{
            borderWidth: 1,
            height: 56,
            borderColor: colors.textGreyDark,
            backgroundColor: 'rgba(250, 250, 250, 1)',
            marginBottom: 16,
          }}
          placeholderTextColor={colors.secondaryColor}
          inpStyle={{fontSize: 16}}
          onChangeText={setName}
          value={name}
        />
        {/* <View>
        <SimpleDropDown
          options={options}
          onSelect={onSelectOption}
          mainText={`Host`}
          mainStyle={{marginBottom: 14, zIndex:30,}}
        //   btnStyle={{borderWidth:0}}
        />
        </View> */}
        <SelectDropdown
          data={userData}
          // defaultValueByIndex={1}
          // defaultValue={{
          //   title: 'England',
          //   image: require('./Images/England.jpg'),
          // }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index, 'dsaasdasss');
            setSelectedOption(selectedItem._id);
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
                {selectedItem && (
                  <Image
                    source={{uri: selectedItem.profilePicture}}
                    style={{width: 40, height: 40, borderRadius: 25}}
                  />
                )}

                <Text style={{fontSize: 16, color: 'rgba(125, 123, 124, 1)'}}>
                  {selectedItem
                    ? `${selectedItem.firstName.en} ${selectedItem.lastName.en}`
                    : 'Host'}
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
                <Image
                  source={{uri: item.profilePicture}}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 25,
                    marginLeft: 10,
                  }}
                />
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 16,
                  }}>{`${item.firstName.en} ${item.lastName.en}`}</Text>
              </View>
            );
          }}
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
          onChangeText={setVisitDuration}
          placeholder="Visit duration(maximum 14 hours)"
          value={visitDuration}
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
              <Calendar />
            </View>
          }
        />
        {/* <SimpleDropDown
          options={options}
          onSelect={onSelectOption}
          mainText={`Custom`}
          mainStyle={{marginBottom: 14, zIndex:20}}
        /> */}
        <CustomTextInput
          onChangeText={setVisitReason}
          placeholder="Add custom visit reason"
          value={visitReason}
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
          onPress={savePress}
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
export default AddVisitors;
