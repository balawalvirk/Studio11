import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  productCard: {
    marginHorizontal: width(2),
    backgroundColor: AppColors.headerColor,
    borderRadius: width(4)
  },
  productImage: {
    width: width(40),
    height: width(40),
  },
  detailSection: {
    paddingHorizontal: width(2),
    paddingVertical: width(3),
  },
  productName: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4)
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4),
  },
  ratingValue: {
    color: AppColors.white50,
    fontSize: width(4)
  },
  productPrice: {
    color: AppColors.white50,
    fontSize: width(4)
  },
});
export default styles;
