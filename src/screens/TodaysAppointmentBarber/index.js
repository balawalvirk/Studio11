import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import ScheduleCard from '../../components/ScheduleCard';
import InputField from '../../components/InputField';
export default function TodaysAppointmentBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const scheduledAppointments = [
    {
      id: '1',
      barberName: 'Michael Fox',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 07 March, 06:16 AM',
      Notes: 'Delectus voluptas qui est delectus recusandae eveniet assumenda fuga earum.',
      appointmentImage: require('../../assets/images/appointments/1.png'),
      timeLeft: '3 days left',
    },
    {
      id: '2',
      barberName: 'Tomas Ernser',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Saturday, 09 January, 10:42 AM',
      Notes: 'Iste eos dolores.',
      appointmentImage: require('../../assets/images/appointments/2.png'),
      timeLeft: '3 days left',
    },
    {
      id: '3',
      barberName: 'Carole Quigley',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 28 March, 09:59 PM',
      Notes: 'Consequatur assumenda earum fuga et quos aperiam quos.',
      appointmentImage: require('../../assets/images/appointments/3.png'),
      timeLeft: '3 days left',
    },
    {
      id: '4',
      barberName: 'Michael Fox',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 07 March, 06:16 AM',
      Notes: 'Delectus voluptas qui est delectus recusandae eveniet assumenda fuga earum.',
      appointmentImage: require('../../assets/images/appointments/4.png'),
      timeLeft: '3 days left',
    },
    {
      id: '5',
      barberName: 'Tomas Ernser',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Saturday, 09 January, 10:42 AM',
      Notes: 'Iste eos dolores.',
      appointmentImage: require('../../assets/images/appointments/5.png'),
      timeLeft: '3 days left',
    },
    {
      id: '6',
      barberName: 'Carole Quigley',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 28 March, 09:59 PM',
      Notes: 'Consequatur assumenda earum fuga et quos aperiam quos.',
      appointmentImage: require('../../assets/images/appointments/6.png'),
      timeLeft: '3 days left',
    },
    {
      id: '7',
      barberName: 'Carole Quigley',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 28 March, 09:59 PM',
      Notes: 'Consequatur assumenda earum fuga et quos aperiam quos.',
      appointmentImage: require('../../assets/images/appointments/7.png'),
      timeLeft: '3 days left',
    }
  ];
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Todays Appointments'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <InputField containerStyles={{}} labelStyle={{marginTop:0,paddingTop:0}}
        label={'Filter by time:'} placeholder={'2:00 PM — 3:00 PM'} />
        <HorizontalLine />
        <FlatList
          contentContainerStyle={{  }}
          showsVerticalScrollIndicator={false}
          data={scheduledAppointments}
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
