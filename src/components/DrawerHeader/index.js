import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import Appointments from '../../screens/Appointments';
import PaymentMethods from '../../screens/PaymentMethods';
import HomeScreen from '../../screens/HomeScreen';
import styles from './styles';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
const DrawerHeader = (props) => {
    const Drawer = createDrawerNavigator();
    return (
        <DrawerContentScrollView {...props}>
                <Image resizeMode='cover' style={styles.bg} source={require('../../assets/images/drawerbg.png')} />
                <Image style={styles.dp} source={require('../../assets/images/drawerdp.png')} />
                <View style={styles.textView}>
                    <Text style={styles.userName}>Michael Fox</Text>
                    <Text style={styles.userEmail}>micheal397@gmail.com</Text>
                </View>
                <View style={styles.PageTitleView}>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Appointments')}>
                    <Text style={styles.PageTitle1st}>Appointments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('PaymentMethods')}>
                    <Text style={styles.PageTitle}>Payment Method</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Settings')}>
                    <Text style={styles.PageTitle}>Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Feedback')}>
                    <Text style={styles.PageTitle}>Give us a feedback</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>props.navigation.navigate('Suggestion')}>
                    <Text style={styles.PageTitle}>Wanna give us a suggestion?</Text>
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
export default DrawerHeader;
