import React, { useEffect, useState } from 'react';
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
import { UserTypes } from '../../utills/Enums';
import { getAppointments, setChatRoom } from '../../firebaseConfig';
import moment from 'moment';
export default function TodaysAppointmentBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getTodaysAppointments()
  }, [])
  const getTodaysAppointments = async () => {
    try {
      const appts = await getAppointments(UserTypes.BARBER)
      setAppointments(appts)
    } catch (error) {
      error.message
    }
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
      setLoading(false)
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
  const renderAppointment = ({ item }) => {
    return (
      <ScheduleCard
        onpressScheuledCard={() =>
          props.navigation.navigate('CustomerAppoinmentBarber', { appointmentDetails: item })
        }
        barberName={item?.barberDetails?.FirstName + ' ' + item?.barberDetails?.LastName}
        cuttingName={item?.hairStyle}
        scheduledTime={moment(item.dateMoment.toDate()).format('dddd, DD MMMM, hh:mm a')}
        additionalNotes={item?.notes}
        timeLeft={getDaysLeft(item.dateMoment)}
        appointmentImage={item.appointmentImage}
        onpressMessage={() => createRoom(item)}
      />
    );
  }
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header
        headerTitle={'Todays Appointments'}
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <InputField containerStyles={{}} labelStyle={{ marginTop: 0, paddingTop: 0 }}
          label={'Filter by time:'} placeholder={'2:00 PM — 3:00 PM'} />
        <HorizontalLine />
        <FlatList
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={renderAppointment}
        />

      </View>
    </ScreenWrapper>
  );
};
