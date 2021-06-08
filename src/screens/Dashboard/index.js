import React from 'react';
import styles from './styles';
import Appointments from '../Appointments';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppColors from '../../utills/AppColors';
import PaymentMethods from '../PaymentMethods';
import Feedback from '../Feedback';
import Suggestion from '../Suggestion';
import TermsConditions from '../TermsConditions';
import HomeScreen from '../HomeScreen';
import DrawerHeader from '../../components/DrawerHeader';
import Settings from '../Settings';
const Drawer = createDrawerNavigator();

export default function Dashboard(props) {
  return (
    <Drawer.Navigator initialRouteName="HomeScreen"
      drawerStyle={styles.drawerStyleMain}
      drawerContentOptions={{
        activeTintColor: AppColors.primaryGold,
        contentContainerStyle: styles.drawerContainerStyle,
        labelStyle: styles.labelStyle, initialRouteName: { HomeScreen },
        style: styles.drawerStyle,
        itemStyle: styles.itemStyle,
      }}
      screenOptions={{
        tabBarVisible: false
      }}
      drawerContent={(props) => <DrawerHeader {...props} />}
    >
      <Drawer.Screen name="HomeScreen" component={HomeScreen} />
      <Drawer.Screen name="DrawerAppointments" component={Appointments} />
      <Drawer.Screen name="Payment Method" component={PaymentMethods} />
      <Drawer.Screen name="DrawerSettings" component={Settings} />
      <Drawer.Screen name="Give us a feedback" component={Feedback} />
      <Drawer.Screen name="Wanna give us a suggestion?" component={Suggestion} />
      <Drawer.Screen name="Terms & Conditions" component={TermsConditions} />
    </Drawer.Navigator>
  );
}