import {StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
modalView: {
    marginHorizontal: width(12),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: "center",
    elevation: 5
  },
  modalText: {
    textAlign: "center",
    fontSize:width(4),
    color: AppColors.white,
    fontWeight: "bold",
  },
  modalIcon:{
    fontSize:width(12),
    color:AppColors.primaryGold,
    marginBottom:height(2)
  }});
  export default styles;
  