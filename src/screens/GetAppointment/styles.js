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
  input: {
    borderRadius: width(4),
    height: height(5.5)
  },
  modalConatiner: {
    width: width(80),
    height: height(5.5),
    borderRadius: width(4),
    paddingHorizontal: width(4),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: width(0.15),
    borderColor: AppColors.primaryGold,
    marginVertical: height(1)
  },
  dropText: {
    color: AppColors.white,
    flex: 1
  },
  dropDown: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginTop: -height(4)
  },
  priceContainer: {
    backgroundColor: AppColors.white,
    width: width(30),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    width: width(80),
  },
  rowText: {
    color: AppColors.black
  },
  label: {
    color: AppColors.white50,
    alignSelf: 'flex-start',
    marginStart: width(14),
  }
});
export default styles;
