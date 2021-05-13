import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
export default function BarberNotifications(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const notifications = [
    {
      id: '1',
      notificationText: "You've have a new appointment with Michal Fox after 3 days.",
      notificationTime: '3:36 AM',
    },
    {
      id: '2',
      notificationText: "You've 5 appointments today.",
      notificationTime: '5:14 AM',
    },
    {
      id: '3',
      notificationText: "velit rerum sequi nihil velit rerum sequi nihil velit rerum sequi nihil.",
      notificationTime: '1:24 PM',
    },
  ];
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header leadingIcon={'menu'}
        onPressLeadingIcon={() => props.navigation.openDrawer()} headerTitle={'Notifications'} />}>
      <View style={styles.mainViewContainer}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <View style={styles.notifications}>
                  <Text style={styles.notificationText}>{item.notificationText}</Text>
                  <Text style={styles.notificationTime}>{item.notificationTime}</Text>
                </View>
                <HorizontalLine lineColor={styles.HorizontalLine100} />
              </View>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
