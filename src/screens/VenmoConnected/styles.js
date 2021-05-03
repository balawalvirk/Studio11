import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    paddingHorizontal:width(10),
    backgroundColor: AppColors.textColor,
    paddingTop: height(4)
  },
  labels: {
    color: AppColors.white,
    fontSize:width(4)
  },
  white50: {
    color: AppColors.white50,
    fontSize:width(4)
  },
  SelectedAccountDetails:{
    flexDirection:'row',
    backgroundColor:AppColors.cardColor,
    borderRadius:width(4),
    alignItems:'center',
    height:height(8),
    marginVertical:height(2)
  },
  accountDetails:{
    // alignItems:'center'
  },
  accountIcon:{
    width: width(15),
    height: width(15),
    resizeMode: 'contain',
    marginHorizontal: width(4)
  }

});
export default styles;
