 /**
 * login modal component
 * @param param0 props accepted by this component
 * @returns React Component
 */
 import React, {useEffect, useState} from 'react';
 import {View} from 'react-native';
 import Modal from 'react-native-modal';
 import {Text, Button} from '..';
 import {useTheme} from '../../config/theme';
import CalendarPicker from 'react-native-calendar-picker';
 
 const CalenderModal = props => {
   const {
     visible,
     onSwipeComplete,
     swipeDown = true,
     onBackdropPress = false,
     Cancel,
     onDeactive,
     date,
     onSaveDate,
   } = props;


   const colors = useTheme();
   const [selectedDate, setSelectedDate] = useState(null);
   /** line component */
   const Line = () => {
     return (
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
     );
   };

   const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const goBack = () =>{
    onSwipeComplete()
  }
 
  const minDate = new Date();

  const savePressed = () => {
    onSaveDate(selectedDate);
    onSwipeComplete();
  };


   return (
     <Modal
       isVisible={visible}
       {...(swipeDown ? {swipeDirection: 'down'} : {})}
       style={{
         justifyContent: 'flex-end',
         margin: 0,
       }}
       backdropOpacity={0.5}
       onBackdropPress={() => {
         onBackdropPress && onSwipeComplete();
       }}
       onSwipeComplete={() => onSwipeComplete()}>
       <View
         style={{
           backgroundColor: colors.whiteBackground,
           borderRadius: 6,
           borderTopLeftRadius: 24,
           borderTopRightRadius: 24,
         }}>
         {swipeDown === true && <Line />}
        <View style={{marginTop:15}}>
         <CalendarPicker onDateChange={handleDateChange}
         minDate={minDate}
         selectedDayColor={colors.appPrimaryLight}
         todayBackgroundColor={colors.appPrimaryLight}
         previousTitleStyle={{color:'black'}}
        //  previousTitle={'Last'}
        //  nextTitle={'Next'}
         nextTitleStyle={{color:'black'}}
        //  textStyle={{width:50}}
        // //  customDatesStyles={[{containerStyle: {marginRight:30}, style: {}, textStyle:{}}]}
        //  customDayHeaderStyles={[{style: {width:50}, textStyle: {fontSize:20}}]} 
        scaleFactor={400}
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
 
 export default CalenderModal;
 