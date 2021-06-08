import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    width: width(100)
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
  bringCenter: {
    width: width(90),
    alignItems: 'center',
    height: height(90)
  },
  footer: {
    backgroundColor: AppColors.cardColor,
    borderTopRightRadius: width(5),
    borderTopLeftRadius: width(5),
  },
  flatlist: {
    alignSelf: 'baseline'
  },
  loaderContainer: { flex: 1, justifyContent: 'center' }
});
export default styles;
