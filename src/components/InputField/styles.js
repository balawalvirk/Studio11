import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  label: {
    color: AppColors.white50,
    marginLeft: width(4),
    marginVertical: height(0.5),
  },
  Texterror: {
    color: AppColors.red,
    marginLeft: width(4),
    // marginVertical:height(1)
  },
  mainInputView: {
    flexDirection: 'row',
    borderRadius: width(6),
    borderColor: AppColors.primaryGold,
    borderWidth: width(0.15),
    alignItems: 'center',
    height: height(6),
  },
  InputField: {
    flex: 1,
    paddingVertical: height(0.5),
    color: AppColors.white,
    textDecorationLine: 'none',
    paddingHorizontal: width(5),
    // paddingLeft:width(4)
  },
  iconView: {
    paddingVertical: height(1.5),
    paddingHorizontal: width(5),
  },
  searchIcon: {
    color: AppColors.white,
    fontSize: width(4),
  },
});
export default styles;
