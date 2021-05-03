import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    // height: height(90),
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    paddingTop: height(2),
  },
  termsConditionText:{
    color:AppColors.white50,
    fontSize:width(4),
    paddingHorizontal:width(5),
  }

});
export default styles;
