import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const AppointmentCard = ({
  barberName, cuttingName, appointmentTime,timeLeft,appointmentImage,onpressAppointmentcard,appointmentDetails={},
}) => {
  return (
    <TouchableOpacity style={[styles.appointmentCard,appointmentDetails]} onPress={onpressAppointmentcard}>
      <View style={styles.textSection}>
        <View>
          <Text style={styles.whiteText}>Barber: <Text style={styles.white50}>{barberName}</Text></Text>
          <Text style={styles.whiteText}>Hair Style: <Text style={styles.white50}>{cuttingName}</Text></Text>
          <Text style={styles.whiteText}>Date & Time:</Text>
          <Text style={styles.white50}>{appointmentTime}</Text>
        </View>
        <Text style={styles.goldenText}>{timeLeft}</Text>
      </View>
      <Image style={styles.imageSection} source={appointmentImage} />
    </TouchableOpacity>
  );
};

export default AppointmentCard;
