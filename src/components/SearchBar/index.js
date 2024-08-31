import React, {useState} from 'react';
import {TextInput, TouchableHighlight, StyleSheet, View} from 'react-native';
import {SearchIcon} from '../../assets';
import { useTheme } from '../../config/theme';

const SearchBar = ({onSubmit,placeholderTextColor}) => {
    const colors = useTheme();
  const [text, setText] = useState('');

  return (
    <View style={[styles.container,{backgroundColor:colors.textinput}]}>
      <TouchableHighlight onPress={onSubmit} >
        <SearchIcon />
      </TouchableHighlight>
      <TextInput
        style={styles.input}
        onChangeText={inputText => setText(inputText)}
        value={text}
        placeholder="Search"
        onSubmitEditing={() => onSubmit(text)}
        placeholderTextColor={placeholderTextColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 43,
    paddingLeft:26,
  },
  input: {
    height: 40,
    marginLeft: 10,
    flex: 1,
    color:'black',
  },
});

export default SearchBar;
