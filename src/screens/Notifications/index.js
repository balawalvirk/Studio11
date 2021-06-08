import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { notifications } from '../../dummyData';
export default function Notifications() {

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Notifications'} />}>

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

                <HorizontalLine lineWidth={styles.HorizontalLine100} />
              </View>
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
