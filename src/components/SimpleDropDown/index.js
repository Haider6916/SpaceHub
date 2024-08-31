import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { DirectoryArrrowDown } from '../../assets';

function SimpleDropDown(props) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { options, mainText, mainStyle, btnStyle } = props;

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
      <TouchableOpacity onPress={toggleDropdown} style={[styles.button, btnStyle]}>
        {selectedItem ? (
          <>
            {selectedItem.image && (
              <Image source={selectedItem.image} style={styles.buttonImage} />
            )}
            <Text style={styles.buttonText}>{selectedItem.label}</Text>
          </>
        ) : (
          <Text style={styles.buttonText2}>{mainText}</Text>
        )}
        <DirectoryArrrowDown width={20} height={20} />
      </TouchableOpacity>
      {dropdownVisible && (
        <View style={styles.dropdown}>
          {options.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => selectItem(item)}
              style={styles.dropdownItem}
            >
              {item.image && <Image source={item.image} style={styles.dropdownItemImage} />}
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
    backgroundColor: 'rgba(250, 250, 250, 1)',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(233, 234, 233, 1)',
    borderRadius: 8,
  },
  buttonImage: {
    width: 40,
    height: 40,
    marginRight: 8,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  buttonText2: {
    fontSize: 16,
    color: 'rgba(125, 123, 124, 1)',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 234, 233, 1)',
  },
  dropdownItemImage: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  dropdownItemText: {
    fontSize: 16,
    color: 'black',
  },
});

export default SimpleDropDown;
