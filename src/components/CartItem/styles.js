import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',

  },
  productImage: {
    width: width(25),
    height: width(25),
    marginRight: width(4)
  },
  itemDetails: {
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(3)
  },
  countIcon: {
    color: AppColors.primaryGold,
    fontSize: width(5),
    marginHorizontal: width(2)
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
