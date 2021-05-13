import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height:height(100),
    justifyContent: 'center',
    backgroundColor: AppColors.textColor
  },
});
export default styles;
