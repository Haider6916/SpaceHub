// import React, {useState} from 'react';
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   Pressable,
// } from 'react-native';
// import {ArrowDown, CheckedIn, DummyImg, ThreeDots} from '../../assets';
// import {
//   DeactivateModal,
//   DeleteModal,
//   Status,
//   Text,
//   ThreeDot,
//   UpdateAnn,
// } from '..';
// import SelectDropdown from 'react-native-select-dropdown';
// import {useTheme} from '../../config/theme';

// function EventCard(props, navigation) {
//   const {
//     image,
//     imgStyle,
//     Title,
//     description,
//     BottomTitle,
//     BottomSubText,
//     onPress,
//     Check = false,
//     isActive = false,
//     onPressView,
//     onPessEdit,
//   } = props;

//   const [showDropdown, setShowDropdown] = useState(false);
//   const [deleteModal, setDeleteModal] = useState(false);
//   const [deactivateModal, setDeactivateModal] = useState(false);
//   const colors = useTheme();
//   const [showFullDescription, setShowFullDescription] = useState(false);
//   const numberOfLines = showFullDescription ? undefined : 3;

//   const handlePress = () => {
//     setShowDropdown(!showDropdown);
//   };

//   const handleOptionPress = option => {
//     // Handle the selected option here
//     console.log('Selected option:', option);
//     if (option === 'Option 1') {
//       setDeleteModal(true);
//       setShowDropdown(false);
//     } else if (option === 'Option 2') {
//       setDeactivateModal(true);
//       setShowDropdown(false);
//     }
//     // You can perform any action based on the selected option
//   };

//   const onDeletePressed = () => {
//     setGoForRemove(true);
//     setDeleteModal(false);
//   };

//   const options = [
//     {id: 1, label: 'Update Visitor'},
//     {id: 2, label: 'Delete Visitor'},
//   ];

//   return (
//     <Pressable style={styles.container} onPress={() => setShowDropdown(false)}>
//       <View style={{flexDirection: 'row'}}>
//         <View>
//           <Image
//             source={DummyImg}
//             style={[
//               {
//                 marginTop: 24,
//                 height: 64,
//                 width: 64,
//                 borderRadius: 16,
//                 borderColor: 'rgba(159, 157, 158, 1)',
//                 borderWidth: 1,
//               },
//               imgStyle,
//             ]}
//           />
//         </View>
//         <View style={{marginTop: 24, flex: 0.95, paddingLeft: 24}}>
//           <Text
//             regular
//             title4
//             style={{lineHeight: 24, fontWeight: '500'}}
//             appPrimary
//             numberOfLines={1}>
//             Event title
//           </Text>
//           <Text
//             regular
//             body1
//             appLight
//             style={{lineHeight: 24}}
//             numberOfLines={1}>
//             Seats left: 4/24
//           </Text>
//         </View>

//         <SelectDropdown
//           data={options}
//           onSelect={(selectedItem, index) => {
//             if (selectedItem.id === 1) {
//               console.log('====================================');
//               console.log('Update Pressed');
//               console.log('====================================');
//             } else {
//               onPress();
//             }
//           }}
//           rowStyle={{
//             backgroundColor: 'white',
//             borderBottomColor: 'rgba(233, 234, 233, 1)',
//             height: 56,
//           }}
//           buttonStyle={{
//             marginTop: 24,
//             height: 48,
//             width: 48,
//             marginBottom: 16,
//             backgroundColor: 'white',
//             borderRadius: 51,
//           }}
//           renderCustomizedButtonChild={(selectedItem, index) => {
//             return (
//               <View
//                 style={[
//                   {
//                     borderRadius: 26,
//                     overflow: 'hidden',
//                     shadowColor: '#000',
//                     shadowOffset: {
//                       width: 0,
//                       height: 2,
//                     },
//                     shadowOpacity: 0.25,
//                     shadowRadius: 4,
//                     elevation: 5,
//                     backgroundColor: '#fff',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   },
//                 ]}>
//                 <ThreeDots />
//               </View>
//             );
//           }}
//           dropdownStyle={{
//             width: 200,
//             position: 'absolute',
//             left: '35%',
//             marginTop: 3,
//           }}
//           renderCustomizedRowChild={(item, index) => {
//             return (
//               <View
//                 style={{
//                   alignItems: 'center',
//                   flexDirection: 'row',
//                   backgroundColor: 'white',
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     marginLeft: 16,
//                   }}>
//                   {item.label}
//                 </Text>
//               </View>
//             );
//           }}
//         />
//       </View>
//       <View style={{marginTop: 8}}>
//         <Text body1 regular>
//           Start date: 00/01/2022
//         </Text>
//       </View>
//       <View style={{marginTop: 8}}>
//         <Text body1 regular>
//           from 4 AM to 8 PM
//         </Text>
//       </View>
//       <View style={{marginTop: 8}}>
//         <Text body1 regular appLight>
//           Duration: 3 hours
//         </Text>
//       </View>
//       <View style={{marginTop: 8}}>
//         <Text body1 regular>
//           3rd Floor, Board room, 2'nd Area
//         </Text>
//       </View>
//       <View style={{marginTop: 8}}>
//         <Text body1 regular numberOfLines={numberOfLines}>
//           {description}
//         </Text>
//         {!showFullDescription && (
//           <TouchableOpacity
//             onPress={() => setShowFullDescription(true)}
//             style={styles.readMoreButton}>
//             <Text>Read More</Text>
//           </TouchableOpacity>
//         )}
//         {showFullDescription && (
//           <TouchableOpacity
//             onPress={() => setShowFullDescription(false)}
//             style={styles.readMoreButton}>
//             <Text>Read Less</Text>
//           </TouchableOpacity>
//         )}
//       </View>
//       <View style={{marginTop: 8}}>
//         <Text body1 regular appPrimary>
//           Link on map
//         </Text>
//       </View>
//       <View style={{marginTop: 16, flexDirection: 'row', alignItems: 'center'}}>
//         <View style={{flexDirection: 'row', flex: 0.4}}>
//           <Image
//             source={DummyImg}
//             resizeMode="contain"
//             style={{height: 40, width: 40, borderRadius: 22}}
//           />
//           <Image
//             source={DummyImg}
//             resizeMode="contain"
//             style={{height: 40, width: 40, borderRadius: 22, right: 25}}
//           />
//           <Image
//             source={DummyImg}
//             resizeMode="contain"
//             style={{height: 40, width: 40, borderRadius: 22, right: 50}}
//           />
//           <Image
//             source={DummyImg}
//             resizeMode="contain"
//             style={{height: 40, width: 40, borderRadius: 22, right: 75}}
//           />
//         </View>
//         <View style={{flex: 0.17, backgroundColor: 'red'}}>
//           <Text caption1 regular>
//             + 12
//           </Text>
//         </View>
//         <View>
//           <Text body2 regular appPrimary>
//             view all
//           </Text>
//         </View>
//       </View>
//     </Pressable>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'transparent',
//     borderRadius: 8,
//     // overflow: 'hidden',
//     shadowColor: 'rgba(2, 0, 1, 0.1)',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 4,
//     height: 408,
//     paddingHorizontal: 10,
//     zIndex: 1,
//   },
//   image: {
//     width: '100%',
//     height: 200,
//     resizeMode: 'cover',
//   },
//   content: {
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   description: {
//     fontSize: 16,
//     color: 'gray',
//   },
//   dropdown: {
//     position: 'absolute',
//     top: 80,
//     right: 10,
//     backgroundColor: '#fff',
//     borderRadius: 4,
//     padding: 8,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//     zIndex: 20,
//     width: '50%',
//   },
//   option: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(233, 234, 233, 1)',
//   },
//   optionText: {
//     fontSize: 16,
//   },
//   statusContainer: {
//     zIndex: 1,
//   },
//   readMoreButton: {
//     color: 'blue',
//     marginTop: 8,
//   },
// });

// export default EventCard;

import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import {ArrowDown, CheckedIn, DummyImg, ThreeDots} from '../../assets';
import {
  DeactivateModal,
  DeleteModal,
  Status,
  Text,
  ThreeDot,
  UpdateAnn,
} from '..';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '../../config/theme';
import { MoreOrLess } from "@rntext/more-or-less";

// Enable layout animations on Android
if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

function EventCard(props, navigation) {
  const {
    image,
    imgStyle,
    Title,
    description,
    BottomTitle,
    BottomSubText,
    onPress,
    Check = false,
    isActive = false,
    onPressView,
    onPessEdit,
    Seatsleft,
    TotalSeats,
    StartDate,
    From,
    To,
    Duration,
    Area,
    imageData,
    Update,
    ViewAll,
    handleLinkOnMapPress,
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
// State to track if card is expanded


  const options = [
    {id: 1, label: 'Edit Event'},
    {id: 2, label: 'Delete Event'},
  ];

  return (
    <Pressable
      style={styles.container}
      onPress={() => setShowDropdown(false)}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={image}
            style={[
              {
                marginTop: 24,
                height: 64,
                width: 64,
                borderRadius: 16,
                borderColor: 'rgba(159, 157, 158, 1)',
                borderWidth: 1,
              },
              imgStyle,
            ]}
          />
        </View>
        <View style={{marginTop: 24, flex: 0.95, paddingLeft: 24}}>
          <Text
            regular
            title4
            style={{lineHeight: 24, fontWeight: '500'}}
            appPrimary
            numberOfLines={1}>
            {Title}
          </Text>
          <Text
            regular
            body1
            appLight
            style={{lineHeight: 24}}
            numberOfLines={1}>
            Seats left: {Seatsleft}/{TotalSeats}
          </Text>
        </View>

        <SelectDropdown
          data={options}
          onSelect={(selectedItem, index) => {
            if (selectedItem.id === 1) {
              Update();
            } else if (selectedItem.id === 2) {
              onPress();
            }
            else{
              console.log('====================================');
              console.log('errreee');
              console.log('====================================');
            }
          }}
          rowStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'rgba(233, 234, 233, 1)',
            height: 56,
          }}
          buttonStyle={{
            marginTop: 24,
            height: 48,
            width: 48,
            marginBottom: 16,
            backgroundColor: 'white',
            borderRadius: 51,
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View
                style={[
                  {
                    borderRadius: 26,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                    backgroundColor: '#fff',
                    justifyContent: 'center',
                    alignItems: 'center',
                  },
                ]}>
                <ThreeDots />
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
                  backgroundColor: 'white',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 16,
                  }}>
                  {item.label}
                </Text>
              </View>
            );
          }}
        />
      </View>
      <View style={{marginTop: 8}}>
        <Text body1 regular>
          Start date: {StartDate}
        </Text>
      </View>
      <View style={{marginTop: 8}}>
        <Text body1 regular>
          from {From} to {To}
        </Text>
      </View>
      <View style={{marginTop: 8}}>
        <Text body1 regular appLight>
          Duration: {Duration}
        </Text>
      </View>
      <View style={{marginTop: 8}}>
        <Text body1 regular>
          {Area}
        </Text>
      </View>
      <View style={{ marginTop: 8 }}>
      <MoreOrLess
      numberOfLines={3}
      // textComponent={CustomText}
      moreText={'See More'}
      lessText={'Hide'}
      textButtonStyle={{ color:'rgba(141, 85, 162, 1)',fontWeight:'400',fontSize:16}}
      animated
      textStyle={{color:'black',fontWeight:'400',fontSize:16}}
    >
       {description}
    </MoreOrLess>
</View>
<View style={{ marginTop: 8 }}>
<TouchableOpacity onPress={handleLinkOnMapPress}>
<Text body1 regular appPrimary>
  Link on map
</Text>
</TouchableOpacity>
</View>
      <View
        style={{
          // marginTop: 16,
          flexDirection: 'row',
          alignItems: 'center',
          height:60,
        }}>
        <View >
          {imageData && (
            <View style={{flexDirection: 'row'}}>
              {imageData.slice(0, 4).map((image, index) => (
                <Image
                  key={index}
                  source={{uri: image.profilePicture}}
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 22,
                    right: 25 * index,
                  }}
                />
              ))}
              {imageData.length > 4 && (
                <View style={{justifyContent: 'center', marginLeft: -30}}>
                  <Text caption1 regular>
                    +{imageData.length - 4}
                  </Text>
                </View>
              )}
              {imageData.length > 0 && (
                <TouchableOpacity style={{justifyContent: 'center', marginLeft: 10}} onPress={ViewAll}>
                  <Text body2 regular appPrimary>
                    view all
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    shadowColor: 'rgba(2, 0, 1, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    height: 'auto',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
  },
  dropdown: {
    position: 'absolute',
    top: 80,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 20,
    width: '50%',
  },
  option: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(233, 234, 233, 1)',
  },
  optionText: {
    fontSize: 16,
  },
  statusContainer: {
    zIndex: 1,
  },
  toggleText: {
    color: 'blue',
    marginTop: 8,
  },
  readMoreButton: {
    color: '#8D55A2',
    marginTop: 8,
  },
});

export default EventCard;
