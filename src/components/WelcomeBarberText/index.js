import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import HighlightedText from '../HighlightedText';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/Entypo';
import AppColors from '../../utills/AppColors'

const WelcomeBarberText = ({
   date,appointments
}) => {
    return (
        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.appointmentText}>You have {appointments} appointments today!</Text>
        </View>
    );
};

export default WelcomeBarberText;
