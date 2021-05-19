import React, { useState, useEffect } from 'react';
import styles from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BarberDrawerHeader from '../components/BarberDrawerHeader';
import { Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// **************************Screens*******************
import Login from '../screens/Login';
import BarberBottomTab from './BarberBottomTab/BarberBottomTab';
import Register from '../screens/Register';
import ResetPassword from '../screens/ResetPassword';
import StaffLogin from '../screens/StaffLogin';
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
import VideoUploads from '../screens/VideoUploads';
import VideoPlay from '../screens/VideoPlay';
import Reviews from '../screens/Reviews';
import GetAppointment from '../screens/GetAppointment';
import SelectPaymentMethod from '../screens/SelectPaymentMethod';
import Chat from '../screens/Chat';
import ProductDetails from '../screens/ProductDetails';
import ShoppingCart from '../screens/ShoppingCart';
import SelectPaymentMethodShop from '../screens/SelectPaymentMethodShop';
// *******************************barber Screens*************************************

import BarberHomeScreen from '../screens/BarberHomeScreen';
import NoShowAppointments from '../screens/NoShowAppointments';
import BarberAppointments from '../screens/BarberAppointments';
import SearchAppointment from '../screens/SearchAppointment';
import ManageHairStyles from '../screens/ManageHairStyles';
import DeleteHairStyles from '../screens/DeleteHairStyles';
import EditProfileBarber from '../screens/EditProfileBarber';
import TodaysAppointmentBarber from '../screens/TodaysAppointmentBarber';
import CustomerAppoinmentBarber from '../screens/CustomerAppoinmentBarber';
// ********************firebas auth *************************
import auth from '@react-native-firebase/auth';
import AppColors from '../utills/AppColors';
import UserBottomTab from './UserBottomTab/UserBottomTab';

const Stack = createStackNavigator();
// ****************************barber tabs************************
const Drawer = createDrawerNavigator();

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
      <UserBottomTab />
     ) }


  const barberDashboard = () => {
    return (
      <Drawer.Navigator initialRouteName="Home"
        drawerStyle={styles.drawerStyleMain}
        drawerContentOptions={{
          activeTintColor: AppColors.primaryGold,
          contentContainerStyle: styles.drawerContainerStyle,
          labelStyle: styles.labelStyle, initialRouteName: { BarberBottomTab },
          style: styles.drawerStyle,
          itemStyle: styles.itemStyle,
        }}
        drawerContent={(props) => <BarberDrawerHeader {...props} />}
      >
        <Drawer.Screen name="home" component={BarberBottomTab} />
        <Drawer.Screen name="BarberAppointments" component={BarberAppointments} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="Terms & Conditions" component={TermsConditions} />
        <Drawer.Screen name="Sign out" component={BarberHomeScreen} />
      </Drawer.Navigator>)
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
          <Stack.Screen name="Dashboard" component={UserBottomTab} />
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
          <Stack.Screen name="VideoUploads" component={VideoUploads} />
          <Stack.Screen name="VideoPlay" component={VideoPlay} />
          <Stack.Screen name="ShoppingCart" component={ShoppingCart} />
          <Stack.Screen name="ProductDetails" component={ProductDetails} />
          <Stack.Screen name="SelectPaymentMethodShop" component={SelectPaymentMethodShop} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="GetAppointment" component={GetAppointment} />
          <Stack.Screen name="SelectPaymentMethod" component={SelectPaymentMethod} />
          <Stack.Screen name="Chat" component={Chat} />
          {/* *******************************Barber screens ****************************** */}
          <Stack.Screen name="BarberDashboard" component={barberDashboard} />
          <Stack.Screen name="TodaysAppointmentBarber" component={TodaysAppointmentBarber} />
          <Stack.Screen name="CustomerAppoinmentBarber" component={CustomerAppoinmentBarber} />
          <Stack.Screen name="ManageHairStyles" component={ManageHairStyles} />
          <Stack.Screen name="DeleteHairStyles" component={DeleteHairStyles} />
          <Stack.Screen name="EditProfileBarber" component={EditProfileBarber} />
          <Stack.Screen name="SearchAppointment" component={SearchAppointment} />
          <Stack.Screen name="NoShowAppointments" component={NoShowAppointments} />
          <Stack.Screen name="BarberAppointments" component={BarberAppointments} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
          {/* <Stack.Screen name="Dashboard" component={Dashboard} /> */}
          <Stack.Screen name="Dashboard" component={UserBottomTab} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

