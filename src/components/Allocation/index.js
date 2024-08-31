//import liraries
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from '..';
import {AllocationImg} from '../../assets';

// create a component
const Allocation = ({Style, Deskname, Capacity, Floornumber, image}) => {
  return (
    <View
      style={[
        {
          height: 201,
          width: 173,
          backgroundColor: '#F5F6F4',
          padding: 8,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#FAFAFA',
          // flex:1,
          width: 155,
        },
        Style,
      ]}>
      <View style={{height: 120, width: '100%'}}>
        <Image
          source={AllocationImg}
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <View style={{marginTop: 4}}>
        <Text
          body1
          appPrimary
          regular
          style={{lineHeight: 21}}
          numberOfLines={1}>
          {Deskname}
        </Text>
        <Text body2 regular secondaryColor style={{lineHeight: 18}} numberOfLines={1}>
          {`Capacity: ${Capacity}`}
        </Text>
        <Text body2 regular secondaryColor style={{lineHeight: 18}} numberOfLines={1}>
          {`Floor Number: ${Floornumber}`}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default Allocation;
