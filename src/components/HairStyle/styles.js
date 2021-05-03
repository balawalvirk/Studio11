import {StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  cuttingImage: {
    resizeMode: 'contain',
    width: width(30),
    height: width(30),
    marginHorizontal: width(2),
    justifyContent:'flex-end'
  },
  cuttingTitle: {
    textAlign: 'center',
    color: AppColors.white,
    fontWeight:'bold',
    marginBottom:width(2),
    fontSize:width(4)
  }
});
export default styles;
