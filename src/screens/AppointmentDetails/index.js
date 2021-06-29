import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import CustomModal from '../../components/customModal';
import moment from 'moment';
import { setChatRoom } from '../../firebaseConfig';
import database from '@react-native-firebase/database'
import { useSelector } from 'react-redux';
export default function AppointmentDetails(props) {
  const { appointmentDetails } = props.route.params
  const user = useSelector(state => state.Auth.user)
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

  }, [])
  const createRoom = async () => {
    setLoading(true)
    const roomObj = {
      roomId: user.id + '_' + appointmentDetails.barberDetails.id,
      barberId: appointmentDetails.barberDetails.id,
      barberDetails: appointmentDetails.barberDetails,
      customerId: user.id,
      customerDetails: user,

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
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Appointment Details'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <View style={styles.appointmentDetails}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.whiteText}>Barber: <Text style={styles.white50}>{appointmentDetails?.barberDetails?.FirstName} {appointmentDetails?.barberDetails?.LastName}</Text></Text>
              <Text style={styles.whiteText}>Hair Style: <Text style={styles.white50}>{appointmentDetails.hairStyle}</Text></Text>
              <Text style={styles.whiteText}>Date & Time:</Text>
              <Text style={styles.white50}>{appointmentDetails.date}</Text>
              <Text style={styles.whiteText}>Additional Notes</Text>
              <Text style={styles.white50}>{appointmentDetails.notes}</Text>
            </View>
            <Text style={styles.goldenText}>{getDaysLeft(appointmentDetails.dateMoment)}</Text>
          </View>
          <Image style={styles.imageSection} source={{ uri: appointmentDetails?.barberDetails?.Image?.imageUrl }} />
        </View>
        <HorizontalLine lineColor={{ marginTop: 0, marginVertical: height(2), width: width(80) }} />
        <View style={styles.buttonRow}>
          <Button
            onPress={() => props.navigation.navigate('BarberProfile', { barberId: appointmentDetails.barberDetails.id })}
            containerStyle={{ width: width(45) }} title={'View Barber Profile'} />
          <Button
            planButton
            isLoading={isLoading}
            onPress={() => createRoom()}
            containerStyle={{ backgroundColor: AppColors.cardColor, width: width(30) }} textStyle={{ color: AppColors.white }}
            title={'Message'} />
        </View>
        <Button
          planButton
          onPress={() => setModalVisible(true)}
          containerStyle={{ backgroundColor: AppColors.cardColor }}
          textStyle={{ color: AppColors.primaryGold }}
          title={'Cancel Appointment'} />
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        buttonLine
        firstButtonTitle={'Cancel'}
        secondButtonTitle={'No'}
        onpressFirstButton={() => setModalVisible(false)}
        onpressSecondButton={() => setModalVisible(false)}
        iconName={"closecircle"} description={'Do you really want to cancel this appointment?'} />
    </ScreenWrapper>
  );
};
