import React, { useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import ScheduleCard from '../../components/ScheduleCard';
export default function BarberAppointments(props) {
  const user = useSelector((state) => state.Auth.user);
  const [activeUser, setactiveUser] = useState(true);
  const dispatch = useDispatch();
  const scheduledAppointments = [
    {
      id: '1',
      barberName: 'Michael Fox',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 07 March, 06:16 AM',
      Notes: 'Delectus voluptas qui est delectus recusandae eveniet assumenda fuga earum.',
      appointmentImage: require('../../assets/images/appointments/a1.png'),
      timeLeft: '3 days left',
    },
    {
      id: '2',
      barberName: 'Tomas Ernser',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Saturday, 09 January, 10:42 AM',
      Notes: 'Iste eos dolores.',
      appointmentImage: require('../../assets/images/appointments/a2.png'),
      timeLeft: '3 days left',
    },
    {
      id: '3',
      barberName: 'Carole Quigley',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 28 March, 09:59 PM',
      Notes: 'Consequatur assumenda earum fuga et quos aperiam quos.',
      appointmentImage: require('../../assets/images/appointments/a3.png'),
      timeLeft: '3 days left',
    }
  ];
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Appoinments'} leadingIcon={'arrow-left'} 
      actionIcon={'alert-octagon'} onPressLeadingIcon={() => props.navigation.goBack()}
      onPressActionIcon={()=>props.navigation.navigate('NoShowAppointments')
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
                // scheuledCardStyle={{width:'70%'}}
                // onpressAppointmentcard={() => props.navigation.navigate('AppointmentDetails')}
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
