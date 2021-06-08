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
export default function CustomerAppoinmentBarber(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [CancelModalVisible, setCancelModalVisible] = useState(false);

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Customer Appoinments'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <ScheduleCard scheuledCardStyle={{ backgroundColor: AppColors.transparent, marginVertical: 0, padding: 0 }}
          onpressAppointmentcard={() => props.navigation.navigate('CustomerAppoinmentBarber')}
          barberName={'Michael Fox'}
          cuttingName={'Crew Cut'}
          scheduledTime={'Sunday, 07 March, 06:16 AM'}
          additionalNotes={'Delectus voluptas qui est delectus recusandae eveniet assumenda fuga earum.'}
          timeLeft={'3 days left'}
          appointmentImage={require('../../assets/images/appointments/a1.png')}
          onpressMessage={() => props.navigation.navigate('Chat')}
        />
        <HorizontalLine lineColor={{ marginBottom: height(2) }} />
        <Button containerStyle={{ paddingVertical: height(2), borderRadius: width(4) }} title={'Change Time & Date'}
          onPress={() => setModalVisible(true)} />
        <Button planButton containerStyle={{
          backgroundColor: AppColors.cardColor, paddingVertical: height(2),
          borderRadius: width(4)
        }} onPress={() => setCancelModalVisible(true)}
          textStyle={{ color: AppColors.primaryGold }} title={'Cancel Appointment'} />

      </View>
      <InputModal isVisible={modalVisible} onClose={() => setModalVisible(false)}
        modalTitle={'Change Date & Time'} firstLabel={'Day & Date'} secondLabel={'Time'}
        firstValue={'Monday, 4 March, 2021'} secondValue={'7:00 PM'}
        buttonLine firstButtonTitle={'Change'} secondButtonTitle={'Cancel'}
        onpressFirstButton={() => setModalVisible(false)} onpressSecondButton={() => setModalVisible(false)}
      />
      <CustomModal isVisible={CancelModalVisible} onClose={() => setCancelModalVisible(false)}
        buttonLine firstButtonTitle={'Cancel'} secondButtonTitle={'No'}
        onpressFirstButton={() => setCancelModalVisible(false)} onpressSecondButton={() => setCancelModalVisible(false)}
        iconName={"closecircle"} description={'Do you really want to cancel this appointment?'} />
    </ScreenWrapper>
  );
};
