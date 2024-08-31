// import React, {useState} from 'react';
// import {TextInput, TouchableHighlight, StyleSheet, View} from 'react-native';
// import {SearchIcon} from '../../assets';
// import { useTheme } from '../../config/theme';

// const AnnouncementSearchBar = ({onSubmit,placeholderTextColor}) => {
//     const colors = useTheme();
//   const [text, setText] = useState('');

//   return (
//     <View stye={{flexDirection:'row'}} >
//         <View  style={[styles.container,{backgroundColor:colors.whiteColor,borderWidth:1,borderColor:'rgba(219, 219, 218, 1)'}]}>
//       <TextInput
//         style={styles.input}
//         onChangeText={inputText => setText(inputText)}
//         value={text}
//         placeholder="Search Announcements"
//         onSubmitEditing={() => onSubmit(text)}
//         placeholderTextColor={placeholderTextColor}
//         // placeholderStyle={{fontWeight:'400',fontSize:16}}
//       />
//       </View>
//       <View>
//        <TouchableHighlight onPress={onSubmit} style={styles.iconContainer}>
//         <SearchIcon />
//       </TouchableHighlight>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//     borderRadius: 8,
//   },
//   input: {
//     height: 48,
//     marginLeft: 10,
//     flex: 1,
//     fontSize: 16,
//     lineHeight:28,
//     fontWeight:'400'
//   },
//   iconContainer: {
//     height:48,
//     backgroundColor: '#6A5ACD',
//     borderRadius: 10,
//     padding: 10,
//   },
// });

// export default AnnouncementSearchBar;

// import React, { useState } from 'react';
// import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { SearchIcon } from '../../assets';
// import { useTheme } from '../../config/theme';

// const AnnouncementSearchBar = ({placeholderTextColor}) => {

//     const colors = useTheme();
//     const [text, setText] = useState('');
//   return (
//     <View style={styles.container}>
//       <View style={styles.searchBarContainer}>
//         <TextInput
//           style={styles.textInput}
//           onChangeText={inputText => setText(inputText)}
//                   value={text}
//                   placeholder="Search Announcements"
//                   onSubmitEditing={() => onSubmit(text)}
//                   placeholderTextColor={placeholderTextColor}
//         />
//       </View>
//       <TouchableOpacity style={styles.iconContainer}>
//       <SearchIcon />
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     // alignItems: 'center',
//   },
//   searchBarContainer: {
//     // justifyContent:'center',
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     borderWidth:1,
//     borderColor:"rgba(219, 219, 218, 1)",
//   },
//   textInput: {
//     height: 48,
//     marginLeft: 10,
//     alignItems:"center",
//     // flex: 1,
//     fontSize: 16,
//     lineHeight:28,
//     fontWeight:'400'
//   },
//   iconContainer: {
//     backgroundColor: '#6A5ACD',
//     borderRadius: 10,
//     padding: 10,
//   },
// });

// export default AnnouncementSearchBar;

//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useTheme} from '../../config/theme';
import {SearchIcon, WhiteSearchIcon} from '../../assets';

// create a component
const AnnouncementSearchBar = ({placeholderTextColor, placeholder,onSubmit,onChangeText,value}) => {
  const colors = useTheme();
  const [text, setText] = useState('');
  return (
    <View style={{flexDirection: 'row'}}>
      <View
        style={{
          height: 48,
          // justifyContent: 'center',
          flex: 0.90,
          borderRadius: 8,
          borderColor: 'rgba(219, 219, 218, 1)',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderLeftWidth: 1,
        }}>
        <TextInput
          style={styles.textInput}
          // onChangeText={inputText => setText(inputText)}
          onChangeText={onChangeText}
          // value={text}
          value={value}
          placeholder={placeholder}
          // onSubmitEditing={() => onSubmit(text)}
          onSubmitEditing={onSubmit}
          placeholderTextColor={placeholderTextColor}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.appPrimary,
          flex: 0.15,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
          right: 10,
          width: 48,
        }}>
        <WhiteSearchIcon />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  textInput: {
    marginLeft: 10,
    fontSize: 16,
    // lineHeight: 28,
    fontWeight: '400',
    flex: 0.9,
    color: 'black',
  },
});

//make this component available to the app
export default AnnouncementSearchBar;
