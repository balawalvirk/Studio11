import {StyleSheet} from 'react-native';
import {width, height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  welcomeTextView: {
    width: width(100),
    marginTop: height(0),
    paddingHorizontal: width(4),
    paddingTop: height(2),
  },
  welcomeText: {
    color: AppColors.white,
    fontSize: width(4),
    fontWeight: 'bold',
  },
  date: {
    color: AppColors.white,
    fontSize: width(5.5),
    fontWeight: 'bold',
  },
  appointmentText: {
    color: AppColors.white50,
    fontSize: width(3.8),
  },
});
export default styles;
