import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { height } from 'react-native-dimension';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getAppointments } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';
export default function Appointments(props) {
  const [appointments, setAppointments] = useState([])
  useEffect(() => {
    loadData()

  }, [])
  const loadData = async () => {
    try {
      const appointments = await getAppointments(UserTypes.CUSTOMER)
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
  const renderAppointment = ({ item }) =>
    <AppointmentCard
      barberName={item?.barberDetails?.FirstName + '' + item?.barberDetails?.FirstName}
      cuttingName={item.hairStyle}
      appointmentTime={item.date}
      timeLeft={getDaysLeft(item.dateMoment)}
      onpressAppointmentcard={() => props.navigation.navigate('AppointmentDetails', { appointmentDetails: item })}
      appointmentImage={{ uri: item?.barberDetails?.Image?.imageUrl }}
      appointmentDetails={{ marginVertical: 5 }} />

  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Appointments'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <FlatList
          contentContainerStyle={{ paddingBottom: height(15) }}
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={renderAppointment}
        />
      </View>
    </ScreenWrapper>
  );
};
