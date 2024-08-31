//import liraries
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import {
  ButtonCross,
  ClosseCircle,
  CollaboratorBtn,
  DirectoryArrrowDown,
  Document,
  Left,
} from '../../../assets';
import {Button, Chip, CustomTextInput, Text} from '../../../components';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '../../../config/theme';
import {launchImageLibrary} from 'react-native-image-picker';

// create a component
const AddTask = ({navigation}) => {
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  const [flag, setFlag] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
  // const [logo, setlogo] = useState('');
  const [name, setName] = useState([]);
  const colors = useTheme();
  const openGallery = async () => {
    const images = await launchImageLibrary({...options, includeBase64: true});

    if (images.assets && images.assets.length > 0) {
      const newImages = images.assets
        .slice(0, 5 - selectedImage.length)
        .map((asset, idx) => {
          const originalFileName = asset.fileName;
          const fileExtension = originalFileName.split('.').pop(); // Extract file extension
          const newName = `${Date.now() + idx}.${fileExtension}`;
          return {
            uri: asset.uri,
            name: newName,
          };
        });
      setSelectedImage(prevImages => [...prevImages, ...newImages]);
    }
  };

  const options = {
    mediaType: 'photo',
    quality: 0.7,
    // maxWidth: 200,
    // maxHeight: 200,
  };

  // Function to remove a selected image
  const removeSelectedImage = index => {
    setSelectedImage(prevImages => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', marginTop: 30, alignItems: 'center'}}>
          <TouchableOpacity
            style={{marginRight: 14}}
            onPress={() => navigation.goBack()}>
            <Left />
          </TouchableOpacity>
          <View>
            <Text heading2>Add Task</Text>
          </View>
        </View>
        <ScrollView>
          <CustomTextInput
            placeholder={'Task Name'}
            mainStyle={{marginBottom: 16, marginTop: 24}}
          />
          <SelectDropdown
            //   data={releatedto}
            // defaultValueByIndex={1}
            // defaultValue={{
            //   title: 'England',
            //   image: require('./Images/England.jpg'),
            // }}
            onSelect={(selectedItem, index) => {
              // setDropDown(selectedItem);
            }}
            // buttonTextAfterSelection={(selectedItem, index) => {
            //   return selectedItem;
            // }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
            }}
            buttonStyle={{
              width: '100%',
              marginBottom: 16,
              backgroundColor: '#F6F5F5',
              // borderWidth: 1,
              // borderColor: 'rgba(233, 234, 233, 1)',
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#F6F5F5',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedItem ? 'black' : colors.appLight,
                    }}>
                    {selectedItem ? selectedItem : 'Assignee'}
                  </Text>
                  <DirectoryArrrowDown width={20} height={20} />
                </View>
              );
            }}
            // dropdownStyle={styles.dropdown3DropdownStyle}
            // rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 16,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          <CustomTextInput
            placeholder={'Start Date'}
            mainStyle={{marginBottom: 16}}
          />
          <CustomTextInput
            placeholder={'Due Date'}
            mainStyle={{marginBottom: 16}}
          />
          <SelectDropdown
            //   data={releatedto}
            // defaultValueByIndex={1}
            // defaultValue={{
            //   title: 'England',
            //   image: require('./Images/England.jpg'),
            // }}
            onSelect={(selectedItem, index) => {
              // setDropDown(selectedItem);
            }}
            // buttonTextAfterSelection={(selectedItem, index) => {
            //   return selectedItem;
            // }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
            }}
            buttonStyle={{
              width: '100%',
              marginBottom: 16,
              backgroundColor: '#F6F5F5',
              // borderWidth: 1,
              // borderColor: 'rgba(233, 234, 233, 1)',
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#F6F5F5',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedItem ? 'black' : colors.appLight,
                    }}>
                    {selectedItem ? selectedItem : 'Task status'}
                  </Text>
                  <DirectoryArrrowDown width={20} height={20} />
                </View>
              );
            }}
            // dropdownStyle={styles.dropdown3DropdownStyle}
            // rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 16,
                    }}>
                    {item}
                  </Text>
                </View>
              );
            }}
          />
          {/* <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:12}}>
            <Text>
                Collaborators
            </Text>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{marginRight:10}}>
              <CollaboratorBtn/>
              </View>
                <Text>
                    Add Collaborators
                </Text>
            </TouchableOpacity>
        </View> */}
          <SelectDropdown
            // data={selectedOption}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index, 'dsaasdasss');
              // if (!selectedEmployee.includes(selectedItem)) {
              //   if ((selectedEmployee.length + visitorsData.length) < data.capacity) {
              //     setSelectedEmployee(prevSelected => [
              //       ...prevSelected,
              //       selectedItem,
              //     ]);
              //     setEmployeeID(prevSelected => [
              //       ...prevSelected,
              //       selectedItem._id,
              //     ]);
              //   }
              // }
            }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
            }}
            buttonStyle={{
              width: '100%',
              marginBottom: flag ? 10 : 0,
              backgroundColor: '#F6F5F5',
              // borderWidth: 1,
              // borderColor: 'rgba(233, 234, 233, 1)',
              borderRadius: 8,
              paddingHorizontal: 10,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#F6F5F5',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.appLight,
                    }}>
                    {'Select Employee'}
                  </Text>
                  <DirectoryArrrowDown width={20} height={20} />
                </View>
              );
            }}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    alignItems: 'center',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 16,
                    }}>
                    {item.firstName.en} {item.lastName.en}
                  </Text>
                </View>
              );
            }}
          />
          <View style={styles.chipsContainer}>
            <View style={styles.column}>
              {selectedEmployee
                .slice(0, Math.ceil(selectedEmployee.length / 2))
                .map((employee, index) => (
                  <Chip
                    key={index}
                    Name={
                      employee?.firstName?.en + ' ' + employee?.lastName?.en
                    }
                    img={{uri: employee?.profilePicture}}
                    onPress={() => handleChipPress(index, employee._id)}
                  />
                ))}
            </View>
            <View style={styles.column}>
              {selectedEmployee
                .slice(Math.ceil(selectedEmployee.length / 2))
                .map((employee, index) => (
                  <Chip
                    key={index}
                    Name={
                      employee?.firstName?.en + ' ' + employee?.lastName?.en
                    }
                    img={{uri: employee?.profilePicture}}
                    onPress={() =>
                      handleChipPress(
                        index + Math.ceil(selectedEmployee.length / 2),
                        employee._id,
                      )
                    }
                  />
                ))}
            </View>
          </View>
          <CustomTextInput
            placeholder={'Description'}
            mainStyle={{height: 92, alignItems: 'flex-start'}}
          />
          {/* <View style={{marginBottom: 16, marginTop: 5}}> */}
          {/* {selectedImage ? (
              <TouchableOpacity
                onPress={openGallery}
                style={{height: 140, width: '100%'}}>
                <Image
                  source={{uri: selectedImage}}
                  style={{height: 140, width: '100%'}}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : ( */}
          {/* <TouchableOpacity
              style={{
                height: 52,
                width: '100%',
                borderWidth: 1,
                // marginHorizontal: 25,
                backgroundColor: colors.appPrimaryLight,
                borderStyle: 'dashed',
                borderColor: colors.appPrimary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={openGallery}>
              <Text regular body1 appPrimary>
                Upload Attachments
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <View>
          <Image
            source={{uri: selectedImage}}
            style={{height: 140, width: '100%'}}
            resizeMode="cover"
          />
          <Text>{name}</Text>
        </View> */}
          <View style={{marginTop: 5}}>
            {selectedImage.length < 5 && (
              <TouchableOpacity
                style={{
                  height: 52,
                  width: '100%',
                  borderWidth: 1,
                  backgroundColor: colors.appPrimaryLight,
                  borderStyle: 'dashed',
                  borderColor: colors.appPrimary,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={openGallery}>
                <Text regular body1 appPrimary>
                  Upload Attachments
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {/* {selectedImage.map((image, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() => removeSelectedImage(index)}
                style={{ height: 50,width:100,flexDirection:'row',alignItems:'center' }}>
                <Image
                  source={{ uri: image.uri }}
                  style={{ height: 50, width: 50,marginRight:10 }}
                  resizeMode="cover"
                />
                <View style={{flexDirection:'row'}}>
                  <View style={{marginRight:4}}>
                 <Text>{image.name}</Text>
                 </View>
                 <ClosseCircle/>
                 </View>
              </TouchableOpacity>
            </View>
          ))} */}
          <FlatList
            data={selectedImage.slice(0, 5)}
            renderItem={({item, index}) => (
              <View key={index}>
                <TouchableOpacity
                  onPress={() => removeSelectedImage(index)}
                  style={{
                    height: 50,
                    width: 150,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingHorizontal: 5,
                  }}>
                  <Image
                    source={{uri: item.uri}}
                    style={{height: 50, width: 50, marginRight: 10}}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <View style={{flex: 1, marginRight: 4}}>
                      <Text numberOfLines={1}>{item.name}</Text>
                    </View>
                    <ClosseCircle />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            numColumns={2}
          />
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 16,
          backgroundColor: 'white',
        }}>
        <Button
          buttonStyle={{flex: 0.42}}
          title={`Back`}
          onPress={() => navigation.goBack()}
        />
        <Button
          buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
          title={`Save`}
          textStyles={{color: colors.whiteBackground}}
          // onPress={resendPressed}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  chipsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
});

//make this component available to the app
export default AddTask;
