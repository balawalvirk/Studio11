import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    backgroundColor: AppColors.textColor,
    paddingTop: height(4)
  },
  labels: {
    color: AppColors.white,
  },
  rightArrow: {
    width:width(5),
    height:width(5),
    resizeMode:'contain'
  },
  settingsRow: {
    flexDirection: 'row',
    paddingHorizontal: width(10),
    justifyContent: 'space-between',
    borderBottomColor: AppColors.cardColor,
    borderBottomWidth: width(0.25),
    alignItems:'center',
    paddingVertical: width(4)
  }
});
export default styles;
