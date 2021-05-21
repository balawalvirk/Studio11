import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    width: width(100)
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
  bgImage:{
    width:width(100),
    height:height(25)
  },
  playButton: {
    fontSize: width(15),
    color: AppColors.white,
    alignSelf: 'center',
    padding:width(15)
  },
  bringCenter:{
    width:width(90),
    alignItems:'center',
  },

});
export default styles;
