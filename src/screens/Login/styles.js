import { ColorPropType, StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height(4),
  },
  heading: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(7),
  },
  description: {
    color: AppColors.white,
  },
  RowafterInputField: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width: width(80),
    alignItems: 'center',
  },
  highlightedText: {
    color: AppColors.primaryGold,
  },
  blurText: {
    color: AppColors.white50,
  },
  whiteText: {
    color: AppColors.white,
  },
  TextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(2),
  },
  rememberbeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkIcon: {
    fontSize: width(5),
    paddingRight: width(2),
  },
  loginBtn: {
    marginVertical: height(2),
  },
});
export default styles;
