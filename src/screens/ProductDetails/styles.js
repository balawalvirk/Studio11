import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    // width: width(100)
  },
  topSection: {
    alignSelf: 'flex-start',
    marginTop: height(4),
    paddingHorizontal: width(5),
    width: width(90)
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(90),
    alignSelf: 'center',
    marginBottom: height(2),
    marginVertical: height(3),
    alignItems: 'center'
  },
  buttonRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(90),
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(4),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(4)
  },
  countIcon: {
    color: AppColors.primaryGold,
    fontSize: width(5),
    marginHorizontal: width(2)
  },
  descriptionText: {
    width: width(90)
  },
  footerStyle: {
    backgroundColor: AppColors.cardColor,
    paddingHorizontal: width(5),
    borderTopRightRadius: width(5),
    borderTopLeftRadius: width(5),
    paddingVertical: height(2)
  },
  footerTopSection: {
    flexDirection: 'row',
    width: width(90),
    paddingHorizontal: width(5)
  }
});
export default styles;
