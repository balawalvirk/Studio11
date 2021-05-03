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
      <MessagessStack.Screen name="Messages" component={Messages} />
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
      })}/>
        <Tab.Screen name="Messages" component={MessagessStackScreen} />
        <Tab.Screen name="Notifications" component={NotificationsStackScreen} />
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

