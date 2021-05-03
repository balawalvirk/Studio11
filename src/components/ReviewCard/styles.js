import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  ReviewCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: AppColors.cardColor,
    padding: width(4),
    width: width(80),
    marginVertical: height(2),
    borderRadius: width(4)
  },
  textSection: {
    justifyContent: 'space-between',
    width:width(42)
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width:width(42),
  },
  imageSection: {
    width: width(25),
    height: width(30),
    resizeMode: 'cover',
    alignSelf:'center',
    borderRadius: width(4)
  },
  ReviewerName: {
    color: AppColors.primaryGold,
    fontWeight:'bold',
    fontSize:width(4)
  },
  ratingText: {
    color: AppColors.white,
    marginLeft:width(2)
  },
  reviewLine:{
    width:'100%', 
    backgroundColor:AppColors.white09,
    marginTop:height(1),
    marginVertical:height(1)
  },
  white50: {
    color: AppColors.white50,
    fontSize:width(4)
  },
  ReviewRating: {
    flexDirection: 'row'
  },
  ratingIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4)
  }
});
export default styles;
