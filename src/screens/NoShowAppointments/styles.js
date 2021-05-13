import {StyleSheet} from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: AppColors.textColor,
    // marginHorizontal:width(20)
  },
  Tabs:{
    flexDirection: 'row', 
    justifyContent: 'space-between',
    width:width(100)
  },
  activeTabTiTle: {
    color: AppColors.white50,
    fontSize:width(4),
    textAlign:'center',
    padding:width(2),
    width:'100%',
  },
  unActiveTabTitle: {
    color: AppColors.white,
    fontSize:width(4),
    textAlign:'center',
    padding:width(2),
    width:'100%',
  },
  tab:{
    borderBottomColor:AppColors.primaryGold,
    borderBottomWidth:width(1),
    backgroundColor:AppColors.cardColor,
    borderRadius:width(0.5),
    width:'50%'
  },
  unActiveTab:{
    width:'50%',
    backgroundColor:AppColors.unActiveTab
  }
});
export default styles;
