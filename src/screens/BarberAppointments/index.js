import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { scheduledAppointments } from '../../dummyData';
import ScheduleCard from '../../components/ScheduleCard';
import { getAppointments, getCompletedAppointments, setChatRoom } from '../../firebaseConfig';
import { UserTypes } from '../../utills/Enums';
import moment from 'moment';
export default function BarberAppointments(props) {
  const user = useSelector((state) => state.Auth.user);
  const [activeUser, setactiveUser] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [pastAppointments, setPastAppointments] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const appointments = await getAppointments(UserTypes.BARBER)
      const completedAppointments = await getCompletedAppointments(UserTypes.BARBER)
      setAppointments(completedAppointments)
      setAppointments(appointments)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getDaysLeft = (dateMoment) => {
    const apptDate = dateMoment.toDate()
    const duration = moment.duration(moment(apptDate).diff(moment())).asDays().toFixed(0)
    const daysLeft = duration + ' days left'
    if (duration < 0) {
      return false
    }
    if (duration == 0) {
      return 'Today'
    }
    return daysLeft
  }
  const createRoom = async (item) => {
    const roomObj = {
      roomId: item.customerId + '_' + user.id,
      barberId: user.id,
      barberDetails: user,
      customerId: item.customerId,
      customerDetails: item.customerDetails,
      barberAvatar: item?.barberDetails?.Image?.imageUrl ? item?.barberDetails.Image.imageUrl : '',
      customerAvatar: '',
      lastUpdated: moment().toISOString()
    }
    try {
      await setChatRoom(roomObj)
      props.navigation.navigate('Chat', { roomId: roomObj.roomId })
      return roomObj
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderAppointment = ({ item }) =>
    <ScheduleCard
      onpressScheuledCard={() =>
        props.navigation.navigate('CustomerAppoinmentBarber', { appointmentDetails: item })
      }
      barberName={item?.barberDetails?.FirstName + ' ' + item?.barberDetails?.LastName}
      cuttingName={item?.hairStyle}
      scheduledTime={moment(item?.dateMoment?.toDate()).format('dddd, DD MMMM, hh:mm a')}
      additionalNotes={item?.notes}
      timeLeft={getDaysLeft(item.dateMoment)}
      appointmentImage={item.appointmentImage}
      onpressMessage={() => createRoom(item)}
    />

  return (
    <ScreenWrapper
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() =>
        <Header headerTitle={'Appoinments'}
          leadingIcon={'arrow-left'}
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
          data={activeUser ? appointments : pastAppointments}
          keyExtractor={item => item.id}
          renderItem={renderAppointment}
        />

      </View>
    </ScreenWrapper>
  );
};
