import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(90),
    alignItems: 'center',
    width: width(100),
    justifyContent: 'center',
    backgroundColor: AppColors.textColor,

  },
  suggestionImage: {
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
  suggestionIcon: {
    color: AppColors.yellow,
    fontSize: width(8),
    paddingHorizontal: width(4),
  },
  longInputField: {
    paddingHorizontal: width(10),
    marginVertical: height(4),
  },
  suggestionLabel: {
    color: AppColors.white50,
    fontSize: width(4),
    marginLeft: width(3),
    marginBottom: width(2),
  },
  longInputStyle: {

  }

});
export default styles;
