import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import CustomModal from '../../components/customModal';
export default function AppointmentDetails(props) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Appointment Details'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <View style={styles.appointmentDetails}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.whiteText}>Barber: <Text style={styles.white50}>Cyrus Kihn</Text></Text>
              <Text style={styles.whiteText}>Hair Style: <Text style={styles.white50}>Crew Cut</Text></Text>
              <Text style={styles.whiteText}>Date & Time:</Text>
              <Text style={styles.white50}>Monday, 13th March, 3:00 PM</Text>
              <Text style={styles.whiteText}>Additional Notes</Text>
              <Text style={styles.white50}>I would like to have coffee while my haircut.</Text>
            </View>
            <Text style={styles.goldenText}>10 days left</Text>
          </View>
          <Image style={styles.imageSection} source={require('../../assets/images/cuttings/9.png')} />
        </View>
        <HorizontalLine lineColor={{ marginTop: 0, marginVertical: height(2), width: width(80) }} />
        <View style={styles.buttonRow}>
          <Button onPress={() => props.navigation.navigate('BarberProfile')}
            containerStyle={{ width: width(45) }} title={'View Barber Profile'} />
          <Button planButton onPress={() => props.navigation.navigate('Chat')}
            containerStyle={{ backgroundColor: AppColors.cardColor, width: width(30) }} textStyle={{ color: AppColors.white }}
            title={'Message'} />
        </View>
        <Button planButton onPress={() => setModalVisible(true)}
          containerStyle={{ backgroundColor: AppColors.cardColor }} textStyle={{ color: AppColors.primaryGold }}
          title={'Cancel Appointment'} />
      </View>
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}
        buttonLine firstButtonTitle={'Cancel'} secondButtonTitle={'No'}
        onpressFirstButton={() => setModalVisible(false)} onpressSecondButton={() => setModalVisible(false)}
        iconName={"closecircle"} description={'Do you really want to cancel this appointment?'} />
    </ScreenWrapper>
  );
};
