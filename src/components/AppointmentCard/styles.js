import {StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    appointmentCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: AppColors.cardColor,
        padding: width(4),
        width: width(90),
        borderRadius: width(4)
      },
      textSection: {
        justifyContent: 'space-between',
        flexDirection: 'column'
      },
      imageSection: {
        width: width(25),
        height: width(25),
        resizeMode: 'cover',
        borderRadius: width(4)
      },
      whiteText: {
        color: AppColors.white
      },
      goldenText: {
        color: AppColors.primaryGold
      },
      white50: {
        color: AppColors.white50,
      },
});
export default styles;
