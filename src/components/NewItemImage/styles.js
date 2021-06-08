import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  itemImage: {
    width: width(15),
    height: width(15),
    marginVertical: height(2),
    marginHorizontal: width(2)
  },
  closeIcon: {
    fontSize: width(4),
    color: AppColors.primaryGold,
    position: 'absolute',
    right: -width(2),
    top: -width(2),
    backgroundColor: AppColors.black,
    borderRadius: width(2)
  },
});
export default styles;
