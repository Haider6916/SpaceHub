//import liraries
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {AddRing, DirectoryArrrowDown, Left} from '../../../assets';
import {
  AddVisitorModal,
  Button,
  Chip,
  ConfrirmModal,
  Text,
} from '../../../components';
import SelectDropdown from 'react-native-select-dropdown';
import {useTheme} from '../../../config/theme';
import {useSelector} from 'react-redux';
import {API, useFetchGet, useFetchPost} from '../../../services';
import {GeneralResponses} from '../../../services/responses';
import MultiSelect from 'react-native-multiple-select';


// create a component
const AddAttendes = ({navigation, route}) => {
  const [visitors, setVisitors] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [skip, setskip] = useState(1);
  const [limit, setLimit] = useState(10);
  const [goForGetApiCall, setGoForGetApiCall] = useState(true);
  const userAccessToken = useSelector(state => state.user.userAccessToken);
  const [companyData, setCompnayData] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [companyId, setCompanyId] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState([]);
  console.log('====================================selectedEmployee');
  console.log(selectedEmployee);
  console.log('====================================');
  const [visitorsData, setvisitorsData] = useState([]);
  console.log('====================================');
  console.log(visitorsData);
  console.log('====================================');
  const [goForApi, setGoFoApi] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  console.log('====================================selecteddd');
  console.log(selectedItems);
  console.log('====================================');
  const [employeeID,setEmployeeID] = useState([])
  console.log('====================================IDDD');
  console.log(employeeID);
  console.log('====================================');
  const colors = useTheme();
  const data = route?.params?.data;
  const name  = route?.params?.name;
  const description  = route?.params?.description;
  const  prestartTime = route?.params?.prestartTime;
  const preEndTime  =  route?.params?.preEndTime;
  const preCompanyID = route?.params?.preCompanyID;
  console.log(data,"",name,"",description,"",prestartTime,"",preEndTime,"",preCompanyID,'forrrrmmm');
  // Transform data into desired format
  const transformedData = visitorsData.map(item => {
    return {
      name: `${item.fname} ${item.lname}`,
      email: item.email
    };
  });


  const items = [
    { id: '1', name: 'Option 1' },
    { id: '2', name: 'Option 2' },
    { id: '3', name: 'Option 3' },
    { id: '4', name: 'Option 4' },
    { id: '5', name: 'Option 5' },
  ];

  const confirmPressed = () => {
    setGoFoApi(true);
  };

  const viewModal = () => {
    setVisitors(true);
  };

  const getComapny = useFetchGet(
    API.GET_ALLCOMPANY,
    goForGetApiCall,
    {},
    userAccessToken,
    limit,
    skip,
  );

  /** response of api call for Announcment screen data */
  useEffect(() => {
    if (!getComapny.loading) {
      if (getComapny.response?.status === GeneralResponses.STATUS_OK.CODE) {
        // Append the newly loaded data to the existing companyData array
        setCompnayData(prevData => [
          ...prevData,
          ...getComapny.response?.data?.docs,
        ]);

        setskip(skip + 1);
      }
    } else {
      console.log('error in All users');
    }
    setGoForGetApiCall(false);
  }, [getComapny.loading]);

  const loadMoreData = () => {
    setGoForGetApiCall(true);
  };

  // const handleChipPress = (index, employee) => {
  //   console.log('===================================indexx');
  //   console.log(index);
  //   console.log('====================================');
  //   console.log('====================================eemployeee');
  //   console.log(employee._id);
  //   console.log('====================================');
  
  //   setSelectedEmployee(prevSelected => {
  //     const updatedSelected = [...prevSelected];
  //     updatedSelected.splice(index, 1);
  //     return updatedSelected;
  //   });
  
  //   setEmployeeID(prevEmployeeID => {
  //     const updatedEmployeeID = prevEmployeeID.filter(id => id !== employee?._id); // Remove the employee ID from the employeeID array
  //     return updatedEmployeeID;
  //   });
  // };

  // const handleChipPress = (index, employeeID) => {
  //     setSelectedEmployee(prevSelected => {
  //       const updatedSelected = [...prevSelected];
  //       updatedSelected.splice(index, 1);
  //       return updatedSelected;
  //     });
  //   };

  const handleChipPress = (index, employeeId) => {
    setSelectedEmployee((prevSelected) => {
      const updatedSelected = [...prevSelected];
      updatedSelected.splice(index, 1);
      
      setEmployeeID((prevEmployeeID) => {
        const updatedEmployeeID = prevEmployeeID.filter((id) => id !== employeeId);
        return updatedEmployeeID;
      });
  
      return updatedSelected;
    });
  };

  const onSaveDate = visitorData => {
    // Update the state or perform any necessary actions with the received data
    const newVisitor = {
      ...visitorData,
    };
    // setvisitorsData(prevVisitors => [...prevVisitors, newVisitor]);
    if ((selectedEmployee.length + visitorsData.length) < data.capacity) {
      setvisitorsData(prevVisitors => [
        ...prevVisitors,
        newVisitor,
      ]);
    }
  };

  const handleChipPressvisitors = index => {
    setvisitorsData(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected.splice(index, 1);
      return updatedSelected;
    });
  };


  const createBooking = useFetchPost(
    API.CREATE_BOOKING,
    {
      name:name,
      description:description,
      company:preCompanyID,
      startTime:prestartTime,
      endTime:preEndTime,
      resource:data._id,
      attendees:employeeID,
      visitorsDetails:transformedData,
        // title: title,
        // tags: tag,
        // description:description,
    },
    goForApi,
    userAccessToken,
  );

useEffect(() => {
    if (!createBooking.loading) {
      if (createBooking.response?.status === 201) {
        console.log(createBooking.response);
        setConfirm(true);
        //  SimpleToast.show('Annuouncement Created Successfully', SimpleToast.BOTTOM )
         setTimeout(() => {
          navigation.navigate('Booking');
        }, 2000);
      }
      else if(createBooking.response?.status === 500){
        // SimpleToast.show('Please add Title', SimpleToast.BOTTOM );
        console.log(createBooking.response);
      }
      else
      {
        console.log('Add Announcement Error');
      }
    }
    setGoFoApi(false);
  }, [createBooking.loading]);


   /**
   * function called onpress Creeate
   */
   const create = () => {
  
   
  };

  
  const onSelectedItemsChange = (selectedItems) => {
    setSelectedItems(selectedItems);
    console.log('===================================here=');
    console.log(selectedItems);
    console.log('====================================');
  };

  const halfLength = Math.ceil(visitorsData.length / 2);
  const firstHalf = visitorsData.slice(0, halfLength);
  const secondHalf = visitorsData.slice(halfLength);

  return (
    <>
      <ConfrirmModal
        visible={confirm}
        navigation={navigation}
        onSwipeComplete={() => setConfirm(false)}
        backPressed={() => setConfirm(false)}
        // onSaveDate={handleSaveDate}
        onBackdropPress
      />
      <AddVisitorModal
        visible={visitors}
        navigation={navigation}
        onSwipeComplete={() => setVisitors(false)}
        backPressed={() => setVisitors(false)}
        // onSaveDate={handleSaveDate}
        onBackdropPress
        onSaveDate={onSaveDate}
      />
      <View style={styles.container}>
        <ScrollView>
          <TouchableOpacity
            style={{marginTop: 40, marginBottom: 14}}
            onPress={() => navigation.goBack()}>
            <Left />
          </TouchableOpacity>
          <View style={{marginBottom: 14}}>
            <Text regular appPrimary body1>
              2/2 step
            </Text>
          </View>
          <View style={{marginBottom: 29}}>
            <Text regular heading2>
              Attendees
            </Text>
          </View>
          <View style={{marginBottom: 24}}>
            <Text title4>
              Attendeees: {selectedEmployee.length + visitorsData.length}/{data.capacity}
            </Text>
          </View>
          <View style={{marginBottom: 16}}>
            <Text title4>Attendes</Text>
          </View>
          <SelectDropdown
            data={companyData}
            onScrollEndReached={loadMoreData}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index, 'dsaasdasss');
              setskip(1);
              setSelectedOption(selectedItem.employees);
              setCompanyId(selectedItem._id);
            }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
            }}
            buttonStyle={{
              width: '100%',
              marginBottom: 16,
              backgroundColor: `rgba(250, 250, 250, 1)`,
              borderWidth: 1,
              borderColor: 'rgba(233, 234, 233, 1)',
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
                    backgroundColor: 'rgba(250, 250, 250, 1)',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: selectedItem ? 'black' : colors.secondaryColor,
                    }}>
                    {selectedItem ? selectedItem.name : 'Company Name'}
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
                    {item.name}
                  </Text>
                </View>
              );
            }}
          />
          <SelectDropdown
            data={selectedOption}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index, 'dsaasdasss');
              if (!selectedEmployee.includes(selectedItem)) {
                if ((selectedEmployee.length + visitorsData.length) < data.capacity) {
                  setSelectedEmployee(prevSelected => [
                    ...prevSelected,
                    selectedItem,
                  ]);
                  setEmployeeID(prevSelected => [
                    ...prevSelected,
                    selectedItem._id,
                  ]);
                }
              }
            }}
            rowStyle={{
              backgroundColor: 'white',
              borderBottomColor: 'rgba(233, 234, 233, 1)',
            }}
            buttonStyle={{
              width: '100%',
              marginBottom: 16,
              backgroundColor: `rgba(250, 250, 250, 1)`,
              borderWidth: 1,
              borderColor: 'rgba(233, 234, 233, 1)',
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
                    backgroundColor: 'rgba(250, 250, 250, 1)',
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: colors.secondaryColor,
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
                        employee._id
                      )
                    }
                  />
                ))}
            </View>
          </View>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text title4 regular>
              Visitors
            </Text>
            <TouchableOpacity onPress={viewModal}>
              <AddRing />
            </TouchableOpacity>
          </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            {visitorsData.map((visitor, index) => (
              <Chip
                key={index}
                Name={`${visitor.fname} ${visitor.lname}`}
                onPress={() => handleChipPressvisitors(index)}
              />
            ))}
          </View> */}

<View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
        }}>
        <Text title4 regular>
          Visitors
        </Text>
        <TouchableOpacity onPress={viewModal}>
          <AddRing />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 1 }}>
          {firstHalf.map((visitor, index) => (
            <Chip
              key={index}
              Name={`${visitor.fname} ${visitor.lname}`}
              onPress={() => handleChipPressvisitors(index)}
            />
          ))}
        </View>
        <View style={{ flex: 1 }}>
          {secondHalf.map((visitor, index) => (
            <Chip
              key={index}
              Name={`${visitor.fname} ${visitor.lname}`}
              onPress={() => handleChipPressvisitors(index + halfLength)}
            />
          ))}
        </View>
      </View>

          {/* <View style={{maxHeight:200}}>
      <MultiSelect
        hideTags
        items={companyData}
        uniqueKey="_id"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={selectedItems}
        selectText="Select Options"
        searchInputPlaceholderText="Search Options..."
        onChangeInput={(text) => console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
</View> */}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 15,
          }}>
          <Button
            buttonStyle={{flex: 0.42}}
            title={`Back`}
            onPress={() => navigation.goBack()}
          />
          <Button
            buttonStyle={{flex: 0.42, backgroundColor: colors.appPrimary}}
            title={`Confirm`}
            textStyles={{color: colors.whiteBackground}}
            onPress={confirmPressed}
          />
        </View>
      </View>
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: 'white',
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

export default AddAttendes;
