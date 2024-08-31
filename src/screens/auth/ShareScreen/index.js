// import liraries
import React, {useState} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Cancel, DummyImg, Info, Left, SmallInfo, Tick} from '../../../assets';
import {
  Button,
  CustomTextInput,
  MyCalendar,
  OtherCalendar,
  Text,
  ThreeDot,
} from '../../../components';
import {TabBar, TabView} from 'react-native-tab-view';
import {useTheme} from '../../../config/theme';

// create a component
const ShareScreen = ({navigation}) => {
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');
  const colors = useTheme();
  const [routes] = useState([
    {key: 'myCalendar', title: 'My calendar'},
    {key: 'otherCalendar', title: 'Others calendar'},
  ]);

  // Render each tab scene
  const renderScene = ({route}) => {
    switch (route.key) {
      case 'myCalendar':
        return (
          <View style={{marginTop: 16}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                height: 56,
              }}>
              <CustomTextInput
                mainStyle={{
                  height: 56,
                  flex: 0.65,
                  borderWidth: 1,
                  borderColor: colors.textGreyDark,
                  backgroundColor: 'rgba(250, 250, 250, 1)',
                }}
                placeholder={'Enter Employee name'}
                placeholderTextColor={colors.secondaryColor}
                value={title}
                onChangeText={setTitle}
              />
              <Button
                buttonStyle={{
                  flex: 0.3,
                  backgroundColor: colors.appPrimary,
                  alignSelf: 'center',
                }}
                title="Invite"
                textStyles={{color: 'white'}}
              />
            </View>
            <View>
            <MyCalendar/>
            <MyCalendar/>
            <MyCalendar/>
            <MyCalendar/>
            </View>
          </View>
        );
      case 'otherCalendar':
        return (
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 16,
                marginBottom: 22,
              }}>
              <View style={{marginRight: 8}}>
                <SmallInfo />
              </View>
              <Text body1 secondaryColor>
                Loream ipsum
              </Text>
            </View>
            <OtherCalendar />
            <OtherCalendar />
            <OtherCalendar />
          </View>
        );
      default:
        return null;
    }
  };

  // Render the tab bar
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
      inactiveColor={colors.appLight}
      activeColor={colors.appPrimary}
    />
  );

  return (
    <View style={styles.container}>
      <View style={{marginTop: 30, flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={{marginRight: 14}} onPress={()=> navigation.goBack()}>
          <Left />
        </TouchableOpacity>
        <View>
          <Text heading2 regular>
            Share
          </Text>
        </View>
      </View>
      <View style={{flex: 1, marginTop: 14}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
  },
  tabbar: {
    backgroundColor: 'white',
    // borderBottomWidth:1,
    // borderBottomColor:'rgba(233, 234, 233, 1)'
  },
  tab: {
    width: 160,
  },
  indicator: {
    backgroundColor: 'rgba(141, 85, 162, 1))',
    width: '47%',
  },
  label: {
    fontWeight: '500',
    color: '#272627',
    fontSize: 16,
    lineHeight: 23,
    fontFamily: 'DM Sans',
    textTransform: 'none',
    // marginRight:10,
    // paddingRight:10,
    marginRight: 8,
  },
  page: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

// make this component available to the app
export default ShareScreen;
