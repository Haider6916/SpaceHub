import React, {useState, useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, Pressable} from 'react-native';

const CustomTextInput = ({
  placeholder,
  onChangeText,
  secureTextEntry,
  keyboardType,
  multiline,
  textAlignVertical,
  onSubmitEditing,
  icon,
  placeholderTextColor,
  mainStyle,
  inpStyle,
  // startIcon,
  maxLength,
  ref,
  onPress,
  onFocus,
  editable,
  onBlur,
  value: propValue, // New prop for the initial value
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState('');

  const inputRef = useRef(null);

  // Update the input value when the prop changes
  useEffect(() => {
    setValue(propValue);
  }, [propValue]);

  const handleTextChange = text => {
    setValue(text);
    onChangeText(text);
  };

  const handleClearText = () => {
    setValue('');
    onChangeText('');
    inputRef.current.clear();
  };

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        mainStyle,
        // isFocused && styles.containerFocused
      ]}>
      {/* <View style={{marginRight:10}}>
      {startIcon}
      </View> */}
      <TextInput
        style={[styles.input, inpStyle]}
        ref={ref}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={textAlignVertical}
        onSubmitEditing={onSubmitEditing}
        placeholderTextColor={placeholderTextColor}
        maxLength={maxLength}
        onFocus={onFocus}
        editable={editable}
        onBlur={onBlur}
      />
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    borderColor: '#c4c4c4',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
    height: 48,
    backgroundColor: '#F6F5F5',
    // alignItems:'center'
  },
  containerFocused: {
    borderColor: '#4d4dff',
  },
  input: {
    flex: 1,
    color: 'black',
    // alignSelf:'auto',
  },
  clearButton: {
    marginLeft: 10,
  },
});

export default CustomTextInput;
