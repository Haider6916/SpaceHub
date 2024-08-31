import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { BigDown } from '../../assets';
import moment from 'moment';

const CustomDropdown = ({
  disabled,
  data ,
}) => {
  const [selectedValue, setSelectedValue] = useState('');

  
  const timeArray = [];
  const startTime = moment().hour(parseInt(0)).minute(0).second(0);

  for (let i = 0; i < 24 * 4; i++) {
    const time = startTime.clone().add(15 * i, 'minutes').format('hh:mm A');
    timeArray.push(time);
  }

  data(timeArray);

  console.log(timeArray);

  const handleChange = (value) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      <SelectDropdown
        data={timeArray}
        defaultValue="Select a time"
        onSelect={handleChange}
        disabled={disabled}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
        renderCustomizedButtonChild={() => (
          <View style={styles.dropdownButtonChild}>
            <Text style={[styles.dropdownButtonText,{color: selectedValue ? 'black' : 'rgba(125, 123, 124, 1)'}]}>
              {selectedValue ? selectedValue : 'Select a time'}
            </Text>
          <BigDown/>
          </View>
        )}
      />
      {/* {selectedValue !== '' && <Text style={styles.selectedText}>Selected Value: {selectedValue}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom:7
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: 'rgba(233, 234, 233, 1)',
    backgroundColor: '#F6F5F5',
    borderRadius: 4,
    width:142,
  },
  dropdownButtonChild: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    marginRight: 8,
  },
  dropdownStyle: {
    marginTop: 8,
  },
  dropdownRow: {
    padding: 12,
  },
  dropdownRowText: {
    fontSize: 16,
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDropdown;
