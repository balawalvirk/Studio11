import {StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainCardView:{
    flexDirection: 'row',
    marginBottom: height(1.5),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText:{
    color: AppColors.white,
    fontSize: width(4)
  },
  scheduledAppointmentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: AppColors.cardColor,
    padding: width(2),
    borderRadius: width(4)
  },
  textSection: {
    width: '80%'
  },
  scheduledAppointmentCardTitle: {
    color: AppColors.primaryGold,
    fontSize: width(4)
  },
  appointmentTime: {
    color: AppColors.white50,
    fontSize: width(4)
  },
  appointmentDetails: {
    color: AppColors.white50,
    textAlign:"left",
    fontSize: width(4)
  },
  checkIcon: {
    color: AppColors.primaryGold,
    fontSize: width(7),
    padding: width(6),

  }
});
export default styles;
