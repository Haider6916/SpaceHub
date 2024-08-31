import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { CheckSquare } from '../../assets';

const Checkbox = ({ checked, onChecked, style}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleOnPress = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChecked) {
      onChecked(newChecked);
    }
  };

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);


  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleOnPress}
    >
      <View
        style={[
          styles.checkbox,
          isChecked ? styles.checkboxChecked : {},
          style,
        ]}
      >
        {isChecked && <View style={styles.checkboxInner}><CheckSquare/></View>}
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
    width: 15,
    height: 15,
    borderWidth: 1,
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

export default Checkbox;
