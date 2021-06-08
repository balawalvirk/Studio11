import React, { useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { scheduledAppointments } from '../../dummyData';
import ScheduleCard from '../../components/ScheduleCard';
export default function BarberAppointments(props) {
  const user = useSelector((state) => state.Auth.user);
  const [activeUser, setactiveUser] = useState(true);
  const dispatch = useDispatch();
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Appoinments'} leadingIcon={'arrow-left'}
        actionIcon={'alert-octagon'} onPressLeadingIcon={() => props.navigation.goBack()}
        onPressActionIcon={() => props.navigation.navigate('NoShowAppointments')
        } />}>

      <View style={styles.mainViewContainer}>
        <View style={styles.Tabs}>
          <TouchableOpacity onPress={() => setactiveUser(true)}
            style={activeUser ? styles.tab : styles.unActiveTab}>
            <Text style={activeUser ? styles.unActiveTabTitle :
              styles.activeTabTiTle}>Current</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setactiveUser(false)} style={activeUser ?
            styles.unActiveTab : styles.tab}>
            <Text style={activeUser ? styles.activeTabTiTle : styles.unActiveTabTitle}>Past</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: height(10) }}
          showsVerticalScrollIndicator={false}
          data={scheduledAppointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ScheduleCard
                barberName={item.barberName}
                cuttingName={item.cuttingName}
                scheduledTime={item.scheduledTime}
                additionalNotes={item.Notes}
                timeLeft={item.timeLeft}
                appointmentImage={item.appointmentImage}
                onpressMessage={() => props.navigation.navigate('Chat')}
              />
            );
          }}
        />

      </View>
    </ScreenWrapper>
  );
};
