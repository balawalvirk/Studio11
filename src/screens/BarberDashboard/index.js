import React from 'react';
import styles from './styles';
import BarberAppointments from '../BarberAppointments';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppColors from '../../utills/AppColors';
import TermsConditions from '../TermsConditions';
import Settings from '../Settings';
import BarberNotifications from '../BarberNotifications';
import BarberHomeScreen from '../BarberHomeScreen';
import BarberDrawerHeader from '../../components/BarberDrawerHeader';
import ChatListBarber from '../ChatListBarber';
const Drawer = createDrawerNavigator();

export default function BarberDashboard(props) {
  return (
    <Drawer.Navigator initialRouteName="Home" 
    drawerStyle={styles.drawerStyleMain}
    drawerContentOptions={{
      activeTintColor: AppColors.primaryGold,
      contentContainerStyle: styles.drawerContainerStyle,
      labelStyle: styles.labelStyle, initialRouteName:{BarberHomeScreen},
      style: styles.drawerStyle,
      itemStyle: styles.itemStyle,
    }}
      drawerContent={(props) => <BarberDrawerHeader {...props} /> }
    >
      <Drawer.Screen name="home" component={BarberHomeScreen} />
      <Drawer.Screen name="BarberAppointments" component={BarberAppointments} />
      <Drawer.Screen name="ChatListBarber" component={ChatListBarber} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="BarberNotifications" component={BarberNotifications} />
      <Drawer.Screen name="Terms & Conditions" component={TermsConditions} />
      <Drawer.Screen name="Sign out" component={BarberHomeScreen} />
    </Drawer.Navigator>
  );
}