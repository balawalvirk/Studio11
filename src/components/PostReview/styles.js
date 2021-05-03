import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  reviewRow: {
    flexDirection: 'row',
    width: width(80),
    justifyContent: 'space-between'
  },
  labelStyle: {
    color: AppColors.white,
    marginTop: 0
  },
  inputFieldStyle: {
    width: '75%',
    marginVertical: height(4),
    marginTop: 0,
    marginBottom: 0
  },
  buttonStyle: {
    width: '20%',
    marginTop: height(2)
  }
});
export default styles;
