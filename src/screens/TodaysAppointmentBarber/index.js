import { firebase } from '@react-native-firebase/auth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import ScheduleCard from '../../components/ScheduleCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getAppointments, getAppointmentsByDate, setChatRoom } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';

export default function TodaysAppointmentBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

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
  const onDateTimePick = async (date) => {
    setSelectedDate(moment(date).format('D-MMM-YYYY'))
    const appointments = await getAppointments(UserTypes.BARBER)
    let filteredAppointments = []
    appointments.map(item => {
      if (moment(item.dateMoment.toDate()).format('DD-MM-YYYY') == moment(date).format('DD-MM-YYYY')) {
        filteredAppointments.push(item)
      }
    })
    setAppointments(filteredAppointments)
    setDatePickerVisible(false);
  }
  const renderEmpty = () =>
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No appointments</Text>
    </View>
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header
        headerTitle={'Appointments'}
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setDatePickerVisible(true)}>
          <InputField
            editable={false}
            containerStyles={{}}
            labelStyle={{ marginTop: 0, paddingTop: 0 }}
            value={selectedDate}
            label={'Filter by date'}
            placeholder={'2:00 PM — 3:00 PM'} />
        </TouchableOpacity>
        <HorizontalLine />
        <FlatList
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={renderAppointment}
          ListEmptyComponent={renderEmpty}
        />
      </View>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={onDateTimePick}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ScreenWrapper>
  );
};
