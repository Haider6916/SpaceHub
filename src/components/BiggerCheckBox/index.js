import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { BiggerCheckSquare } from '../../assets';
import { Text } from '..';

// create a component
const BiggerCheckBox = ({ checked, onChecked }) => {
    const [isChecked, setIsChecked] = useState(checked);

  const handleOnPress = () => {
    setIsChecked(!isChecked);
    if (onChecked) {
      onChecked(!isChecked);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
    >
      <View
        style={[
          styles.checkbox,
          isChecked ? styles.checkboxChecked : {},
        ]}
      >
        {isChecked && <View style={styles.checkboxInner}><BiggerCheckSquare/></View>}
      </View>
      <View>
        <Text regular body1 blackColor style={{lineHeight:28}}>
            Save and add more
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom:5,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 3,
    borderColor: 'gray',
    borderRadius: 4,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
  },
  checkboxInner: {
  },
});

//make this component available to the app
export default BiggerCheckBox;
