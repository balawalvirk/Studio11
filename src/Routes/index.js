import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// **************************Screens*******************
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import StaffLogin from '../screens/StaffLogin';
import Messages from '../screens/Messages';
import Notifications from '../screens/Notifications';
import Appointments from '../screens/Appointments';
import PaymentMethods from '../screens/PaymentMethods';
import Settings from '../screens/Settings';
import Feedback from '../screens/Feedback';
import Suggestion from '../screens/Suggestion';
import TermsConditions from '../screens/TermsConditions';
import AppointmentDetails from '../screens/AppointmentDetails';
import VenmoConnected from '../screens/VenmoConnected';
import AddPaymentMethod from '../screens/AddPaymentMethod';
import HairStyles from '../screens/HairStyles';
import HairStylesBarber from '../screens/HairStylesBarber';
import BarberProfile from '../screens/BarberProfile';
import Reviews from '../screens/Reviews';
import GetAppointment from '../screens/GetAppointment';
import SelectPaymentMethod from '../screens/SelectPaymentMethod';
import Chat from '../screens/Chat';
// *******************************barber Screens*************************************
import BarberDashboard from '../screens/BarberDashboard';
import NoShowAppointments from '../screens/NoShowAppointments';
import Calender from '../screens/Calender';
import BarberNotifications from '../screens/BarberNotifications';
import ChatListBarber from '../screens/ChatListBarber';
import BarberAppointments from '../screens/BarberAppointments';
import SearchAppointment from '../screens/SearchAppointment';
import ProfileBarber from '../screens/ProfileBarber';
import ManageHairStyles from '../screens/ManageHairStyles';
import DeleteHairStyles from '../screens/DeleteHairStyles';
import EditProfileBarber from '../screens/EditProfileBarber';
import TodaysAppointmentBarber from '../screens/TodaysAppointmentBarber';
import CustomerAppoinmentBarber from '../screens/CustomerAppoinmentBarber';
// ********************firebas auth *************************
import auth from '@react-native-firebase/auth';
import AppColors from '../utills/AppColors';
import { height, width } from 'react-native-dimension';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator headerMode='none' >
      <HomeStack.Screen name="Dashboard" component={Dashboard} />
    </HomeStack.Navigator>
  );
}

const MessagessStack = createStackNavigator();
function MessagessStackScreen() {
  return (
    <MessagessStack.Navigator headerMode='none'>
      <MessagessStack.Screen name="ChatListBarber" component={ChatListBarber} />
      <MessagessStack.Screen name="Chat" component={Chat} />
    </MessagessStack.Navigator>
  );
}
const NotificationsStack = createStackNavigator();
function NotificationsStackScreen() {
  return (
    <NotificationsStack.Navigator headerMode='none'>
      <NotificationsStack.Screen name="Notifications" component={Notifications} />
    </NotificationsStack.Navigator>
  );
}

// ****************************barber tabs************************
const BarberStack = createStackNavigator();
function BarberHomeStackScreen() {
  return (
    <BarberStack.Navigator headerMode='none' >
      <BarberStack.Screen name="BarberDashboard" component={BarberDashboard} />
      <BarberStack.Screen name="TodaysAppointmentBarber" component={TodaysAppointmentBarber} />
      <BarberStack.Screen name="CustomerAppoinmentBarber" component={CustomerAppoinmentBarber} />
    </BarberStack.Navigator>
  );
}
const BarberMessagessStack = createStackNavigator();
function BarberMessagessStackScreen() {
  return (
    <BarberMessagessStack.Navigator headerMode='none'>
      <BarberMessagessStack.Screen name="ChatListBarber" component={ChatListBarber} />
      <BarberMessagessStack.Screen name="Chat" component={Chat} />
    </BarberMessagessStack.Navigator>
  );
}
const CalenderStack = createStackNavigator();
function CalenderStackScreen() {
  return (
    <CalenderStack.Navigator headerMode='none'>
      <CalenderStack.Screen name="Calender" component={Calender} />
      <CalenderStack.Screen name="SearchAppointment" component={SearchAppointment} />
    </CalenderStack.Navigator>
  );
}
const BarberNotificationsStack = createStackNavigator();
function BarberNotificationsStackScreen() {
  return (
    <BarberNotificationsStack.Navigator headerMode='none'>
      <BarberNotificationsStack.Screen name="BarberNotifications" component={BarberNotifications} />
    </BarberNotificationsStack.Navigator>
  );
}
const BarberProfileStack = createStackNavigator();
function BarberProfileStackScreen() {
  return (
    <BarberProfileStack.Navigator headerMode='none'>
      <BarberProfileStack.Screen name="ProfileBarber" component={ProfileBarber} />
      <BarberProfileStack.Screen name="ManageHairStyles" component={ManageHairStyles} />
      <BarberProfileStack.Screen name="DeleteHairStyles" component={DeleteHairStyles} />
      <BarberProfileStack.Screen name="EditProfileBarber" component={EditProfileBarber} />
    </BarberProfileStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();

export default function Routes() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [isLogin, setisLogin] = useState();
  const dispatch = useDispatch();
  // Handle isLogin state changes
  function onAuthStateChanged(isLogin) {
    setisLogin(isLogin);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const userDashboard = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Dashboard') {
              iconName = focused
                ? require('../assets/images/home.png')
                : require('../assets/images/home.png');
            } else if (route.name === 'Messages') {
              iconName = focused
                ? require('../assets/images/message.png')
                : require('../assets/images/message.png');
            } else if (route.name === 'Notifications') {
              iconName = focused
                ? require('../assets/images/bell.png')
                : require('../assets/images/bell.png');
            }
            return <Image style={{ width: width(6), height: width(6), resizeMode: 'contain', tintColor: color }}
              source={iconName} />;
          },
          tabBarLabel: ({ focused, color, size }) => {
            let label;
            if (route.name === 'Dashboard') {
              label = focused
                ? 'Home'
                : 'Home';
            } else if (route.name === 'Messages') {
              label = focused
                ? 'Messages'
                : 'Messages';
            } else if (route.name === 'Notifications') {
              label = focused
                ? 'Notifications'
                : 'Notifications';
            }
            return <Text style={{ fontSize: width(4), color: color, marginBottom: height(0.25) }}
            >{label}</Text>;
          },
        })}
        tabBarOptions={{
          activeTintColor: AppColors.primaryGold,
          inactiveTintColor: AppColors.iconColor,
          tabStyle: { backgroundColor: AppColors.headerColor, elevation: 10 },
          style: { borderTopWidth: 0, elevation: 10, },
        }}
      >
        <Tab.Screen name="Dashboard" component={HomeStackScreen}
          options={navigation => ({
            tabBarVisible: navigation?.route?.state?.index > 0 ? false : true,
            // tabBarIcon: ({ color }) => <Ionicons name={'person-outline'} size={width(6)} color={color} />
          })} />
        <Tab.Screen name="Messages" component={MessagessStackScreen}
        options={navigation => ({
          tabBarVisible: navigation?.route?.state?.index > 0 ? false : true
        })} />
        <Tab.Screen name="Notifications" component={NotificationsStackScreen} />
      </Tab.Navigator>)
  }


  const barberDashboard = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'BarberDashboard') {
              iconName = focused
                ? require('../assets/images/home.png')
                : require('../assets/images/home.png');
            } else if (route.name === 'ChatListBarber') {
              iconName = focused
                ? require('../assets/images/message.png')
                : require('../assets/images/message.png');
            } else if (route.name === 'Calender') {
              iconName = focused
                ? require('../assets/images/Calender.png')
                : require('../assets/images/Calender.png');
            }
            else if (route.name === 'BarberNotifications') {
              iconName = focused
                ? require('../assets/images/bell.png')
                : require('../assets/images/bell.png');
            }
            else if (route.name === 'BarberProfile') {
              iconName = focused
                ? require('../assets/images/user.png')
                : require('../assets/images/user.png');
            }
            return <Image style={{ width: width(6), height: width(6), resizeMode: 'contain', tintColor: color }}
              source={iconName} />;
          },
          tabBarLabel: ({ focused, color, size }) => {
            let label;
            if (route.name === 'BarberDashboard') {
              label = focused
                ? 'Home'
                : 'Home';
            } else if (route.name === 'ChatListBarber') {
              label = focused
                ? 'Messages'
                : 'Messages';
            }
            else if (route.name === 'Calender') {
              label = focused
                ? 'Calender'
                : 'Calender';
            }
            else if (route.name === 'BarberNotifications') {
              label = focused
                ? 'Notifications'
                : 'Notifications';
            }
            else if (route.name === 'BarberProfile') {
              label = focused
                ? 'Profile'
                : 'Profile';
            }
            return <Text style={{ fontSize: width(4), color: color, marginBottom: height(0.25) }}
            >{label}</Text>;
          },
        })}
        tabBarOptions={{
          activeTintColor: AppColors.primaryGold,
          inactiveTintColor: AppColors.iconColor,
          tabStyle: { backgroundColor: AppColors.headerColor, elevation: 10 },
          style: { borderTopWidth: 0, elevation: 10, },
        }}
      >
        <Tab.Screen name="BarberDashboard" component={BarberHomeStackScreen}
          options={navigation => ({
            tabBarVisible: navigation?.route?.state?.index > 0 ? false : true,
          })} />
        <Tab.Screen name="ChatListBarber" component={MessagessStackScreen} />
        <Tab.Screen name="Calender" component={CalenderStackScreen} />
        <Tab.Screen name="BarberNotifications" component={BarberNotificationsStackScreen} />
        <Tab.Screen name="BarberProfile" component={BarberProfileStackScreen} />
      </Tab.Navigator>)
  }

  if (initializing) return null;
  return (
    <NavigationContainer>
      {!isLogin ? (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} />
          <Stack.Screen name="StaffLogin" component={StaffLogin} />
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          <Stack.Screen name="Dashboard" component={userDashboard} />
          <Stack.Screen name="Appointments" component={Appointments} />
          <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Feedback" component={Feedback} />
          <Stack.Screen name="Suggestion" component={Suggestion} />
          <Stack.Screen name="TermsConditions" component={TermsConditions} />
          <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
          <Stack.Screen name="VenmoConnected" component={VenmoConnected} />
          <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethod} />
          <Stack.Screen name="HairStyles" component={HairStyles} />
          <Stack.Screen name="HairStylesBarber" component={HairStylesBarber} />
          <Stack.Screen name="BarberProfile" component={BarberProfile} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="GetAppointment" component={GetAppointment} />
          <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
          <Stack.Screen name="Chat" component={Chat} />
          {/* *******************************Barber screens ****************************** */}
          <Stack.Screen name="BarberDashboard" component={barberDashboard} />
          <Stack.Screen name="NoShowAppointments" component={NoShowAppointments} />
          <Stack.Screen name="BarberNotifications" component={BarberNotifications} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          <Stack.Screen name="Dashboard" component={userDashboard} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

