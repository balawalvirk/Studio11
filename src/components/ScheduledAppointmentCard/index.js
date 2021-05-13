import React from 'react';
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { height, width } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import styles from './styles';

const ScheduledAppointmentCard = ({
  cardTitle, appointmentTime, appointmentDetails,onPress,iconName,timeText
}) => {
  return (
    <View style={styles.mainCardView}>
      <Text style={styles.timeText}>{timeText}</Text>
    <View style={styles.scheduledAppointmentCard}>
    <View style={styles.textSection}>
      <Text style={styles.scheduledAppointmentCardTitle}>{cardTitle}</Text>
      <Text style={styles.appointmentTime}>{appointmentTime}</Text>
      <Text style={styles.appointmentDetails}>
      {appointmentDetails}
      </Text>
    </View>
    <Icon style={styles.checkIcon}
      onPress={onPress}
      name={iconName}
    />
  </View>
  </View>
  );
};

export default ScheduledAppointmentCard;
