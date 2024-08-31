//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import {Close, DirectoryArrrowDown, Left, Pin} from '../../../assets';
import {Button, CustomTextInput, Text} from '../../../components';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '../../../config/theme';
import {useSelector} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import SimpleToast from 'react-native-simple-toast';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import {AUTH} from '../../../navigation/ROUTES';
import axios from 'axios';

// create a component
const AddTicket = ({navigation}) => {
  const [tite, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [releatedto, setReleatedTo] = useState([]);
  const [goToReleatedTo, setgoToReleatedTo] = useState(true);
  const [goforcreate, setGoForCreate] = useState(false);
  const [dropdown, setDropDown] = useState('');

  const colors = useTheme();

  const formdata = new FormData();
  formdata.append('title', tite);
  formdata.append('description', description);
  formdata.append('relatedTo', dropdown);
  selectedFiles?.forEach(value => {
    formdata.append('files', value);
  });

  // /** Create Ticket */
  // const addTicket = useFetchPost(
  //   API.CREATE_TICKET,
  //   {
  //     title: tite,
  //     description: description,
  //     files: selectedFiles,
  //     relatedTo: dropdown,
  //   },
  //   goforcreate,
  //   userAccessToken,
  // );

  // useEffect(() => {
  //   if (!addTicket.loading) {
  //     console.log('====================================');
  //     console.log(addTicket.response);
  //     console.log('====================================');
  //     if (addTicket.response?.status === 201) {
  //       console.log('====================================');
  //       console.log(addTicket.response);
  //       console.log('====================================');
  //       onSuccessApi(addTicket?.response);
  //       navigation.navigate(AUTH.SUPPORT);
  //     }
  //   } else {
  //     console.log('error occured in signin api call');
  //   }
  //   setGoForCreate(false);
  // }, [addTicket.loading]);

  // const onSuccessApi = async response => {
  //   console.log('Success:', response?.data?.doc?.attachments);
  //   SimpleToast.show('Ticket Created');
  // };

  /**
   * function called onpress of login
   */
  const savePressed = () => {
    // setLoading(true);
    // setGoForCreate(true);
    postData();
  };


  const postData = () => {
    console.log('Payload:', formdata);
    axios
      .post(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/ticket/`,
        formdata,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: userAccessToken,
          },
        },
      )
      .then(res => {
        console.log('api', res.data);
        SimpleToast.show('Ticket Created');
        navigation.navigate(AUTH.SUPPORT);
      })
      .catch(error => {
        // if (error.response && error.response.data) {
        //   console.log('api error', error.response.data.error);
        //   SimpleToast.show(String(error.response.data.error.message));
        // } else {
        //   console.log('Unknown error occurred:', error);
        // }
       SimpleToast.show(String(error.response.data.error.message));
       console.log('====================================');
       console.log(error);
       console.log('====================================');
      });
  };
  
  /** Releated To Api */
  const releateTo = useFetchGet(
    API.RELATED_TO,
    goToReleatedTo,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!releateTo.loading) {
      // console.log(myTickets.response?.data.docs,'dsd');
      if (releateTo.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setReleatedTo(releateTo.response?.data);
        // console.log(releateTo.response?.data);
        // setLoading(false);
        // (daysLeftText)
      }
    } else {
      console.log('error in get Announceement ');
    }
    setgoToReleatedTo(false);
  }, [releateTo.loading]);

  const selectFile = async () => {
    try {
        if (!selectedFiles) {
          setSelectedFiles([]);
        }
      if (selectedFiles.length >= 3) {
        // Display an error message or show a toast indicating the file limit has been reached
        SimpleToast.show('Maximum file limit reached');
        return;
      }

      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const fileNames = res.map(file => file);
      setSelectedFiles(prevFiles => [...prevFiles, ...fileNames]);
      console.log('====================================fileNamesfileNames');
      console.log(fileNames);
      console.log('====================================');
      // Process the selected file

      // Here, you can send the file to a server or perform any desired operations
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the file selection
        console.log('User cancelled the file selection');
      } else {
        // An error occurred
        console.log('Error', err);
      }
    }
  };

  const deleteFile = index => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <View style={[styles.container, {paddingHorizontal: 24}]}>
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
          {`Add Tickets`}
        </Text>
      </View>
      <View style={{flex: 0.95}}>
        <CustomTextInput
          placeholder="Title"
          mainStyle={{
            borderWidth: 1,
            height: 56,
            borderColor: colors.textGreyDark,
            backgroundColor: 'rgba(250, 250, 250, 1)',
            marginBottom: 16,
          }}
          placeholderTextColor={colors.secondaryColor}
          inpStyle={{fontSize: 16, lineHeight: 28}}
          onChangeText={setTitle}
          value={tite}
          maxLength={50}
        />
        {/* <SimpleDropDown
          options={options}
          onSelect={onSelectOption}
          mainText={`Select company`}
          mainStyle={{marginBottom: 14, zIndex: 20}}
        /> */}
        <SelectDropdown
          data={releatedto}
          // defaultValueByIndex={1}
          // defaultValue={{
          //   title: 'England',
          //   image: require('./Images/England.jpg'),
          // }}
          onSelect={(selectedItem, index) => {
            setDropDown(selectedItem);
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
                  {selectedItem ? selectedItem : 'Related to'}
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
        <View style={{borderWidth:1,borderColor: 'rgba(233, 234, 233, 1)',borderRadius:8}}>
        <CustomTextInput
          placeholder="Description"
          mainStyle={{
            // borderWidth: 1,
            height: 128,
            borderColor: colors.textGreyDark,
            backgroundColor: 'rgba(250, 250, 250, 1)',
            alignItems: 'flex-start',
            marginBottom:0,
            borderBottomLeftRadius:0,
            borderBottomRightRadius:0,
          }}
          placeholderTextColor={colors.secondaryColor}
          inpStyle={{fontSize: 16, lineHeight: 28}}
          onChangeText={setDescription}
          value={description}
          multiline={true}
          numberOfLines={4}
          maxLength={500}
        />
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(250, 250, 250, 1)', borderBottomLeftRadius:8,
          borderBottomRightRadius:8,}}
          onPress={selectFile}>
          <TouchableOpacity
            style={{
              width: 38,
              height: 40,
              borderRadius: 8,
              backgroundColor: 'rgba(250, 250, 250, 1)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16,

            }}>
            <Pin />
          </TouchableOpacity>
          <Text regular body2>
            Add Attachments
          </Text>
          <Text regular caption1 secondaryColor>
            {'(Optional)'}
          </Text>
        </TouchableOpacity>
        {selectedFiles.map((fileName, index) => (
          <View
            style={{
              flexDirection: 'row',
              height: 34,
              backgroundColor: colors.textGreyDark,
              alignItems: 'center',
            }}>
            <View style={{marginLeft: 10, flex: 0.1}}>
              <Pin />
            </View>
            <View style={{flex: 1.2, flexDirection: 'row'}}>
              <Text key={index} numberOfLines={1} appPrimary>
                {fileName.name}
              </Text>
              <Text
                key={index}
                style={{marginLeft: 2}}
                numberOfLines={1}>{`(300 KB)`}</Text>
            </View>
            <TouchableOpacity
              onPress={() => deleteFile(index)}
              style={{
                flex: 0.32,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Close />
            </TouchableOpacity>
          </View>
        ))}
        </View>
        
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
    backgroundColor: 'white',
  },
});

//make this component available to the app
export default AddTicket;
