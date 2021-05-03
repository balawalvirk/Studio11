import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    paddingHorizontal:width(10),
    backgroundColor: AppColors.textColor,
    paddingTop: height(4)
  },
  labels: {
    color: AppColors.white,
  },
});
export default styles;
