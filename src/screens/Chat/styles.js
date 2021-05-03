import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
}
});
export default styles;
