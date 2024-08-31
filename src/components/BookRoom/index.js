//import liraries
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Button, Text} from '..';
import {BookCircle, Building, DummyImg, Wifi} from '../../assets';
import ReadMore from 'react-native-read-more-text';
import {MoreOrLess} from '@rntext/more-or-less';

// create a component
const BookRoom = ({
  onPress,
  image,
  Name,
  Description,
  floor,
  Seats,
}) => {
  const _renderTruncatedFooter = handlePress => {
    return (
      <Text style={{marginTop: 5}} onPress={handlePress}>
        Read more
      </Text>
    );
  };

  const _renderRevealedFooter = handlePress => {
    return (
      <Text style={{marginTop: 5}} onPress={handlePress}>
        Show less
      </Text>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 16}}>
        <View
          style={{
            flex: 0.3,
          }}>
          <Image
            source={image}
            style={{borderRadius: 16, height: 64, width: 64}}
          />
        </View>
        <View style={{flex: 1}}>
          <Text numberOfLines={1} appPrimary regular title4>
            {Name}
          </Text>
        </View>
      </View>
      <View style={{marginTop: 8}}>
        <MoreOrLess
          numberOfLines={3}
          // textComponent={CustomText}
          moreText={'See More'}
          lessText={'Hide'}
          textButtonStyle={{
            color: 'rgba(141, 85, 162, 1)',
            fontWeight: '400',
            fontSize: 18,
          }}
          animated
          textStyle={{color: 'black', fontWeight: '400', fontSize: 18}}>
          {Description}
        </MoreOrLess>
      </View>
      <View style={{flexDirection: 'row', marginTop: 8}}>
        <View style={{marginRight: 8}}>
          <Building />
        </View>
        <View>
          <Text body1 regular>
            {floor}
          </Text>
          <Text style={{marginTop: 8}} body1 regular appLight>
            {Seats} seats
          </Text>
        </View>
      </View>
      <View style={{marginTop: 8, flexDirection: 'row'}}>
        <View style={{marginRight:10}}>
        <Wifi />
        </View>
        <View style={{marginRight:10}}>
        <Wifi />
        </View>
        <View style={{marginRight:10}}>
        <Wifi />
        </View>
        <View style={{marginRight:10}}>
        <Wifi />
        </View>
        <Wifi />
      </View>
      <View style={{marginTop: 8}}>
        <Button title="Book" icon={<BookCircle/>} 
        onPress={onPress}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    // overflow: 'hidden',
    shadowColor: 'rgba(2, 0, 1, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    // height: 343,
    height: 'auto',
    paddingHorizontal: 8,
    zIndex: 1,
  },
});

//make this component available to the app
export default BookRoom;
