// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';

// const CustomButton = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleOptionSelected = (option) => {
//     console.log('Selected Option:', option);
//     setIsOpen(false);
//   };

//   return (
//     <View>
//       {/* Plus or Cross button */}
//       <TouchableOpacity onPress={handleToggle} style={{ padding: 10 }}>
//         {isOpen ? <Text>X</Text> : <Text>+</Text>}
//       </TouchableOpacity>

//       {/* Dropdown options */}
//       {isOpen && (
//         <View>
//           <TouchableOpacity onPress={() => handleOptionSelected('Option 1')} style={{ padding: 10 }}>
//             <Text>Option 1</Text>
//           </TouchableOpacity>
//           <TouchableOpacity onPress={() => handleOptionSelected('Option 2')} style={{ padding: 10 }}>
//             <Text>Option 2</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CustomButton;

import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Text } from '..';
import { ButtonCross, ButtonPlus } from '../../assets';
import { AUTH } from '../../navigation/ROUTES';

const CustomButton2 = ({
  navigation,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelected = (option) => {
    console.log('Selected Option:', option);
    console.log('Selected Option:', option);
    if(option === 'Option 1') {
      navigation.navigate('Booking')
      setIsOpen(false);
    }
    else if(option === 'Option 2'){
      navigation.navigate(AUTH.ADDTASK)
      setIsOpen(false);
    }
  };

  const windowHeight = Dimensions.get('window').height;

  return (
    <View>
      <TouchableOpacity onPress={handleToggle} >
        {isOpen ?
        <View style={styles.buttonClose} >
             <ButtonCross/>
        </View> : 
          <View style={styles.button} >
 <ButtonPlus/>
     </View>
        }
      </TouchableOpacity>

      {/* Dropdown options */}
      {isOpen && (
        <View
          style={[
            styles.dropdown,
            {
              bottom: 100 // Adjust the factor (0.2) as needed
            },
          ]}
        >
          <TouchableOpacity onPress={() => handleOptionSelected('Option 1')} style={styles.option}>
            <Text body2 appPrimary>Booking meeting rooom</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleOptionSelected('Option 2')} style={styles.option2}>
            <Text body2 appPrimary>Create new task</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    position: 'absolute',
    right:10,
    // top:200,
    bottom:10,
    backgroundColor:'rgba(141, 85, 162, 1)',
    height:55,
    width:55,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
    // left:10,
    // bottom:-400,
  },
  buttonClose:{
    padding: 10,
    position: 'absolute',
    right:10,
    // top:-200,
    bottom:10,
    backgroundColor:'rgba(238, 229, 241, 1)',
    height:55,
    width:55,
    borderRadius:40,
    justifyContent:'center',
    alignItems:'center',
  },
  dropdown: {
    position: 'absolute',
    right: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgba(233, 234, 233, 1)',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 221,
    height:136,
    zIndex: 1,
  },
  option: {
    paddingTop:8,
    height:50,
    borderBottomWidth:1,
    borderColor:'rgba(233, 234, 233, 1)'
  },
  option2:{
    paddingTop:24,
    height:50,
  }
});

export default CustomButton2;

