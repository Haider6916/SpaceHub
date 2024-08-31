import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ArrowDown, ArrowUp, DirectoryArrrowDown} from '../../assets';
import { Text } from '..';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

function ButtonDropDown(props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const {options, mainStyle, mainText,btnStyle,mainTextStyle,StyleDrop} = props;

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectItem = item => {
    setSelectedItem(item);
    setDropdownVisible(false);
    props.onSelect(item);
  };

  return (
    <View style={[styles.container, mainStyle]}>
      <TouchableOpacity onPress={toggleDropdown} style={[styles.button,btnStyle]}>
        <View style={{flex:1}}>
          <Text style={[styles.buttonText,mainTextStyle]}>{mainText}</Text>
        </View>
        <View style={{flex:0.15}}>
       {dropdownVisible ? <ArrowUp /> : <ArrowDown />}</View>
        {/* <Icon name={dropdownVisible ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="gray" /> */}
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={[styles.dropdown,StyleDrop]}>
          {options.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => selectItem(item)}
              style={styles.dropdownItem}>
              <Text style={styles.dropdownItemText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 110,
    height: 32,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 51,
    // backgroundColor: 'rgba(245, 246, 244, 1)',
    backgroundColor:'white'
  },
  buttonText: {
    fontSize: 16,
    // color: 'rgba(68, 67, 68, 1)',
    fontFamily: 'DM Sans',
    fontWeight: '500',
    lineHeight: 28,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: width-340,
    // backgroundColor: 'rgba(245, 246, 244, 1)',
    backgroundColor:'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width:250,
    marginTop:5,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 234, 233, 1)',
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'rgba(68, 67, 68, 1)',
    fontFamily: 'DM Sans',
    fontWeight: '400',
    lineHeight: 28,
  },
});

export default ButtonDropDown;
