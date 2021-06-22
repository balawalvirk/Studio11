import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    paddingVertical: height(1)
  },
  productImage: {
    width: width(35),
    height: width(35),
    borderRadius: width(3),
    marginRight: width(4),
  },
  itemDetails: {
    width: width(45),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: width(15)
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(3),
  },
  countIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4.5),
    marginHorizontal: width(2),
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
    marginVertical: height(0.75),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
    marginVertical: height(0.5)
  },
  imageIcon: {
    width: width(11),
    height: width(11),
    borderRadius: width(1),
    marginRight: width(2.5),
  },
  flatlist: {
    alignItems: 'flex-end',
    paddingBottom: height(0.5),
  },
  qtyContainer: {
    flexDirection: 'row',
    width: width(20),
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
  },
  qtyText: {
    color: AppColors.white
  }
});
export default styles;
