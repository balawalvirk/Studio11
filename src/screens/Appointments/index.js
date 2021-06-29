import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { Appointmentslist } from '../../dummyData';
import { useSelector } from 'react-redux';
import moment from 'moment';
export default function Appointments(props) {
  const appointments = useSelector(state => state.Customer.appointments)
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
      barberName={item.barberDetails.FirstName + '' + item.barberDetails.FirstName}
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

        <FlatList contentContainerStyle={{ paddingBottom: height(15) }}
          data={appointments}
          keyExtractor={item => item.id}
          renderItem={renderAppointment}
        />

      </View>
    </ScreenWrapper>
  );
};
