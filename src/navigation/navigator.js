import {
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  ForgotPassword,
  NewPassword,
  OnBaording,
  PassCode,
  ResendEmail,
  ResetPassword,
  Splash,
  VerifyUser,
} from '../screens/common';
import {AUTH, COMMON} from './ROUTES';
import {useTheme} from '../config/theme';
import {
  Account,
  AddAttendes,
  AddCEmployee,
  AddCompany,
  AddEmployee,
  AddEvent,
  AddOwner,
  AddRoom,
  AddTask,
  AddTicket,
  AddVisitors,
  Allocations,
  Announcements,
  AnnouncementsForm,
  Booking,
  CalendarScreen,
  Congrats,
  Directory,
  Events,
  Home,
  Login,
  Loginform,
  OneEmployee,
  OpenTicket,
  PInvited,
  PinEvent,
  Plans,
  SelectPlan,
  ShareScreen,
  Support,
  UpdateCompany,
  UpdateEmployee,
  UpdateEvent,
  ViewAllEmployee,
  ViewCompany,
  ViewEmployee,
  Week,
} from '../screens/auth';
import {Text} from '../components';
import DrawerContent from './DrawerContent';
import {
  ActiveBooking,
  ActiveCalendar,
  ActiveDirectory,
  ActiveHome,
  InActiveAccount,
  InActiveBooking,
  InActiveCalendar,
  InActiveDirectory,
  InActiveHome,
} from '../assets';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Visitors} from '../screens/auth';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const colors = useTheme();

const icons = {
  Home: {
    active: <ActiveHome />,
    inactive: <InActiveHome />,
  },
  Directory: {
    active: <ActiveDirectory />,
    inactive: <InActiveDirectory />,
  },
  Booking: {
    active: <ActiveBooking />,
    inactive: <InActiveBooking />,
  },
  Calendar: {
    active: <ActiveCalendar />,
    inactive: <InActiveCalendar />,
  },
  Account: {
    active: <InActiveAccount />,
    inactive: <InActiveAccount />,
  },
};

const MyStatusBar = ({color}) => (
  <View>
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={color} />
    </SafeAreaView>
  </View>
);

const HomeTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        const icon = focused
          ? icons[route.name].active
          : icons[route.name].inactive;
        return icon;
      },
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        paddingBottom: 15,
        height: 60,
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.appPrimary,
      inactiveTintColor: colors.secondaryColor,
      style: {
        position: 'absolute',
      },
    }}>
    <Tab.Screen name="Home" component={Home} options={{headerShown: false}} />
    <Tab.Screen
      name="Directory"
      component={Directory}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Booking"
      component={Booking}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{headerShown: false}}
    />
  </Tab.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={props => <DrawerContent {...props} />}
    screenOptions={{
      drawerType: 'front',
      drawerStyle: {
        // backgroundColor: 'transparent',
        // width: '50%',
      },
    }}>
    <Drawer.Screen
      name="Home Drawer"
      component={HomeTabNavigator}
      options={{headerShown: false}}
    />
    <Drawer.Screen
      name={AUTH.PLANS}
      component={Plans}
      options={{headerShown: false}}
    />
  </Drawer.Navigator>
);

// const getIsLoggedIn = async () => {
//   try {
//     const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
//     console.log('====================================');
//     console.log( isLoggedIn);
//     console.log('====================================');
//     if(isLoggedIn !== null) {
//      return isLoggedIn === 'true'

//     }

//   } catch (error) {
//     console.log(error);
//   }
// };
const Navigator = ({}) => {
  const [isLogedIn, setIsLogedIn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getIsLoggedIn = async () => {
    try {
      const isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
      console.log('====================================');
      console.log(isLoggedIn);
      console.log('====================================');
      if (isLoggedIn !== null) {
        setIsLogedIn(isLoggedIn === 'true');
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getIsLoggedIn();
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  // const isLogedIn = useSelector(state => state.user.isLogedIn);

  // const initialRouteName =
  return (
    <>
      {console.log(isLogedIn, 'sasda')}
      <MyStatusBar color={'#000'} />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isLogedIn ? AUTH.HOME : COMMON.SPLASH}
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          {!isLogedIn ? (
            <>
              <Stack.Screen
                name={COMMON.SPLASH}
                component={Splash}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.ONBOARDING}
                component={OnBaording}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.LOGIN}
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.LOGINFORM}
                component={Loginform}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.HOME}
                component={DrawerNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ANNOUNCEMENTS}
                component={Announcements}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ANNOUNCEMENTSFORM}
                component={AnnouncementsForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDEMPLOYEE}
                component={AddEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VIEWEMPLOYEE}
                component={ViewEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VIEWCOMPANY}
                component={ViewCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDCOMPANY}
                component={AddCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VIEWALLEMPLOYEEE}
                component={ViewAllEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.SELECTPLAN}
                component={SelectPlan}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ALLOCATIONS}
                component={Allocations}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDOWNER}
                component={AddOwner}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDCEMPLOYEE}
                component={AddCEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ONEEMPLOYEEE}
                component={OneEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.CONGRATS}
                component={Congrats}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.FORGOTPASSWORD}
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.PASSCODE}
                component={PassCode}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.NEWPASSWORD}
                component={NewPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.RESENDEMAIL}
                component={ResendEmail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.VERIIFYUSER}
                component={VerifyUser}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VISITORS}
                component={Visitors}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDVISITORS}
                component={AddVisitors}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.RESETPASSWORD}
                component={ResetPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.SUPPORT}
                component={Support}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDTICKET}
                component={AddTicket}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.OPENTICKET}
                component={OpenTicket}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.UPDATEEMPLOYEE}
                component={UpdateEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.UPDATECOMPANY}
                component={UpdateCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.EVENTS}
                component={Events}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDEEVENT}
                component={AddEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.UPDATEEVENT}
                component={UpdateEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.PINEVENT}
                component={PinEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDROOM}
                component={AddRoom}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDATTENDEES}
                component={AddAttendes}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.PINVITED}
                component={PInvited}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.WEEK}
                component={Week}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.SHARESCREEN}
                component={ShareScreen}
                options={{headerShown: false}}
              />
                <Stack.Screen
                name={AUTH.ADDTASK}
                component={AddTask}
                options={{headerShown: false}}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name={AUTH.LOGIN}
                component={Login}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.LOGINFORM}
                component={Loginform}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.HOME}
                component={DrawerNavigator}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ANNOUNCEMENTS}
                component={Announcements}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ANNOUNCEMENTSFORM}
                component={AnnouncementsForm}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDEMPLOYEE}
                component={AddEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VIEWEMPLOYEE}
                component={ViewEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VIEWCOMPANY}
                component={ViewCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDCOMPANY}
                component={AddCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VIEWALLEMPLOYEEE}
                component={ViewAllEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.SELECTPLAN}
                component={SelectPlan}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ALLOCATIONS}
                component={Allocations}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDOWNER}
                component={AddOwner}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDCEMPLOYEE}
                component={AddCEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ONEEMPLOYEEE}
                component={OneEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.CONGRATS}
                component={Congrats}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.FORGOTPASSWORD}
                component={ForgotPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.PASSCODE}
                component={PassCode}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.NEWPASSWORD}
                component={NewPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.RESENDEMAIL}
                component={ResendEmail}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.VERIIFYUSER}
                component={VerifyUser}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.VISITORS}
                component={Visitors}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDVISITORS}
                component={AddVisitors}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={COMMON.RESETPASSWORD}
                component={ResetPassword}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.SUPPORT}
                component={Support}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDTICKET}
                component={AddTicket}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.OPENTICKET}
                component={OpenTicket}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.UPDATEEMPLOYEE}
                component={UpdateEmployee}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.UPDATECOMPANY}
                component={UpdateCompany}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.EVENTS}
                component={Events}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDEEVENT}
                component={AddEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.UPDATEEVENT}
                component={UpdateEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.PINEVENT}
                component={PinEvent}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDROOM}
                component={AddRoom}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.ADDATTENDEES}
                component={AddAttendes}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.PINVITED}
                component={PInvited}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.WEEK}
                component={Week}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={AUTH.SHARESCREEN}
                component={ShareScreen}
                options={{headerShown: false}}
              />
               <Stack.Screen
                name={AUTH.ADDTASK}
                component={AddTask}
                options={{headerShown: false}}
              />
            </>
          )}
          {/* <Stack.Screen
            name={COMMON.SPLASH}
            component={Splash}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={COMMON.ONBOARDING}
            component={OnBaording}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AUTH.LOGIN}
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AUTH.LOGINFORM}
            component={Loginform}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AUTH.HOME}
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={AUTH.ANNOUNCEMENTS}
            component={Announcements}
            options={{headerShown: false}}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default Navigator;
