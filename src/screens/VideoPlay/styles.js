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
  row:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:height(1),
    alignItems:'center',
    alignSelf:'center',
    width:width(90)
  },
  viewIcon: {
    color: AppColors.white50,
    fontSize: width(5),
    marginRight: width(2)
  },
  commentIcon: {
    color: AppColors.white,
    fontSize: width(5),
    marginRight: width(2)
  },
  likeIcon: {
    color: AppColors.primaryGold,
    fontSize: width(5),
  },
  ScrollView:{
    // width:width(90),
  },
  bringCenter:{
    width:width(90),
    alignSelf:'center'
  },
  Centerline:{
    width:width(90),
    alignSelf:'center',
    marginTop:height(2),
    marginBottom:height(2)
  },
  comment:{
    width:width(90),
    color: AppColors.white50,
    fontSize: width(4),
    marginLeft: width(5)
  }

});
export default styles;
