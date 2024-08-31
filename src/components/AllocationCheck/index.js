//import liraries
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Checkbox, Text} from '..';
import {AllocationImg} from '../../assets';
import {useTheme} from '../../config/theme';

// create a component
const AllocationCheck = ({Style, DeskName, Capacity, FlooNumber,onCheckedData,id,selectedIds}) => {
  const [isChecked, setIsChecked] = useState(false);
  const [bgChecked, setIsbgChecked] = useState(false);
  const colors = useTheme();
  // console.log(selectedIds,'selecteedID');

  useEffect(() => {
    // Check if the received id is in the selectedIds array
    if (selectedIds?.includes(id)) {
      setIsChecked(true);
      setIsbgChecked(true);
      onCheckedData(true, id);
    }
  }, []);

  const handleCheckboxChange = checked => {
    setIsChecked(checked);
    setIsbgChecked(checked);
    onCheckedData(checked, id);
  };

  const handleTouchableOpacityPress = () => {
    setIsChecked(!isChecked);
    setIsbgChecked(!isChecked);
    onCheckedData(!isChecked, id);
  };
  

  return (
    <TouchableOpacity
      style={[
        {
          height: 230,
          // width: 173,
          padding: 8,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: bgChecked ? colors.appPrimary : 'rgba(198, 199, 197, 1)',
          backgroundColor: bgChecked ? 'rgba(238, 229, 241, 1)' : 'white',
          // flex:1,
          width: '48%',
        },
        Style,
      ]}
      onPress={handleTouchableOpacityPress}>
      <Checkbox checked={isChecked} onChecked={handleCheckboxChange} />
      <View style={{height: 120, width: '100%'}}>
        <Image
          source={AllocationImg}
          resizeMode="cover"
          style={{height: '100%', width: '100%'}}
        />
      </View>
      <View style={{marginTop: 4}}>
        <Text body1 netural regular style={{lineHeight: 21}}>
          {DeskName}
        </Text>
        <Text body2 regular netural style={{lineHeight: 18}}>
          {Capacity}
        </Text>
        <Text body2 regular netural style={{lineHeight: 18}}>
          {FlooNumber}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default AllocationCheck;
