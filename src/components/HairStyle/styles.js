import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  imageSection: {
    width: width(30),
    height: width(30),
    marginHorizontal: width(2),

  },
  image: {
    width: width(30),
    height: width(30),
    borderRadius: width(4),
  },
  imageContent: {
    position: 'absolute',
    // paddingVertical: height(0.8),
    //paddingHorizontal: height(0.8),
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  cuttingTitle: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(3.5),
    textAlign: 'center'
  },
  checkIcon: {
    color: AppColors.primaryGold,
    backgroundColor: AppColors.textColor,
    borderRadius: width(1),
    fontSize: width(5),
    alignSelf: 'baseline',
    margin: width(2)
  },
  shadowContainerBottom: {
    width: width(40),
    borderBottomLeftRadius: width(4),
    borderBottomRightRadius: width(4),
    paddingVertical: height(0.5)
  },
});
export default styles;
