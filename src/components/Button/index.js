//import liraries
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from '..';
import {useTheme} from '../../config/theme';
import {BookCircle} from '../../assets';

// create a component
const Button = ({
  onPress,
  title = 'Sign in',
  buttonStyle,
  textStyles,
  borderWidth = 1,
  borderColor = '#8D55A2',
  height=40,
  icon
}) => {
  const colors = useTheme();
  return (
    <TouchableOpacity
      style={[
        buttonStyle,
        {
          height: height,
          // borderWidth: 1,
          borderWidth: borderWidth,
          // borderColor: colors.appPrimary,
          borderColor: borderColor,
          borderRadius: 51,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {icon && icon}
        <Text
          style={[textStyles, {lineHeight: 28, marginLeft: icon ? 10 : 0}]}
          regular
          body1
          appPrimary>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Button;
