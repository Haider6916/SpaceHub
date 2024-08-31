//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {Left, ThreeDots} from '../../../assets';
import {TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native';
import {BaseStyle} from '../../../config/styles';
import {Text} from '../../../components';
import {BaseColor} from '../../../config/theme';
import SelectDropdown from 'react-native-select-dropdown';
import {AUTH} from '../../../navigation/ROUTES';
import axios from 'axios';
import {useSelector} from 'react-redux';

// create a component
const PinEvent = ({navigation, route}) => {
  const data = route?.params?.data;
  const [attendees, setAttendees] = useState([]);
  const [id, setID] = useState('');
  const userAccessToken = useSelector(state => state.user.userAccessToken);

  useEffect(() => {
    if (data && data.attendees) {
      setAttendees(data.attendees);
      console.log('====================================daaattaa');
      console.log(attendees);
      console.log('====================================');
    }
  }, [data]);

  const options = [
    {id: 1, label: 'View Profile'},
    {id: 2, label: 'Unjoin Event'},
  ];

  const viewProfile = item => {
    navigation.navigate(AUTH.VIEWEMPLOYEE, {
      data: item._id,
    });
  };

  const unJoin = item => {
    // setID(item._id)
    // unjoin();
  };

  const unjoin = () => {
    axios
      .put(
        `https://dolphin-app-oz4sf.ondigitalocean.app/api/v1/event/unjoin/${id}`,
        {},
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
        SimpleToast.show(`Unjoined Successfully`);
      })
      .catch(error => {
        console.log('api error', error.response.data.error.message);
      });
  };

  const renderAttendeeItem = ({item}) => {
    return (
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(233, 234, 233, 1)',
          height: 60,
          paddingHorizontal: 24,
          paddingTop: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 25,
              borderWidth: 1,
              borderColor: 'black',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={{uri: item.profilePicture}}
              style={{height: 40, width: 40, borderRadius: 25}}
            />
          </View>
          <Text style={{marginLeft: 10}} body1 regular>
            {item.firstName.en} {item.lastName.en}
          </Text>
        </View>
        <SelectDropdown
          data={options}
          onSelect={(selectedItem, index) => {
            if (selectedItem.id === 1) {
              viewProfile(item);
            } else if (selectedItem.id === 2) {
              unJoin(item);
            } else {
              console.log('====================================');
              console.log('errreee');
              console.log('====================================');
            }
          }}
          rowStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'rgba(233, 234, 233, 1)',
            height: 56,
          }}
          buttonStyle={{
            marginTop: 24,
            height: 48,
            width: 48,
            marginBottom: 16,
            backgroundColor: 'white',
            borderRadius: 51,
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View
                style={[
                  {
                    borderRadius: 26,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <ThreeDots />
              </View>
            );
          }}
          dropdownStyle={{
            width: 200,
            position: 'absolute',
            left: '35%',
            marginTop: 3,
          }}
          renderCustomizedRowChild={(item, index) => {
            return (
              <View
                style={{
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 16,
                  }}>
                  {item.label}
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={[BaseStyle.safeAreaView]}>
      <View style={{paddingHorizontal: 24}}>
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
            {`People in event`}
          </Text>
        </View>
      </View>
      <FlatList
        data={attendees}
        renderItem={renderAttendeeItem}
        keyExtractor={item => item._id}
      />
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
export default PinEvent;
