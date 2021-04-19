import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/Button/Button.component';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../Redux/Actions/Auth';
import BGImage from '../../assets/images/bg.jpg';
import ScreenWrapper from '../../components/ScreenWrapper';
export default function Dashboard(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  return (
    <ScreenWrapper backgroundImage={BGImage}>
      <View style={styles.mainViewContainer}>
        <Text style={styles.text}>Dashboard</Text>
        <Text style={styles.text}>{user.userName}</Text>
        <Button title="Logout" onPress={() => dispatch(logout())} />
      </View>
    </ScreenWrapper>
  );
}
