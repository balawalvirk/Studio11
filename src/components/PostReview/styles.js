import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  reviewRow: {
    flexDirection: 'row',
    width: width(100),
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  labelStyle: {
    color: AppColors.white,
    marginTop: 0,
  },
  inputFieldStyle: {
    width: width(70),
    marginVertical: height(4),
    marginTop: 0,
    marginBottom: 0,
  },
  buttonStyle: {
    width: width(20),
    borderRadius: height(3),
    height: 'auto',
  },
  rateText: {
    color: AppColors.white,
    fontSize: width(4),
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: width(4),
    paddingVertical: height(0.5),
    marginBottom: height(2),
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(8),
  },
  ratingContainer: {
    width: width(80),
    alignSelf: 'center',
    marginBottom: height(2),
  },
});
export default styles;
