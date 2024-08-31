//import liraries
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Button, CustomTextInput, Text } from '../../../components';
import { GeneralResponses } from '../../../services/responses';
import { useSelector } from 'react-redux';
import { API, useFetchPost } from '../../../services';
import { Left } from '../../../assets';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BaseStyle } from '../../../config/styles';
import SimpleToast from 'react-native-simple-toast';
// create a component
const AnnouncementsForm = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState([]);
    const [description, setDescription] = useState('');
    const [goForApi, setGoFoApi] = useState(false);
    const userAccessToken = useSelector(state => state.user.userAccessToken);

     /** api call for signin */
  const announcemeent = useFetchPost(
    API.CREATE_ANNOUNCEMENT,
    {
        title: title,
        tags: tag,
        description:description,
    },
    goForApi,
    userAccessToken,
  );

useEffect(() => {
    if (!announcemeent.loading) {
      if (announcemeent.response?.status === 201) {
        Keyboard.dismiss();
         SimpleToast.show('Annuouncement Created Successfully', SimpleToast.BOTTOM )
         setTimeout(() => {
          navigation.navigate('Home');
        }, 2000);
      }
      else if(announcemeent.response?.status === 500){
        SimpleToast.show('Please add Title', SimpleToast.BOTTOM );
      }
      else
      {
        console.log('Add Announcement Error');
      }
    }
    setGoFoApi(false);
  }, [announcemeent.loading]);


   /**
   * function called onpress Creeate
   */
   const create = () => {
    setGoFoApi(true);
   
  };

    return (
        
        <View style={[BaseStyle.container,BaseStyle.safeAreaView]}>
          <TouchableOpacity
        style={{marginTop: 20, marginBottom: 23}}
        onPress={() => navigation.goBack()}>
        <Left />
      </TouchableOpacity>
      <View style={{marginBottom: 8}}>
        <Text bold blackColor heading2>
          {`Create Announcements`}
        </Text>
      </View>
         <CustomTextInput
            placeholder="title"
            value={title}
            onChangeText={setTitle}
            autoCapitalize={'none'}
            // keyboardType={'email-address'}
            placeholderTextColor={'rgba(86, 85, 86, 1)'}
            maxLength={50}
          />

<CustomTextInput
            placeholder="tag"
            value={tag}
            onChangeText={setTag}
            autoCapitalize={'none'}
            // keyboardType={'email-address'}
            placeholderTextColor={'rgba(86, 85, 86, 1)'}
            maxLength={5}
          />
          <CustomTextInput
            placeholder="description"
            value={description}
            onChangeText={setDescription}
            autoCapitalize={'none'}
            // keyboardType={'email-address'}
            placeholderTextColor={'rgba(86, 85, 86, 1)'}
            maxLength={500}
          />
          <Button onPress={create}
          title='Save'
          />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default AnnouncementsForm;
