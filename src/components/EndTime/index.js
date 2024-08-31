 /**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
 import React, {useEffect, useState} from 'react';
 import {View,Dimensions} from 'react-native';
 import Modal from 'react-native-modal';
 import {Text, Button} from '..';
 import {useTheme} from '../../config/theme';
import CalendarPicker from 'react-native-calendar-picker';
import DateTimePicker from '@mohalla-tech/react-native-date-time-picker';
 
 const EndTime = props => {
   const {
     visible,
     onSwipeComplete,
    //  swipeDown = true,
     onBackdropPress = false,
     Cancel,
     onDeactive,
     onSaveDate,
   } = props;


   const colors = useTheme();
  //  const initialDate = new Date(1950, 6, 15, 7, 30);
   const [time, setTime] = useState(new Date());
   


   const onTimeChange = (selectedTime) => setTime(selectedTime);

   const height = Dimensions.get('window').height;

   /** line component */
   const Line = () => {
     return (
        <View style={{flex:0.8}}>
       <View
         style={{
           height: 4,
           backgroundColor: colors.blackColor,
           width: 100,
           alignSelf: 'center',
           borderRadius: 10,
           marginTop: 28,
         }}
       />
       </View>
     );
   };



  const goBack = () =>{
    onSwipeComplete()
  }
 

  const savePressed = () => {
    onSaveDate(time);
    onSwipeComplete();
  };



   return (
     <Modal
       isVisible={visible}
      //  {...(swipeDown ? {swipeDirection: 'down'} : {})}
       style={{
         justifyContent: 'flex-end',
         margin: 0,
       }}
       backdropOpacity={0.5}
       onBackdropPress={() => {
         onBackdropPress 
       }}
       onSwipeComplete={() => onSwipeComplete()}
       >
       <View
         style={{
           backgroundColor: colors.whiteBackground,
           borderRadius: 6,
           borderTopLeftRadius: 24,
           borderTopRightRadius: 24,
           height:height / 1.8,
         }}>
         {<Line />}
         <View style={{marginBottom:20,flex:1}}>
            <DateTimePicker
                mode="time"
                is24Hour={false}
                initialValue={time}
                onChange={onTimeChange}
                // minuteInterval={15}
            />
        </View>
        <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 15,
        }}>
        <Button
          buttonStyle={{flex: 0.42}}
          title={`Back`}
          onPress={goBack}
        />
        <Button
          buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
          title={`Save`}
          textStyles={{color: colors.whiteBackground}}
            onPress={savePressed}
        />
      </View>
       </View>
     </Modal>
   );
 };
 
 export default EndTime;
 