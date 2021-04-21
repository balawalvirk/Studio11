import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/Auth';
import auth from '@react-native-firebase/auth';
import BGImage from '../../assets/images/bg.png';
import ScreenWrapper from '../../components/ScreenWrapper';
export default function Dashboard() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const logout = () =>{
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }
  return (
    <ScreenWrapper backgroundImage={BGImage}>
      <View style={styles.mainViewContainer}>
        <Text style={styles.text}>Dashboard</Text>
        <Text style={styles.text}>{user.userName}</Text>
        <Button title="Logout" onPress={logout} />
      </View>
    </ScreenWrapper>
  );
};
