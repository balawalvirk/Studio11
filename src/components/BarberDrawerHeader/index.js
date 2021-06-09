import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import auth from '@react-native-firebase/auth';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/Auth';

const BarberDrawerHeader = (props) => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const Drawer = createDrawerNavigator();
  const _logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('Barber User signed out!');
        dispatch(logout());
      });
  };
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <ImageBackground
          resizeMode="cover"
          style={styles.bg}
          source={require('../../assets/images/barberDrawerBg.png')}>
          <View style={styles.imageOverlay}></View>
        </ImageBackground>
        <Image
          style={styles.dp}
          source={
            user.Image.imageUrl
              ? {uri: user.Image.imageUrl}
              : require('../../assets/images/drawerdp.png')
          }
        />
        <View style={styles.textView}>
          <Text style={styles.userName}>
            {user?.FirstName} {user?.LastName}
          </Text>
          <Text style={styles.userEmail}>{user?.Email}</Text>
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
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          <Text style={styles.PageTitle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TermsConditions')}>
          <Text style={styles.PageTitle}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _logout()}>
          <Text style={styles.PageTitleLast}>Sign out</Text>
        </TouchableOpacity>
      </View>
      {/* <DrawerItemList  {...props} /> */}
    </DrawerContentScrollView>
  );
};
export default BarberDrawerHeader;
