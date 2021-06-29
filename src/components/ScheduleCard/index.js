import React from 'react';
import { Text, View, Image, TouchableOpacity, Pressable } from 'react-native';
import { height, width } from 'react-native-dimension';
import Button from '../Button';
import styles from './styles';

const ScheduleCard = ({
  barberName,
  cuttingName,
  scheduledTime,
  timeLeft,
  appointmentImage,
  onpressScheuledCard,
  onpressMessage,
  scheuledCardStyle = {},
  additionalNotes,
  messageLoading
}) => {
  return (
    <View style={[styles.scheuledCard, scheuledCardStyle]}>
      <Pressable style={styles.upperSection} onPress={onpressScheuledCard}>
        <View style={{ width: width(50) }}>
          <Text style={styles.whiteText}>
            Name: <Text style={styles.white50}>{barberName}</Text>
          </Text>
          <Text style={styles.whiteText}>
            Hair Style: <Text style={styles.white50}>{cuttingName}</Text>
          </Text>
          <Text style={styles.whiteText}>Date & Time:</Text>
          <Text style={styles.white50}>{scheduledTime}</Text>
          <Text style={styles.whiteText}>Additional Notes:</Text>
          <Text style={styles.white50}>{additionalNotes}</Text>
        </View>
        <Image style={styles.imageSection} source={appointmentImage} />
      </Pressable>
      <View style={styles.bottomSection}>
        <Text style={styles.goldenText}>{timeLeft}</Text>
        <Button
          isLoading={messageLoading}
          containerStyle={styles.messageBtn}
          onPress={onpressMessage}
          title={'Message'}
        />
      </View>
    </View>
  );
};

export default ScheduleCard;
