import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppColors.textColor,
    alignItems: 'center',
  },
  heading: {
    color: AppColors.white,
    fontSize: width(4),
    alignSelf: 'flex-start',
    marginLeft: width(10),
    marginTop: width(4),
    marginBottom: width(4),
  },
});
export default styles;
