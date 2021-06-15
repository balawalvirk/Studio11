import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
  },
  reviewImg: {
    height: height(15),
    width: height(15),
    borderRadius: width(2),
    backgroundColor: 'white',
  },
  cameraBg: {
    height: height(15),
    width: height(15),
    borderRadius: width(2),
    backgroundColor: AppColors.cardColor,
    elevation: 4,
    borderWidth: width(0.25),
    borderColor: AppColors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlist: {
    alignItems: 'center',
    paddingBottom: height(10)
  },
  headerContainer: {
    alignItems: 'center',
    marginTop: height(2)
  }
});
export default styles;
