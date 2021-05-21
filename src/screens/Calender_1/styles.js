import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    paddingTop: height(4),
  },
  highlightedDay: {
    borderRadius: width(4),
    borderColor: AppColors.primaryGold,
    borderWidth: width(.50),
    color: AppColors.white,
    width: width(8),
    height: width(8),
    paddingHorizontal: width(1.5),
    paddingVertical: width(1.5)
  }
});
export default styles;
