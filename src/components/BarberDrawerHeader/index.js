import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
const BarberDrawerHeader = (props) => {
    const Drawer = createDrawerNavigator();
    return (
        <DrawerContentScrollView {...props}>
                <Image resizeMode='cover' style={styles.bg} source={require('../../assets/images/barberDrawerBg.png')} />
                <Image style={styles.dp} source={require('../../assets/images/barberDrawerDp.png')} />
                <View style={styles.textView}>
                    <Text style={styles.userName}>Dorris Ortiz</Text>
                    <Text style={styles.userEmail}>micheal397@gmail.com</Text>
                </View>
                <View style={styles.PageTitleView}>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('BarberAppointments')}>
                    <Text style={styles.PageTitle1st}>Appointments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Settings')}>
                    <Text style={styles.PageTitle}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('TermsConditions')}>
                    <Text style={styles.PageTitle}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Appointments')}>
                    <Text style={styles.PageTitleLast}>Sign out</Text>
                    </TouchableOpacity>
                    </View>
            {/* <DrawerItemList  {...props} /> */}
        </DrawerContentScrollView>
    );
};
export default BarberDrawerHeader;
