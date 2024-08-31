/**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {styles} from './styles';
import {Text, Button} from '..';
import {useTheme} from '../../config/theme';
import DocumentPicker from 'react-native-document-picker';
import SimpleToast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';
import axios from 'axios';
import { API_BASE } from '../../services/ROUTES';

const BulkAddModal = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    Cancel,
    id,
    apiDataHandle,
  } = props;
  const colors = useTheme();
  const [file, setFile] = useState('');
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [apiSuccess, setApiSuccess] = useState(false);
  console.log('====================================');
  console.log(id);
  console.log('====================================');
  const [data,setData] = useState([])
  /** line component */
  const Line = () => {
    return (
      <View
        style={{
          height: 4,
          backgroundColor: colors.blackColor,
          width: 100,
          alignSelf: 'center',
          borderRadius: 10,
          marginTop: 28,
        }}
      />
    );
  };

  console.log('====================================');
  console.log(data);
  console.log('====================================');

  const formdata = new FormData();
  // formdata.append('csvFile', file);
  formdata.append('csvFile', {
    uri: file[0]?.uri,
    type: file[0]?.type,
    name: file[0]?.name,
  });

  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      res.forEach(file => {
        const fileName = file.name;
        const hasCsvExtension = fileName.endsWith('.csv');
        // or you can use regex: const hasCsvExtension = /\.csv$/.test(fileName);

        if (hasCsvExtension) {
          console.log(`${fileName} has a .csv extension`);
          console.log(res);
          setFile(res);
        } else {
          console.log(`${fileName} does not have a .csv extension`);
          SimpleToast.show('Please choose .csv file type', SimpleToast.SHORT);
        }
      });
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

  const postData = () => {
    axios.post(
        API_BASE + `company/${id}/bulk`,
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
        setData(res.data);
        setApiSuccess(true);
        setFile('')
        apiDataHandle(res.data)
      })
      .catch(error => {
        console.log('api error', error.response.data.error.message);
      });
  };

  // Close the modal when API success state changes to true
  useEffect(() => {
    if (apiSuccess) {
      onSwipeComplete();
    }
  }, [apiSuccess, onSwipeComplete]);

  useEffect(() => {
    setApiSuccess(false);
  }, [visible]);
  
  const apiPressed = () => {
    postData();
  };

  return (
    <Modal
      isVisible={visible}
      {...(swipeDown ? {swipeDirection: 'down'} : {})}
      style={styles.bottomModal}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress && onSwipeComplete();
      }}
      onSwipeComplete={() => onSwipeComplete()}>
      <View
        style={[
          styles.boxContainer,
          {backgroundColor: colors.whiteBackground},
        ]}>
        {swipeDown === true && <Line />}
        <View
          style={{
            marginTop: 15,
            justifyContent: 'space-between',
            paddingBottom: 14,
            borderBottomWidth: 1,
            height: 80,
            borderBottomColor: colors.textGreyDark,
            marginBottom: 17,
            flexDirection: 'row',
            paddingHorizontal: 16,
            alignItems: 'center',
          }}>
          <Text blackColor bold heading2 style={{lineHeight: 40}}>
            Bulk Add
          </Text>
          <TouchableOpacity>
            <Text appPrimary regular caption1 style={{lineHeight: 12}}>
              Download Template
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 32, marginHorizontal: 25}}>
          <Text regular title4 netural style={{lineHeight: 30}}>
            Upload the file after filling the template with required info
          </Text>
        </View>
        <TouchableOpacity
          style={{
            height: 133,
            borderWidth: 1,
            marginBottom: 32,
            marginHorizontal: 25,
            backgroundColor: colors.appPrimaryLight,
            borderStyle: 'dashed',
            borderColor: colors.appPrimary,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={selectFile}>
          {file ? (
            <Text style={{lineHeight: 28}} regular body1 appPrimary>
              {file[0].name}
            </Text>
          ) : (
            <Text style={{lineHeight: 28}} regular body1 appPrimary>
              Upload Attachment
            </Text>
          )}
        </TouchableOpacity>
        <Button
          buttonStyle={{
            marginBottom: 20,
            marginHorizontal: 25,
            backgroundColor: colors.appPrimary,
          }}
          title="Save"
          textStyles={{color: colors.whiteColor}}
          onPress={apiPressed}
        />
        <Button
          buttonStyle={{marginBottom: 20, marginHorizontal: 25}}
          title="Cancel"
          onPress={Cancel}
        />
      </View>
    </Modal>
  );
};

export default BulkAddModal;
