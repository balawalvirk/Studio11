import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  welcomeTextView: {
    width: width(90),
    marginTop:height(2)
  },
  welcomeText: {
    color: AppColors.white,
    fontSize: width(4),
    fontWeight: 'bold'
  },
  date: {
    color: AppColors.white,
    fontSize: width(6),
    fontWeight: 'bold'
  },
  appointmentText: {
    color: AppColors.white50,
    fontSize: width(4)
  },
});
export default styles;
