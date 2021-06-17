import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { notifications } from '../../dummyData';
import { getNotifications } from '../../firebaseConfig';
import auth from '@react-native-firebase/auth'
import moment from 'moment';
export default function Notifications() {
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
      <HorizontalLine lineWidth={styles.HorizontalLine100} />
    </View>
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Notifications'} />}>
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
