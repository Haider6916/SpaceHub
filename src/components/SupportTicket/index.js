import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Pressable,
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

function SupportTicket(props, navigation) {
  const {
    image,
    imgStyle,
    Title,
    description,
    BottomTitle,
    BottomSubText,
    onPress,
    Check = true,
    isActive = false,
    onPressView,
    onPessEdit,
    dropDownCheck = true,
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deactivateModal, setDeactivateModal] = useState(false);
  const colors = useTheme();

  const handlePress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionPress = option => {
    // Handle the selected option here
    console.log('Selected option:', option);
    if (option === 'Option 1') {
      setDeleteModal(true);
      setShowDropdown(false);
    } else if (option === 'Option 2') {
      setDeactivateModal(true);
      setShowDropdown(false);
    }
    // You can perform any action based on the selected option
  };

  const onDeletePressed = () => {
    setGoForRemove(true);
    setDeleteModal(false);
  };

  const options = [
    {id: 1, label: 'Open Ticket'},
    {id: 2, label: 'Escalate to Spacehub'},
  ];

  return (
    <Pressable style={styles.container} onPress={() => setShowDropdown(false)}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Image
            source={image}
            // source={DummyImg}
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
            numberOfLines={1}>
            {Title}
            {/* Person Name */}
          </Text>
          <Text
            regular
            body1
            style={{lineHeight: 24}}
            numberOfLines={1}>
            {description}
            {/* Company name */}
          </Text>
        </View>
        {/* <ThreeDot onPress={handlePress} />
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.option} onPress={onPressView}>
              <Text style={styles.optionText}>View Employee</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={onPessEdit}>
              <Text style={styles.optionText}>Update Employee</Text>
            </TouchableOpacity>
          </View>
        )} */}

      {dropDownCheck ?  (<SelectDropdown
          data={options}
          // defaultValueByIndex={1}
          // defaultValue={{
          //   title: 'England',
          //   image: require('./Images/England.jpg'),
          // }}
          onSelect={(selectedItem, index) => {
            if (selectedItem.id === 1) {
              // navigation.navigate(AUTH.ADDEMPLOYEE);
              onPressView()
            } else {
              // navigation.navigate(AUTH.ADDCOMPANY);
              onPessEdit()
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
            marginTop: 24,
            height: 48,
            width: 48,
            marginBottom: 16,
            backgroundColor: 'white',
            // borderWidth: 1,
            // borderColor: 'rgba(233, 234, 233, 1)',
            borderRadius: 51,
            // paddingHorizontal: 10,
          }}
          renderCustomizedButtonChild={(selectedItem, index) => {
            return (
              <View
                style={[
                  {
                    // marginTop: 24,
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
          // rowStyle={styles.dropdown3RowStyle}
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
        />) : (<></>) }  
     
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 0.98, marginLeft: 10}}>
          <Text
            regular
            body1
            style={{lineHeight: 24, marginTop: 8}}
            numberOfLines={1}>
            {BottomTitle}
            {/* Visitors Module */}
          </Text>
          <Text body1 regular style={{lineHeight: 24}} >
            {BottomSubText}
            {/* Aug 21  */}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          {Check ? (<View style={{width:110,height:32,borderRadius:50,justifyContent:'center',alignItems:'center',backgroundColor:'rgb(254, 242, 223)'}}>
              <Text body1 regular style={{color:'rgb(249, 146, 0)'}}>
              Pending
              </Text>
              </View>) : (<Status text={`Done`}/>)}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderRadius: 8,
    // overflow: 'hidden',
    shadowColor: 'rgba(2, 0, 1, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    height: 172,
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
});

export default SupportTicket;
