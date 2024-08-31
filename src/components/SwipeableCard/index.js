import React, { useState } from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import Swiper from 'react-native-swiper';
import {Forward,CardArrow, CardArrowBack} from '../../assets';
import {AUTH} from '../../navigation/ROUTES';
import { Text } from '..';


const Card = ({data, navigation}) => {
  return (
    <View style={styles.card}>
      <View style={{flex:1}}>
      <Text style={styles.titletext} numberOfLines={1}>{data.title}</Text>
      <Text style={styles.text} numberOfLines={3}>{data.description}</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={{
            // paddingTop: 13,
            marginTop:25,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate(AUTH.ANNOUNCEMENTS)}>
          <Text whiteColor body2 regular>{`Read more`}</Text>
          <View style={{marginLeft: 11}}>
            <Forward />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 17,
            paddingTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate(AUTH.ANNOUNCEMENTSFORM)}>
          <Text whiteColor body2 regular>{`Add`}</Text>
          <View style={{marginLeft: 11}}>
            <Forward />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SwipeableCard = ({navigation,indata}) => {


  return (
    <Swiper
      loop={false}
      showsPagination={false}
      showsButtons={true}
      index={0}
      nextButton={<CardArrow/>} // Custom Next button component
      prevButton={<CardArrowBack />} // Custom Previous button compon
      containerStyle={styles.swiperContainer}>
      {indata.map(card => (
        <Card key={card._id} data={card} navigation={navigation} />
      ))}
    </Swiper>
  );
};


const styles = {
  swiperContainer: {
    flex: 1,
  },
  card: {
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 24,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    height: 150,
    backgroundColor: '#8D55A2',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    // marginBottom: 8,
    color: 'white',
    fontWeight: '400',
    lineHeight: 21,
    marginTop: 4,
  },
  titletext: {
    fontFamily: 'DM Sans',
    fontSize: 19,
    fontWeight: '700',
    color: 'white',
    lineHeight: 25,
  },
};

export default SwipeableCard;
