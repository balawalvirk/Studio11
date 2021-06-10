import {StyleSheet} from 'react-native';
import {width, height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  StylerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.cardColor,
    padding: width(4),
    width: width(90),
    marginBottom: height(2),
    borderRadius: width(4),
    alignItems: 'center',
  },
  textSection: {
    flexDirection: 'column',
    width: width(55),
  },
  imageSection: {
    width: width(25),
    height: width(25),
    resizeMode: 'cover',
    borderRadius: width(4),
  },
  stylerTitle: {
    color: AppColors.primaryGold,
    fontWeight: 'bold',
    fontSize: width(4),
  },
  ratingText: {
    color: AppColors.white,
    marginLeft: width(2),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
    paddingVertical: height(0.5),
  },
  stylerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height(0.5),
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'baseline',
  },
});
export default styles;
