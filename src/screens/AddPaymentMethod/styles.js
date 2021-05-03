import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    paddingTop: height(4),
  },
  addPaymentImage: {
    width: width(50),
    height: height(20),
    resizeMode: 'contain'
  },
  cardRow:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:width(80)
  }

});
export default styles;
