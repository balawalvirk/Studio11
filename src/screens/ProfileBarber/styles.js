import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    // height:height(100),
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: AppColors.textColor,
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(80),
    alignSelf: 'center',
    marginBottom: height(2),
    marginVertical: height(3),
  },
  icon: { width: width(10), height: height(5), justifyContent: 'center' },
  renderedIcons: {
    fontSize: width(5),
    color: AppColors.primaryGold
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(4),
  },
  ProfileDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: height(2),
    width: width(80),
    alignItems: 'center',
  },
  textSection: {
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  imageSection: {
    width: width(28),
    height: width(28),
    resizeMode: 'cover',
    borderRadius: width(4),
  },
  stylerTitle: {
    color: AppColors.primaryGold,
    fontWeight: 'bold',
    fontSize: width(5),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(4),
  },
  btn: {
    marginVertical: height(2),
  },
  // createStripe: {
  //   backgroundColor: AppColors.primaryGold,
  //   paddingHorizontal: width(2),
  //   paddingVertical: height(0.5),
  //   borderRadius: width(3),
  //   flexDirection: "row",
  //   alignItems: 'center',
  //   alignSelf: 'flex-start',
  // },
  // stripeText: {
  //   fontSize: width(3),
  //   color: AppColors.black,
  //   marginRight: width(1),
  //   fontWeight: 'bold'
  // }
});
export default styles;
