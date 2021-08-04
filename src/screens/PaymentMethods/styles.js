import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: height(2)
  },
  labels: {
    color: AppColors.white,
    marginTop: height(2)
  },
  emptyContainer: {
    height: height(50),

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
