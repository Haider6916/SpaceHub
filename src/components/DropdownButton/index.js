//import liraries
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {ArrowDown, Done, DoneWhite, Time, WhiteTime} from '../../assets';
import {useTheme} from '../../config/theme';
import {Text} from '..';

// create a component
const DropdownButton = ({onPress, selectedValue, onValueChange}) => {
  const colors = useTheme();
  const options = [
    {id: 1, label: 'As Pending', icon: <Time />},
    {id: 2, label: 'As Done', icon: <Done />},
  ];

  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (selectedValue) {
      const initialSelectedItem = options.find(
        option => option.label === selectedValue,
      );
      setSelectedItem(initialSelectedItem);
    }
  }, [selectedValue]);

  const handleSelectItem = (selectedItem, index) => {
    setSelectedItem(selectedItem);
    onValueChange(selectedItem.label);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          width: 120,
          height: 40,
          marginBottom: 16,
          borderRightWidth: 1,
          borderRightColor: 'white',
          backgroundColor: colors.appPrimary,
          //   borderRadius: 51,
          borderBottomLeftRadius: 51,
          borderTopLeftRadius: 51,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={onPress}>
        {selectedItem?.label === 'As Pending' ? (
          <>
            <View style={{marginRight: 10}}>
              <WhiteTime />
            </View>
            <Text whiteColor subhead regular>
              Pending
            </Text>
          </>
        ) : (
          <>
            <View style={{marginRight: 10}}>
              <DoneWhite />
            </View>
            <Text whiteColor subhead regular>
              Done
            </Text>
          </>
        )}
      </TouchableOpacity>
      <SelectDropdown
        data={options}
        onSelect={handleSelectItem}
        rowStyle={{
          backgroundColor: 'white',
          borderBottomColor: 'rgba(233, 234, 233, 1)',
          height: 56,
        }}
        buttonStyle={{
          width: 50,
          height: 40,
          marginBottom: 16,
          backgroundColor: colors.appPrimary,
          //   borderRadius: 51,
          borderTopRightRadius: 51,
          borderBottomRightRadius: 51,
        }}
        renderCustomizedButtonChild={(selectedItem, index) => {
          return (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.appPrimary,
                height: 32,
                marginHorizontal: 2,
              }}>
              <ArrowDown width={20} height={20} />
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
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: 'white',
              }}>
              <View style={{marginLeft:10,marginRight:10}}>
                   <Text>{item.icon}</Text>
                   
                </View>
                <View>
                  <Text>{item.label}</Text>
                  </View>
              {/* <Text
                style={{
                  fontSize: 16,
                  // marginLeft: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{marginLeft: 10, marginRight: 10}}>
                    {item.icon}
                  </Text>
                </View>
                {item.label}
              </Text> */}
            </View>
          );
        }}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

//make this component available to the app
export default DropdownButton;
