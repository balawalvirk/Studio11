import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  productCard: {
    marginHorizontal: width(2),
    backgroundColor: AppColors.headerColor,
    borderRadius: width(4),
    overflow: 'hidden',
    elevation: 4,
  },
  productImage: {
    width: width(42),
    height: width(40),
    borderRadius: width(4),
  },
  detailSection: {
    paddingHorizontal: width(2),
    paddingVertical: width(3),
  },
  productName: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(3.8),
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: height(1.5),
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(3.5),
  },
  ratingValue: {
    color: AppColors.white50,
    fontSize: width(3.5),
  },
  productPrice: {
    color: AppColors.white50,
    fontSize: width(3.5),
  },
  editIcon: {
    fontSize: width(5),
    color: AppColors.primaryGold,
    backgroundColor: AppColors.headerColor,
    padding: width(1),
    margin: width(2.5),
    borderRadius: width(4),
  },
  editContainer: {
    flexDirection: 'row-reverse',
    alignSelf: 'baseline'
  }
});
export default styles;
