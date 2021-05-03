import { ColorPropType, StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Colors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.textColor
  },
  description: {
    color: AppColors.white,
    textAlign:'center',
    width:width(80)
  }
});
export default styles;
