//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  BackHandler,
  FlatList,
} from 'react-native';
import {ArrowDown, Left, NoEmployee} from '../../../assets';
import {BaseStyle} from '../../../config/styles';
import {
  AddButton,
  BulkAddModal,
  Button,
  ButtonDropDown,
  DeleteModal,
  EmployeeCard,
  Text,
} from '../../../components';
import {useTheme} from '../../../config/theme';
import {AUTH} from '../../../navigation/ROUTES';
import Modal from 'react-native-modal';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {useSelector} from 'react-redux';
import {GeneralResponses} from '../../../services/responses';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import SelectDropdown from 'react-native-select-dropdown';

const Dropdown = ({
  isVisible,
  toggleDropdown,
  onPress1,
  onPress2,
  onBackdropPress = false,
}) => {
  const {width, height} = Dimensions.get('window');
  const topDistance = height * 0.12;
  const leftDistance = width * 0.2;

  return (
    <Modal
      visible={isVisible}
      backdropOpacity={0.5}
      onBackdropPress={() => {
        onBackdropPress;
      }}>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: 'center',
          position: 'absolute',
          // top:topDistance,
          // left:leftDistance,
          top: topDistance,
          left: leftDistance,
        }}
        onPress={toggleDropdown}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            height: 112,
            width: 342,
          }}>
          <TouchableOpacity
            onPress={onPress1}
            style={{
              height: 56,
              borderBottomWidth: 1,
              borderBottomColor: `rgba(233, 234, 233, 1)`,
              padding: 14,
            }}>
            <Text regular body1>
              Bulk Add
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPress2}
            style={{height: 56, padding: 14}}>
            <Text regular body1>
              One employee
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// create a component
const AddCEmployee = ({navigation, route}) => {
  const router = useRoute();
  const [bulkAdd, setBulkAdd] = useState(false);
  const colors = useTheme();
  const [data, setData] = useState([]);
  const name = route?.params?.name;
  const id = route?.params?.id;
  console.log('====================================');
  console.log(name, id);
  console.log('====================================');

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (router.name === AUTH.ADDCEMPLOYEE) {
          return true;
        } else {
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [router]),
  );

  const [isVisible, setIsVisible] = useState(false);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const Pressed1 = () => {
    setBulkAdd(true);
    setIsVisible(false);
  };

  const Pressed2 = () => {
    navigation.navigate(AUTH.ONEEMPLOYEEE);
    setIsVisible(false);
  };

  const options = [
    {id: 1, label: 'Bulk Add'},
    {id: 2, label: 'One employee'},
  ];

  const onSelectOption = option => {
    if (option.id === 1) {
      setBulkAdd(true);
    } else {
      navigation.navigate(AUTH.ONEEMPLOYEEE, {
        name: name,
      });
    }
  };

  const apiDataHandle = data => {
    setData(data);
  };
  return (
    <>
      <Dropdown
        isVisible={isVisible}
        toggleDropdown={toggleDropdown}
        onPress1={Pressed1}
        onPress2={Pressed2}
        onBackdropPress
      />
      <BulkAddModal
        visible={bulkAdd}
        navigation={navigation}
        onSwipeComplete={() => setBulkAdd(false)}
        Cancel={() => setBulkAdd(false)}
        onBackdropPress
        id={id}
        apiDataHandle={apiDataHandle}
      />
      <SafeAreaView style={[BaseStyle.safeAreaView]}>
        <ScrollView contentContainerStyle={{flex: 1,paddingHorizontal:24, marginTop: 40}}>
          <View
            style={{
              // marginBottom: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between'
            }}>
            <View style={{flex: 0.8}}>
              <Text regular appPrimary body1 style={{lineHeight: 21}}>
                5/5 step
              </Text>
            </View>
            <SelectDropdown
            data={options}
            // defaultValueByIndex={1}
            // defaultValue={{
            //   title: 'England',
            //   image: require('./Images/England.jpg'),
            // }}
            onSelect={(selectedItem, index) => {
              if (selectedItem.id === 1) {
                setBulkAdd(true);
              } else {
                navigation.navigate(AUTH.ONEEMPLOYEEE, {
                  name: name,
                });
              }
            }}
            // buttonTextAfterSelection={(selectedItem, index) => {
            //   return selectedItem;
            // }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
              height: 56,
            }}
            buttonStyle={{
              width: 163,
              height: 32,
              // marginBottom: 16,
              backgroundColor: colors.appPrimary,
              // borderWidth: 1,
              // borderColor: 'rgba(233, 234, 233, 1)',
              borderRadius: 51,
              // paddingHorizontal: 10,
            }}
            renderCustomizedButtonChild={(selectedItem, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: colors.appPrimary,
                    height: 32,
                    width: '100%',
                    marginHorizontal: 2,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: 'white',
                      lineHeight: 28,
                      fontWeight: '500',
                    }}>
                    {`Add employee`}
                  </Text>
                  <ArrowDown width={20} height={20} />
                </View>
              );
            }}
            dropdownStyle={{
              width: 200,
              position: 'absolute',
              left: '35%',
              marginTop: 3,
            }}
            // rowStyle={styles.dropdown3RowStyle}
            renderCustomizedRowChild={(item, index) => {
              return (
                <View
                  style={{
                    // alignItems: 'center',
                    // flexDirection: 'row',
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
            {/* <ButtonDropDown
              options={options}
              onSelect={onSelectOption}
              mainText={`Add employee`}
              mainStyle={{zIndex: 10,}}
              btnStyle={{
                backgroundColor: colors.appPrimary,
                width: 163,
                height: 32,
              }}
              mainTextStyle={{color: '#fff', fontSize: 15}}
              StyleDrop={{right: '-40%'}}
            /> */}
            {/* <AddButton
            btnstyle={{width: 163, height: 40}}
            btnTxt={`Add employee`}
            Svg={<ArrowDown />}
            // onPress={() => navigation.navigate(AUTH.ONEEMPLOYEEE)}
            onPress={toggleDropdown}
          /> */}
          </View>
          {data ? (

            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <NoEmployee />
            </View>
            
          ) : (
            <View>
              <FlatList
                data={data}
                keyExtractor={(item, index) => item.id || index.toString()}
                renderItem={({item}) => {
                  return (
                    <EmployeeCard
                      image={{uri: item?.profilePicture}}
                      Title={item?.firstName?.en + item?.lastName?.en}
                      description={item?.role}
                      BottomTitle={item?.profession?.en}
                      BottomSubText={item?.role}
                      onPress={() => EmployeePressed(item._id)}
                    />
                  );
                }}
              />
            </View>
          )}

          {/**/}
        </ScrollView>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 15,
            // paddingHorizontal:24
            marginHorizontal:24
          }}>
          <Button
            title="Next"
            buttonStyle={{backgroundColor: colors.appPrimary, flex: 1}}
            textStyles={{color: colors.whiteBackground}}
            onPress={() => navigation.navigate(AUTH.CONGRATS)}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    
  },
});

//make this component available to the app
export default AddCEmployee;
