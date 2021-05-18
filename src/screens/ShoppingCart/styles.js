import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: AppColors.textColor,
    width: width(90)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width(90),
    marginVertical: height(2)
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4)
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(4)
  },

});
export default styles;
