import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  scheuledCard: {
    justifyContent: 'space-between',
    backgroundColor: AppColors.cardColor,
    padding: width(4),
    width: width(85),
    borderRadius: width(4),
    marginVertical: height(1.5),
  },
  upperSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  bottomSection: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageSection: {
    width: width(25),
    height: width(25),
    resizeMode: 'cover',
    borderRadius: width(4),
  },
  whiteText: {
    color: AppColors.white,
  },
  goldenText: {
    color: AppColors.primaryGold,
  },
  white50: {
    color: AppColors.white50,
  },
  messageBtn: {
    width: width(25),
    borderRadius: height(3),
  },
});
export default styles;
