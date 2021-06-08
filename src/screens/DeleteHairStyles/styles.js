import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    justifyContent: 'center',
    backgroundColor: AppColors.textColor
  },
  hairContainer: { width: width(40), height: width(40) }
});
export default styles;
