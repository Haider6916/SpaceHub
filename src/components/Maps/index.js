import React, {useEffect, useState} from 'react';
import {View, Dimensions, TextInput} from 'react-native';
import Modal from 'react-native-modal';
import {  Button, CustomTextInput } from '..';
import {useTheme} from '../../config/theme';
import {TabView, TabBar} from 'react-native-tab-view';
import MapView, {Marker} from 'react-native-maps';
import {Text} from '..';

const Maps = props => {
  const {
    visible,
    onSwipeComplete,
    swipeDown = true,
    onBackdropPress = false,
    Cancel,
    onDeactive,
    onSaveDate,
  } = props;

  const colors = useTheme();
  const [selectedDate, setSelectedDate] = useState(null);
  const height = Dimensions.get('window').height;
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleLocationChange = text => {
    setLocation(text);
  };

  const handleSearch = () => {
    // Use a geocoding API or any other method to convert location to coordinates
    // For simplicity, we'll assume a static latitude and longitude for now
    const latitude = 37.78825;
    const longitude = -122.4324;

    setCoordinates({latitude, longitude});
  };

  /** line component */
  const Line = () => {
    return (
      <View style={{}}>
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

  const goBack = () => {
    onSwipeComplete();
  };

  const savePressed = () => {
    onSaveDate(selectedDate);
    onSwipeComplete();
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'tab1', title: 'Add Link'},
    {key: 'tab2', title: 'Choose on Map'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'tab1':
        return (
          <View style={{marginTop: 20, paddingHorizontal: 24}}>
            <CustomTextInput />
          </View>
        );
      case 'tab2':
        return (
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <TextInput
                  style={{flex: 1, height: 40, borderWidth: 1, marginRight: 10}}
                  value={location}
                  onChangeText={handleLocationChange}
                  placeholder="Enter a location"
                />
                <Button title="Search" onPress={handleSearch} />
              </View>
              {coordinates && (
                <MapView
                  style={{flex: 1}}
                  initialRegion={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker coordinate={coordinates} />
                </MapView>
              )}
            </View>
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.appPrimary}}
      style={{backgroundColor: colors.whiteBackground}}
      labelStyle={{color: colors.blackColor, fontWeight: '500', fontSize: 16}}
      {...props}
      //   tabStyle={styles.tab}
      inactiveColor={'rgba(125, 123, 124, 1)'}
      activeColor={colors.appPrimary}
    />
  );

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
          height: height / 1.8,
        }}>
        {swipeDown === true && <Line />}
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 15,
          }}>
          <Button buttonStyle={{flex: 0.42}} title={`Back`} onPress={goBack} />
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

export default Maps;
