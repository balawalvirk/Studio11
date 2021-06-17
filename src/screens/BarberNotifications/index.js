import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getNotifications } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function BarberNotifications(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([])
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const notifs = await getNotifications(auth().currentUser.uid)
      setNotifications(notifs)
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderNotifications = ({ item }) =>
    <View style={{ alignItems: 'center' }}>
      <View style={styles.notifications}>
        <Text style={styles.notificationText}>{item.title}</Text>
        <Text style={styles.notificationTime}>{moment(item.timestamp).format('h:mm a')}</Text>
      </View>
      <HorizontalLine lineColor={styles.HorizontalLine100} />
    </View>

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header leadingIcon={'menu'}
        onPressLeadingIcon={() => props.navigation.openDrawer()} headerTitle={'Notifications'} />}>
      <View style={styles.mainViewContainer}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderNotifications}
        />
      </View>
    </ScreenWrapper>
  );
};
