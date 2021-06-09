import {ColorPropType, StyleSheet} from 'react-native';
import {width, height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  bg: {
    width: width(70),
    height: height(18),
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  dp: {
    width: width(25),
    height: width(25),
    borderRadius: width(12.5),
    position: 'absolute',
    top: height(9),
    left: width(4),
  },
  imageOverlay: {flex: 1, backgroundColor: 'rgba(0,0,0,0.40)'},
  userName: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
  },
  userEmail: {
    color: AppColors.white50,
    fontSize: width(4),
  },
  textView: {
    marginVertical: height(5),
    marginLeft: width(10),
  },
  PageTitleView: {
    marginHorizontal: width(6),
    justifyContent: 'space-between',
  },
  PageTitle1st: {
    color: AppColors.white,
    fontSize: width(4),
    borderBottomColor: AppColors.white50,
    borderBottomWidth: width(0.15),
    paddingLeft: width(4),
    borderTopColor: AppColors.white50,
    borderTopWidth: width(0.15),
    paddingVertical: height(2),
  },
  PageTitle: {
    color: AppColors.white,
    fontSize: width(4),
    borderBottomColor: AppColors.white50,
    borderBottomWidth: width(0.15),
    paddingLeft: width(4),
    paddingVertical: height(2),
  },
  PageTitleLast: {
    color: AppColors.primaryGold,
    fontSize: width(4),
    borderBottomColor: AppColors.white50,
    borderBottomWidth: width(0.15),
    paddingLeft: width(4),
    paddingVertical: height(2),
  },
});
export default styles;
