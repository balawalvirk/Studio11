import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  itemImage: {
    width: width(25),
    height: width(25),

  },
  iconContainer: {
    position: 'absolute',
    right: width(1),
    paddingVertical: height(0.7),
    paddingHorizontal: width(1)
  },
  closeIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4),
    backgroundColor: AppColors.black,
    borderRadius: width(2),
  },
  container: {
    width: width(25),
    height: width(25),
    borderRadius: width(5),
    overflow: 'hidden'
  }
});
export default styles;
