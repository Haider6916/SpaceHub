//import liraries
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {
  DollarCircle,
  DrawerClose,
  DrawerEvent,
  DrawerLogo,
  DrawerPerks,
  LanguageDrawer,
  LogOutDrawer,
  SettingDrawer,
  SupportDrawer,
  TaskDrawer,
  UserDrawer,
} from '../assets';
import {useTheme} from '../config/theme';
import {AUTH} from './ROUTES';
import {Text} from '../components';
import {useDispatch} from 'react-redux';
import {UserActions} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const DrawerContent = props => {
  const [windowHeight, setWindowHeight] = useState(
    Dimensions.get('window').height,
  );

  const colors = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const data = [
    {name: 'Plans', svg: <DollarCircle />, screen: AUTH.PLANS},
    {name: 'Visitors', svg: <UserDrawer />, screen: AUTH.VISITORS},
    {name: 'Events', svg: <DrawerEvent />, screen: AUTH.EVENTS},
    {name: 'Tasks', svg: <TaskDrawer />, screen: AUTH.PLANS},
    {name: 'Perks & Benefits', svg: <DrawerPerks />, screen: AUTH.PLANS},
    {name: 'Support', svg: <SupportDrawer />, screen: AUTH.SUPPORT},
    {name: 'Settings', svg: <SettingDrawer />, screen: AUTH.PLANS},
    {name: 'Language', svg: <LanguageDrawer />, screen: AUTH.PLANS},
  ];

  /** function called on press of logout */
  const onLogout = async () => {
    try {
      // await AsyncStorage.removeItem('@userData');
      await AsyncStorage.removeItem('@accessToken');
      await AsyncStorage.removeItem('isLoggedIn');
    } catch (e) {
      // saving error
    }
    dispatch(UserActions.onSetUserAccessToken(null));
    dispatch(UserActions.onSetIsLoggedIn(false));
    // props.navigation.replace(AUTH.LOGINFORM)
    props.navigation.reset({
      index: 1,
      routes: [{name: AUTH.LOGIN}, {name: AUTH.LOGINFORM}],
    });
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 25,
            paddingLeft: 10,
            borderBottomWidth: 1,
            paddingBottom: 25,
            borderBottomColor: colors.textGreyDark,
          }}>
          <View style={{flex: 1}}>
            <DrawerLogo />
          </View>
          <TouchableOpacity
            style={{flex: 0.17}}
            onPress={() => props.navigation.closeDrawer()}>
            <DrawerClose />
          </TouchableOpacity>
        </View>
        <View style={{height: windowHeight / 1.48}}>
          {data.map((item, index) => {
            const paddingTop = index === 0 ? 21 : 32;
            return (
              <TouchableOpacity
                style={{
                  paddingTop: paddingTop,
                  flexDirection: 'row',
                  paddingLeft: 20,
                  alignItems: 'center',
                }}
                key={index}
                onPress={() => {
                  props.navigation.navigate(item.screen);
                }}>
                {item.svg}
                <View style={{marginLeft: 19}}>
                  <Text title4 regular secondaryColor>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            paddingTop: 21,
            flexDirection: 'row',
            paddingLeft: 20,
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: colors.textGreyDark,
          }}
          onPress={onLogout}>
          <LogOutDrawer />
          <View style={{marginLeft: 19}}>
            <Text title4 regular secondaryColor>
              Log out
            </Text>
          </View>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
  },
});

export default DrawerContent;
