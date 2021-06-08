import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Actions/Auth';

const BarberDrawerHeader = (props) => {
    const dispatch = useDispatch();
    const Drawer = createDrawerNavigator();
    const _logout = () => {
        auth()
            .signOut()
            .then(() => {
                console.log('Barber User signed out!')
                dispatch(logout())
            })
    }
    return (
        <DrawerContentScrollView {...props}>
            <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                <Image resizeMode='cover' style={styles.bg} source={require('../../assets/images/barberDrawerBg.png')} />
                <Image style={styles.dp} source={require('../../assets/images/barberDrawerDp.png')} />
                <View style={styles.textView}>
                    <Text style={styles.userName}>Dorris Ortiz</Text>
                    <Text style={styles.userEmail}>micheal397@gmail.com</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.PageTitleView}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('BarberAppointments')}>
                    <Text style={styles.PageTitle1st}>Appointments</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('ManageShopItems')}>
                    <Text style={styles.PageTitle1st}>Manage Shop Items</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('Settings')}>
                    <Text style={styles.PageTitle}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('TermsConditions')}>
                    <Text style={styles.PageTitle}>Terms & Conditions</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _logout()}>
                    <Text style={styles.PageTitleLast}>Sign out</Text>
                </TouchableOpacity>
            </View>
            {/* <DrawerItemList  {...props} /> */}
        </DrawerContentScrollView>
    );
};
export default BarberDrawerHeader;
