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
  feedbackImage: {
    width: width(50),
    height: height(20),
    resizeMode: 'contain'
  },
  starRow: {
    flexDirection: 'row',
    paddingTop: height(3),
    alignItems: 'center',
    textAlignVertical: 'center'
  },
  feedbackIcon: {
    color: AppColors.yellow,
    fontSize: width(8),
    paddingHorizontal: width(4),
  },
  longInputField: {
    paddingHorizontal: width(10),
    marginVertical: height(4),
  },
  feedbackLabel: {
    color: AppColors.white50,
    fontSize: width(4),
    marginLeft:width(3),
    marginBottom:width(2),
  },
  longInputStyle: {
    borderColor: AppColors.primaryGold,
    borderRadius: width(4),
    borderWidth: width(0.25),
    color: AppColors.white,
    paddingHorizontal:width(3)
  }

});
export default styles;
