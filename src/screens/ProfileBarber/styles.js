import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  mainViewContainer: {
    // height:height(100),
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: AppColors.textColor
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(80),
    alignSelf:'center',
    marginBottom: height(2),
    marginVertical: height(3)
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(4)
  },
  ProfileDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:height(2),
    width: width(80),
  },
  textSection: {
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  imageSection: {
    width: width(25),
    height: width(25),
    resizeMode: 'cover',
    borderRadius: width(4)
  },
  stylerTitle: {
    color: AppColors.primaryGold,
    fontWeight:'bold',
    fontSize:width(5)
  },
  white50: {
    color: AppColors.white50,
    fontSize:width(4)
  },

});
export default styles;
