import React, { useState } from 'react';
import { View } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import ScheduleCard from '../../components/ScheduleCard';
import InputModal from '../../components/inputModal';
import CustomModal from '../../components/customModal';
import Button from '../../components/Button';
import moment from 'moment';
import { cancelAppointment, setChatRoom } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import firestore from '@react-native-firebase/firestore'
export default function CustomerAppoinmentBarber(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [CancelModalVisible, setCancelModalVisible] = useState(false);
  const { appointmentDetails } = props.route.params
  const user = useSelector(state => state.Auth.user)
  const [isLoading, setLoading] = useState(false)
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

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
  const createRoom = async () => {
    setLoading(true)
    const roomObj = {
      roomId: appointmentDetails?.customerDetails?.id + '_' + appointmentDetails?.barberDetails?.id,
      barberId: appointmentDetails?.barberDetails?.id,
      barberDetails: appointmentDetails?.barberDetails,
      customerId: appointmentDetails.customerDetails.id,
      customerDetails: appointmentDetails.customerDetails,
      barberAvatar: appointmentDetails?.barberDetails?.Image?.imageUrl ? appointmentDetails.barberDetails.Image.imageUrl : '',
      customerAvatar: '',
      lastUpdated: moment().toISOString()
    }
    try {
      await setChatRoom(roomObj)
      props.navigation.navigate('Chat', { roomId: appointmentDetails.customerId + '_' + appointmentDetails.barberId })
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }
  const onDateTimePick = async (date) => {
    await firestore()
      .collection('Appointments')
      .doc(appointmentDetails.id)
      .set({
        dateMoment: date
      }, { merge: true })
    props.navigation.goBack()
  };
  const onCancel = async () => {
    try {
      setCancelLoading(true)
      await cancelAppointment(appointmentDetails)
      setCancelLoading(false)
      setCancelModalVisible(false)
      props.navigation.goBack()
    } catch (error) {
      console.log(error.message)
      setCancelLoading(false)
    }
  }
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() =>
        <Header
          headerTitle={'Customer Appoinments'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <ScheduleCard
          scheuledCardStyle={{ backgroundColor: AppColors.transparent, marginVertical: 0, padding: 0 }}
          onpressAppointmentcard={() => props.navigation.navigate('CustomerAppoinmentBarber')}
          barberName={appointmentDetails?.barberDetails?.FirstName + ' ' + appointmentDetails?.barberDetails?.LastName}
          cuttingName={appointmentDetails?.hairStyle}
          scheduledTime={moment(appointmentDetails?.dateMoment?.toDate()).format('dddd, DD MMMM, hh:mm a')}
          additionalNotes={appointmentDetails?.notes}
          timeLeft={getDaysLeft(appointmentDetails.dateMoment)}
          appointmentImage={require('../../assets/images/appointments/a1.png')}
          onpressMessage={() => createRoom()}
          messageLoading={isLoading}
        />
        <HorizontalLine lineColor={{ marginBottom: height(2) }} />
        <Button
          containerStyle={{ paddingVertical: height(2), borderRadius: width(4) }}
          title={'Change Time & Date'}
          onPress={() => setDatePickerVisible(true)} />
        <Button
          planButton
          containerStyle={{
            backgroundColor: AppColors.cardColor, paddingVertical: height(2),
            borderRadius: width(4)
          }}
          onPress={() => setCancelModalVisible(true)}
          textStyle={{ color: AppColors.primaryGold }}
          title={'Cancel Appointment'} />

      </View>
      <InputModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalTitle={'Change Date & Time'}
        firstLabel={'Day & Date'}
        secondLabel={'Time'}
        firstValue={'Monday, 4 March, 2021'}
        secondValue={'7:00 PM'}
        buttonLine
        firstButtonTitle={'Change'}
        secondButtonTitle={'Cancel'}
        onpressFirstButton={() => setModalVisible(false)}
        onpressSecondButton={() => setModalVisible(false)}
      />
      <CustomModal
        isVisible={CancelModalVisible}
        onClose={() => setCancelModalVisible(false)}
        buttonLine
        firstButtonTitle={'Yes'}
        secondButtonTitle={'No'}
        onpressFirstButton={() => onCancel()}
        onpressSecondButton={() => setCancelModalVisible(false)}
        iconName={"closecircle"}
        cancelLoading={cancelLoading}
        description={'Do you really want to cancel this appointment?'} />
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="datetime"
        minimumDate={appointmentDetails.dateMoment.toDate()}
        onConfirm={onDateTimePick}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ScreenWrapper>
  );
};
