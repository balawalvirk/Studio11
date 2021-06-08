import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import ScheduleCard from '../../components/ScheduleCard';
import InputField from '../../components/InputField';
import { todaysAppointments } from '../../dummyData';
export default function TodaysAppointmentBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Todays Appointments'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <InputField containerStyles={{}} labelStyle={{ marginTop: 0, paddingTop: 0 }}
          label={'Filter by time:'} placeholder={'2:00 PM — 3:00 PM'} />
        <HorizontalLine />
        <FlatList
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={todaysAppointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ScheduleCard
                onpressScheuledCard={() => props.navigation.navigate('CustomerAppoinmentBarber')}
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
