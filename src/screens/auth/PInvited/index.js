//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Image} from 'react-native';
import {DummyImg, Left, ThreeDots} from '../../../assets';
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
const PInvited = ({navigation, route}) => {
  const data = route?.params?.data;
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  const [attendees, setAttendees] = useState([]);
  const [visitors, setVisitors] = useState([]);
  useEffect(() => {
    if (data && data.attendees) {
      setAttendees([...data.attendees, ...data.visitors]);
      console.log('====================================daaattaa');
      console.log(attendees);
      console.log('====================================');
    }
  }, [data]);

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
          //   justifyContent:'space-between'
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
              source={item.firstName ? {uri: item.profilePicture} : DummyImg}
              style={{height: 40, width: 40, borderRadius: 25}}
            />
          </View>
          <View style={{flex: 0.5}}>
            {item.firstName ? (
              <Text style={{marginLeft: 10}} body1 regular numberOfLines={1}>
                {item.firstName.en} {item.lastName.en}
              </Text>
            ) : (
              <Text style={{marginLeft: 10}} body1 regular numberOfLines={1}>
                {item.name}
              </Text>
            )}
          </View>
        </View>
        <View style={{flex: 1}}>
          {item.firstName ? (
            <Text body1 regular secondaryColor>
              {item.company.name}
            </Text>
          ) : (
            <Text body1 regular secondaryColor numberOfLines={1}>
              N/A
            </Text>
          )}
        </View>
        <View style={{flex: 0.7}}>
          {item.firstName ? (
            <Text body1 regular appPrimary>
              Member
            </Text>
          ) : (
            <Text body1 regular secondaryColor>
              Visitor
            </Text>
          )}
        </View>
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
            {`Invited Attendees`}
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
export default PInvited;
