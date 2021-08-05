import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    // height: height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    paddingTop: height(4),
  },
  proceedBtn: {
    paddingVertical: height(2),
    width: '80%',
    borderRadius: width(4),
    height: 'auto'
  },
  emptyContainer: {
    height: height(70),

    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: AppColors.primaryGold,
    fontWeight: 'bold',
    fontSize: width(4)
  }
});
export default styles;
