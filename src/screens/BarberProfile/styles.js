import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(80),
    alignSelf: 'center',
    marginBottom: height(1.5),
    marginVertical: height(3),
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
  },
  ProfileDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height(2),
    width: width(80),
  },
  textSection: {
    justifyContent: 'space-between',
    flexDirection: 'column',
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
    fontSize: width(3),
    color: AppColors.white,
    marginLeft: width(2),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
  },
  stylerRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height(0.5),
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4),
  },
  btnStyle: {
    height: 'auto',
    width: width(35),
    borderRadius: height(3),
  },
  btnMessage: {
    height: 'auto',
    width: width(35),
    borderRadius: height(3),
    backgroundColor: AppColors.cardColor,
    paddingVertical: height(1),
    elevation: 2,
  },
  hairContainer: {
    width: width(42),
    height: width(42),
  },
  hairList: {
    width: width(100),
    paddingLeft: width(2),
    marginBottom: height(2),
  },
  dash: {
    backgroundColor: AppColors.white09,
    width: width(85),
    alignSelf: 'center',
    height: width(0.3),
  },
});
export default styles;
