//import liraries
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {
  Close,
  DirectoryArrrowDown,
  DummyButton,
  DummyImg,
  Left,
  Pin,
  Send,
  ThreeDots,
} from '../../../assets';
import {
  Button,
  CustomTextInput,
  DropdownButton,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import SelectDropdown from 'react-native-select-dropdown';
import {GeneralResponses} from '../../../services/responses';
import {useSelector} from 'react-redux';
import {API, useFetchGet} from '../../../services';
import DocumentPicker from 'react-native-document-picker';
import SimpleToast from 'react-native-simple-toast';
import axios from 'axios';

// create a component
const OpenTicket = ({navigation, route}) => {
  const [reply, setReply] = useState('');
  const [getbyID, setgetBYID] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const iD = route?.params?.data;
  const [idData, setiIDdata] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [attachments, setAttachments] = useState([]);
  console.log('===================================21312312=');
  console.log(attachments);
  console.log('====================================');
  const [status, setStatus] = useState('');
  const colors = useTheme();
  const [selectedItem, setSelectedItem] = useState(null);
  
  // useLayoutEffect(()=>{
  //   setSelectedItem('As Pending')
  // })

  useEffect(()=>{
    setSelectedItem('As Pending')
  },[])


  const handleDropdownSelect = selectedItem => {
    setSelectedItem(selectedItem);
    if (selectedItem === 'As Pending') {
      setStatus('Pending');
    } else if (selectedItem  === 'As Done') {
      setStatus('Done');
    }
  };

  const btnPressed = () => {
    updateData();
  };


  /** Get by ID */
  const getTicket = useFetchGet(
    API.TICKET_ID + `${iD}`,
    getbyID,
    {},
    userAccessToken,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getTicket.loading) {
      if (getTicket.response?.status === GeneralResponses.STATUS_OK.CODE) {
        setiIDdata(getTicket.response?.data);
        console.log('====================================');
        console.log(idData);
        console.log('====================================');
        setAttachments(getTicket.response?.data.attachments);
      }
    } else {
      console.log('error in get Announceement ');
    }
    setgetBYID(false);
  }, [getTicket.loading]);

  const formatDate = () => {
    const date = new Date(idData?.createdAt);
    const monthIndex = date.getMonth(); // Returns the month index (0-11)
    const day = date.getDate(); // Returns the day of the month (1-31)

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const formattedDate = `${months[monthIndex]} ${day}`;

    return formattedDate;
  };

  const Chatdate = () => {
    const currentDate = new Date(); // Current date and time
    const messageDate = new Date(idData?.createdAt); // Message date and time

    const timeDifference = currentDate.getTime() - messageDate.getTime(); // Time difference in milliseconds

    const minutesDifference = Math.floor(timeDifference / (1000 * 60)); // Convert milliseconds to minutes
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60)); // Convert milliseconds to hours
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    if (minutesDifference < 1) {
      return ' less than a minute ago';
    } else if (minutesDifference < 60) {
      return `${minutesDifference} minutes ago`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference} hours ago`;
    } else {
      return `${daysDifference} days ago`;
    }
  };

  const Chat = ({image, Name, Companyname, time, description, attachment}) => {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Image
              // source={{uri:idData?.createdBy?.profilePicture}}
              source={image}
              style={[
                {
                  marginTop: 24,
                  height: 64,
                  width: 64,
                  borderRadius: 16,
                  borderColor: 'rgba(159, 157, 158, 1)',
                  borderWidth: 1,
                },
              ]}
            />
          </View>
          <View style={{marginTop: 24, flex: 0.95, paddingLeft: 24}}>
            <Text
              regular
              title4
              style={{lineHeight: 24, fontWeight: '500'}}
              numberOfLines={1}>
              {Name}
              {/* {`${idData?.assignedTo?.firstName?.en} ${idData?.assignedTo?.lastName?.en}`} */}
            </Text>
            <Text regular body1 style={{lineHeight: 24}} numberOfLines={1}>
              {/* {description} */}
              {Companyname}
            </Text>
          </View>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 0.9}}>
            <Text regular title4>
              {time}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 19, marginBottom: 17}}>
          <Text regular body1 netural>
            {description}
          </Text>
        </View>
        {attachment != '' && (
          // <View style={{flexDirection: 'row'}}>
          //   <View style={{flex: 0.1}}>
          //     <Pin />
          //   </View>
          //   <View style={{flex:1}}>
          <View style={{marginBottom: 20}}>
            <Text appPrimary>{attachment}</Text>
          </View>
          //   </View>
          // </View>
        )}
      </>
    );
  };

  /** File Selection */
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

  useEffect(() => {
    setgetBYID(true);
  }, [reply]);

  /** Reply api */
  const formdata = new FormData();
  formdata.append('messageContent', reply);
  selectedFiles?.forEach(value => {
    formdata.append('files', value);
  });

  const postData = () => {
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1//ticket/reply/${iD}`,
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
        setReply('');
        setSelectedFiles(null);
        // console.log('id', res?.data?._id);
        //   navigation.navigate(AUTH.ADDCEMPLOYEE, {
        //     name: routename,
        //     id: res?.data?._id,
        //   });
      })
      .catch(error => {
        console.log('api error', error.response.data.error);
      });
  };

  const updateData = () => {
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1//ticket/${iD}`,
        {
          status: status,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: userAccessToken,
          },
        },
      )
      .then(res => {
        console.log('apiiiiiii', res.data);
        navigation.goBack();
      })
      .catch(error => {
        console.log('api error', error.response.data.error);
      });
  };

  const ReopenData = () => {
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1//ticket/${iD}`,
        {
          status: 'Pending',
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            Authorization: userAccessToken,
          },
        },
      )
      .then(res => {
        console.log('apiiiiiii', res.data);
        // navigation.goBack();
        setgetBYID(true)
      })
      .catch(error => {
        console.log('api error', error.response.data.error);
      });
  };

  const ReopenTicket = () => {
    ReopenData();
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView style={{flex: 1, paddingHorizontal: 24, marginTop: 40}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{flex: 0.2}}
            onPress={() => navigation.goBack()}>
            <Left />
          </TouchableOpacity>
          <View style={{flex: 1.3}}>
            <Text regular heading2>
              {/* Unable to Update website page to add more information */}
              {idData?.title}
            </Text>
          </View>
        </View>
        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <Text style={{flex: 0.8}}>{formatDate()}</Text>
          <View style={{flex: 1.1, flexDirection: 'row'}}>
            <Text>{`Related To: `}</Text>
            <Text numberOfLines={1}>{idData?.relatedTo}</Text>
          </View>
        </View>
        {idData.status === 'Done' ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 15,
            }}>
            <Text regular title4>
              Status
            </Text>
            <View
              style={{
                width: 82,
                height: 28,
                borderRadius: 110,
                backgroundColor: 'rgba(133, 132, 132, 1)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text regular body1 whiteColor>
                {idData.status}
              </Text>
            </View>
          </View>
        ) : (
          <></>
        )}
        {idData.status === 'Done' ? (
          <></>
        ) : (
          // <SelectDropdown
          //   // data={selectedOption}
          //   // defaultValueByIndex={1}
          //   // defaultValue={{
          //   //   title: 'England',
          //   //   image: require('./Images/England.jpg'),
          //   // }}
          //   // onSelect={(selectedItem, index) => {
          //   //   console.log(selectedItem, index, 'dsaasdasss');
          //   //   setSelectedResources(selectedItem._id);
          //   // }}
          //   // buttonTextAfterSelection={(selectedItem, index) => {
          //   //   return selectedItem;
          //   // }}
          //   rowStyle={{
          //     backgroundColor: 'white',
          //     borderBottomColor: 'rgba(233, 234, 233, 1)',
          //   }}
          //   buttonStyle={{
          //     width: '100%',
          //     marginBottom: 15,
          //     backgroundColor: `rgba(250, 250, 250, 1)`,
          //     borderWidth: 1,
          //     borderColor: 'rgba(233, 234, 233, 1)',
          //     borderRadius: 8,
          //     paddingHorizontal: 10,
          //     marginTop: 20,
          //   }}
          //   renderCustomizedButtonChild={(selectedItem, index) => {
          //     return (
          //       <View
          //         style={{
          //           flexDirection: 'row',
          //           justifyContent: 'space-between',
          //           alignItems: 'center',
          //           backgroundColor: 'rgba(250, 250, 250, 1)',
          //         }}>
          //         <Text
          //           style={{
          //             fontSize: 16,
          //             color: selectedItem ? 'black' : colors.secondaryColor,
          //           }}>
          //           {selectedItem ? selectedItem.name : 'Issue to'}
          //         </Text>
          //         <DirectoryArrrowDown width={20} height={20} />
          //       </View>
          //     );
          //   }}
          //   // dropdownStyle={styles.dropdown3DropdownStyle}
          //   // rowStyle={styles.dropdown3RowStyle}
          //   renderCustomizedRowChild={(item, index) => {
          //     return (
          //       <View
          //         style={{
          //           alignItems: 'center',
          //           flexDirection: 'row',
          //           backgroundColor: 'white',
          //         }}>
          //         <Text
          //           style={{
          //             fontSize: 16,
          //             marginLeft: 16,
          //           }}>
          //           {item.name}
          //         </Text>
          //       </View>
          //     );
          //   }}
          // />
          <>
          </>
        )}
        <Chat
          image={{uri: idData?.createdBy?.profilePicture}}
          Name={
            idData?.createdBy?.firstName?.en + idData?.createdBy?.lastName?.en
          }
          Companyname={idData?.createdBy?.company?.name}
          time={Chatdate()}
          description={idData?.description}
          attachment={
            idData?.attachments?.map((value, index) => (

              <View style={{flexDirection: 'row'}}>
                <View style={{flex: 0.1, marginRight:Platform.OS == 'ios'  ? 20 : 10}}>
                  <Pin />
                </View>
                <View style={{}}>
                  <Text appPrimary numberOfLines={1}>{value}</Text>
                </View>
              </View>
            ))
            // <View key={index}>
            //   <Text>{value}</Text>
            // </View>))
          }
        />

        {idData?.conversation?.length !== 0 && (
          <>
            {idData?.conversation?.map((value, index) => {
              console.log('====================================');
              console.log(value, index);
              console.log('====================================');
              const formatDatee = () => {
                const currentDate = new Date(); // Current date and time
                const messageDate = new Date(value?.sentTime); // Message date and time

                const timeDifference =
                  currentDate.getTime() - messageDate.getTime(); // Time difference in milliseconds

                const minutesDifference = Math.floor(
                  timeDifference / (1000 * 60),
                ); // Convert milliseconds to minutes
                const hoursDifference = Math.floor(
                  timeDifference / (1000 * 60 * 60),
                ); // Convert milliseconds to hours
                const daysDifference = Math.floor(
                  timeDifference / (1000 * 60 * 60 * 24),
                ); // Convert milliseconds to days

                if (minutesDifference < 1) {
                  return 'less than a minute ago';
                } else if (minutesDifference < 60) {
                  return `${minutesDifference} minutes ago`;
                } else if (hoursDifference < 24) {
                  return `${hoursDifference} hours ago`;
                } else {
                  return `${daysDifference} days ago`;
                }
              };
              return (
                <Chat
                  key={value?._id}
                  image={{uri: value?.sender?.profilePicture}}
                  Name={
                    value?.sender?.firstName?.en + value?.sender?.lastName?.en
                  }
                  Companyname={value?.sender?.company?.name}
                  time={formatDatee()}
                  description={value?.messageContent}
                  attachment={
                    value?.messageAttachments?.map((value, index) => (
                      <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 0.1, marginRight: Platform.OS == 'ios'  ? 20 : 10}}>
                          <Pin />
                        </View>
                        <View style={{}}>
                          <Text appPrimary numberOfLines={1}>{value}</Text>
                        </View>
                      </View>
                    ))
                    // <View key={index}>
                    //   <Text>{value}</Text>
                    // </View>))
                  }
                />
              );
            })}
          </>
        )}
      </ScrollView>
      <View
        style={{
          borderWidth: idData.status === 'Done' ? 0: 1,
          marginHorizontal: 10,
          marginBottom: 20,
          borderColor: 'rgba(219, 219, 218, 1)',
          borderRadius: 8,
        }}>
        {idData.status === 'Done' ? (
          <></>
        ) : (
          <>
            <View style={{paddingHorizontal: 10, flexDirection: 'row'}}>
              {/* <TouchableOpacity
          style={{
            borderColor: '#c4c4c4',
            borderRadius: 8,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            paddingLeft: 5,
            height: 100,
            backgroundColor: '#F6F5F5',
            justifyContent: 'center',
          }}
          onPress={selectFile}>
          <Pin />
        </TouchableOpacity> */}
              <CustomTextInput
                mainStyle={{
                  height: 75,
                  flex: 1,
                  borderRadius: 0,
                  marginBottom: 0,
                  alignItems: 'flex-start',
                  borderTopLeftRadius: 8,
                  marginTop: 20,
                }}
                // startIcon={<Pin />}
                placeholder={'Send your reply'}
                placeholderTextColor={colors.secondaryColor}
                onChangeText={setReply}
                value={reply}
              />
              {/* <TouchableOpacity
              style={{
                borderColor: '#c4c4c4',
                borderRadius: 8,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                paddingRight: 5,
                height: 75,
                backgroundColor: '#F6F5F5',
                justifyContent: 'flex-start',
                paddingVertical: 13,
              }}
              onPress={() => postData()}>
              <Send />
            </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={{
                borderColor: '#c4c4c4',
                borderRadius: 8,
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 8,
                borderBottomLeftRadius: 8,
                height: 25,
                marginHorizontal: 10,
                backgroundColor: '#F6F5F5',
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingHorizontal: 13,
                paddingBottom: 5,
              }}
              onPress={selectFile}>
              <Pin />
            </TouchableOpacity>
            <View style={{paddingHorizontal: 10}}>
              {selectedFiles?.map((fileName, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    height: 34,
                    backgroundColor: '#F6F5F5',
                    alignItems: 'center',
                    backgroundColor: 'rgb(234, 234, 234)',
                  }}>
                  <View style={{marginLeft: 10, flex: 0.1}}>
                    <Pin />
                  </View>
                  <View style={{flex: 1.2, flexDirection: 'row'}}>
                    <Text key={index} numberOfLines={1} appPrimary>
                      {fileName.name}
                    </Text>
                    <View style={{flex:0.8}}>
                    <Text
                      key={index}
                      style={{marginLeft: 2}}
                      numberOfLines={1}>{`(300 KB)`}</Text>
                      </View>
                          <TouchableOpacity
                    onPress={() => deleteFile(index)}
                    style={{
                      flex: 0.12,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Close />
                  </TouchableOpacity>
                  </View>
              
                </View>
              ))}
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 5,
            marginTop: 10,
          }}>
          {idData.status === 'Done' ? (
            <>
              <Button
                buttonStyle={{flex: 0.4}}
                title={`Back`}
                onPress={() => navigation.goBack()}
              />
              <Button
                buttonStyle={{backgroundColor: colors.appPrimary, flex: 0.37}}
                title={`Reopen Ticket`}
                textStyles={{color: colors.whiteBackground}}
                onPress={ReopenTicket}
              />
            </>
          ) : (
            <>
              <DropdownButton
                selectedValue={selectedItem}
                onValueChange={handleDropdownSelect}
                onPress={btnPressed}
              />
              <Button
                buttonStyle={{
                  flex: 0.5,
                  backgroundColor: 'rgba(238, 229, 241, 1)',
                }}
                title={`Comment`}
                onPress={() => postData()}
              />
            </>
          )}
        </View>
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
export default OpenTicket;
