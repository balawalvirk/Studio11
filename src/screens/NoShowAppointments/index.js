import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { height } from 'react-native-dimension';
import Header from '../../components/Header';
import ScheduleCard from '../../components/ScheduleCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getCancelledAppointments } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';
export default function NoShowAppointments(props) {
  const [activeUser, setactiveUser] = useState(true);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);
  const [failedAppointments, setFailedAppointments] = useState([]);

  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const cancelled = await getCancelledAppointments(UserTypes.BARBER)
      setCancelledAppointments(cancelled)
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
  const renderAppointments = ({ item }) =>
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
        <Header
          headerTitle={'No Show Appointments'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} />}>
      <View style={styles.mainViewContainer}>
        <View style={styles.Tabs}>
          <TouchableOpacity onPress={() => setactiveUser(true)}
            style={activeUser ? styles.tab : styles.unActiveTab}>
            <Text style={activeUser ? styles.unActiveTabTitle :
              styles.activeTabTiTle}>Canceled</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setactiveUser(false)} style={activeUser ?
            styles.unActiveTab : styles.tab}>
            <Text style={activeUser ? styles.activeTabTiTle : styles.unActiveTabTitle}>Failed</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: height(10) }}
          showsVerticalScrollIndicator={false}
          data={activeUser ? cancelledAppointments : failedAppointments}
          keyExtractor={item => item.id}
          renderItem={renderAppointments}
        />
      </View>
    </ScreenWrapper>
  );
};
