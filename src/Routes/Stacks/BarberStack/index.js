import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BarberAppointments from '../../../screens/BarberAppointments';
import TodaysAppointmentBarber from '../../../screens/TodaysAppointmentBarber';
import CustomerAppoinmentBarber from '../../../screens/CustomerAppoinmentBarber';
import ManageHairStyles from '../../../screens/ManageHairStyles';
import DeleteHairStyles from '../../../screens/DeleteHairStyles';
import EditProfileBarber from '../../../screens/EditProfileBarber';
import ManageShopItems from '../../../screens/ManageShopItems';
import SearchAppointment from '../../../screens/SearchAppointment';
import NoShowAppointments from '../../../screens/NoShowAppointments';
import EditUploadedVideo from '../../../screens/EditUploadedVideo';
import UploadVideo from '../../../screens/UploadVideo';
import EditVideoUploads from '../../../screens/EditVideoUploads';
import SelectDelete from '../../../screens/SelectDelete';
import PublishNewItem from '../../../screens/PublishNewItem';
import EditItem from '../../../screens/EditItem';
import BarberDrawerHeader from '../../../components/BarberDrawerHeader';
import BarberBottomTab from '../../BarberBottomTab/BarberBottomTab';
import Settings from '../../../screens/Settings';
import TermsConditions from '../../../screens/TermsConditions';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppColors from '../../../utills/AppColors';
import styles from './styles';
import Chat from '../../../screens/Chat';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const BarberDashboard = () => {
    return (
        <Drawer.Navigator initialRouteName="BarberBottomTab"
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
            <Drawer.Screen name="BarberBottomTab" component={BarberBottomTab} />
            <Drawer.Screen name="BarberAppointments" component={BarberAppointments} />
            <Drawer.Screen name="ManageShopItems" component={ManageShopItems} />
            <Drawer.Screen name="Settings" component={Settings} />
            <Drawer.Screen name="TermsConditions" component={TermsConditions} />
        </Drawer.Navigator>)
}
export function BarberStack() {
    return (
        <Stack.Navigator initialRouteName="BarberDashboard" headerMode="none">
            <Stack.Screen name="BarberDashboard" component={BarberDashboard} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="BarberAppointments" component={BarberAppointments} />
            <Stack.Screen name="TodaysAppointmentBarber" component={TodaysAppointmentBarber} />
            <Stack.Screen name="CustomerAppoinmentBarber" component={CustomerAppoinmentBarber} />
            <Stack.Screen name="ManageHairStyles" component={ManageHairStyles} />
            <Stack.Screen name="DeleteHairStyles" component={DeleteHairStyles} />
            <Stack.Screen name="EditProfileBarber" component={EditProfileBarber} />
            <Stack.Screen name="ManageShopItems" component={ManageShopItems} />
            <Stack.Screen name="SearchAppointment" component={SearchAppointment} />
            <Stack.Screen name="NoShowAppointments" component={NoShowAppointments} />
            <Stack.Screen name="EditUploadedVideo" component={EditUploadedVideo} />
            <Stack.Screen name="UploadVideo" component={UploadVideo} />
            <Stack.Screen name="EditVideoUploads" component={EditVideoUploads} />
            <Stack.Screen name="SelectDelete" component={SelectDelete} />
            <Stack.Screen name="PublishNewItem" component={PublishNewItem} />
            <Stack.Screen name="EditItem" component={EditItem} />
        </Stack.Navigator>
    );
}
export default BarberStack;