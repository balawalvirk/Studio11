import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension'

const styles = StyleSheet.create({
  HorizontalLine:{
    width:width(80),
    backgroundColor:AppColors.cardColor,
    height:height(0.125),
    marginTop:height(3)
  },
  HorizontalLine100:{
    width:width(100),
    backgroundColor:AppColors.cardColor,
    height:height(0.125),
    marginTop:height(3)
  },
});
export default styles;
