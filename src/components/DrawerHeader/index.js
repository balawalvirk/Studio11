import React, {useEffect} from 'react';
import {View, Image, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './styles';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/Auth';
import {setCuttings, setItems, setVideos} from '../../Redux/Actions/Barber';
const DrawerHeader = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const _logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        dispatch(logout());
        dispatch(setVideos([]));
        dispatch(setCuttings([]));
        dispatch(setItems([]));
      });
  };
  return (
    <DrawerContentScrollView {...props}>
      <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
        <Image
          resizeMode="cover"
          style={styles.bg}
          source={require('../../assets/images/drawerbg.png')}
        />
        <Image
          style={styles.dp}
          source={
            user?.Image?.imageUrl
              ? {uri: user?.Image?.imageUrl}
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
          onPress={() => props.navigation.navigate('Appointments')}>
          <Text style={styles.PageTitle1st}>Appointments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('PaymentMethods')}>
          <Text style={styles.PageTitle}>Payment Method</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          <Text style={styles.PageTitle}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('Feedback')}>
          <Text style={styles.PageTitle}>Give us a feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Suggestion')}>
          <Text style={styles.PageTitle}>Wanna give us a suggestion?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('TermsConditions')}>
          <Text style={styles.PageTitle}>Terms & Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _logout()}>
          <Text style={styles.PageTitleLast}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerHeader;
