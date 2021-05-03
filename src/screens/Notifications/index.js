import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
export default function Notifications() {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const messages = [
    {
      id: '1',
      notificationText: 'Your appointment with Dorris Ortiz has been accepted.',
      notificationTime: '3:36 AM',
    },
    {
      id: '2',
      notificationText: 'Today is your appointment with Dorris Ortiz. Be there on time.',
      notificationTime: '5:14 AM',
    },
    {
      id: '3',
      notificationText: 'velit rerum sequi nihil velit rerum sequi nihil velit rerum sequi nihil.',
      notificationTime: '1:24 PM',
    },
  ];
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
    headerUnScrollable={()=> <Header headerTitle={'Notifications'} />}>
     
      <View style={styles.mainViewContainer}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{ alignItems: 'center' }}>
                <View style={styles.notifications}>
                  <Text style={styles.notificationText}>{item.notificationText}</Text>
                  <Text style={styles.notificationTime}>{item.notificationTime}</Text>
                </View>

                <HorizontalLine lineWidth={styles.HorizontalLine100} />
              </View>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
