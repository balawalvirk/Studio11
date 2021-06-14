import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    // width: width(100)
  },
  topSection: {
    alignSelf: 'flex-start',
    marginTop: height(4),
    paddingHorizontal: width(5),
    width: width(90),
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(90),
    alignSelf: 'center',
    marginBottom: height(2),
    marginVertical: height(3),
    alignItems: 'center',
  },
  buttonRow: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    width: width(90),
    paddingVertical: height(0.75),
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(3.7),
    paddingVertical: height(0.5),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
  },
  countIcon: {
    color: AppColors.primaryGold,
    fontSize: width(5),
    marginHorizontal: width(4),
  },
  descriptionText: {
    width: width(90),
  },
  footerStyle: {
    backgroundColor: AppColors.cardColor,
    paddingHorizontal: width(5),
    borderTopRightRadius: width(5),
    borderTopLeftRadius: width(5),
    paddingVertical: height(2),
  },
  footerTopSection: {
    flexDirection: 'row',
    paddingHorizontal: width(5),
    paddingVertical: height(0.5),
    alignSelf: 'baseline',
    alignItems: 'center',
  },
  profileBtn: {
    width: width(42),
    height: 'auto',
    borderRadius: height(3),
  },
  buyBtn: {
    width: width(38),
    height: 'auto',
    borderRadius: height(3),
    elevation: 1,
  },
  addCartBtn: {
    backgroundColor: AppColors.cardColor,
    height: height(5),
    width: width(38),
    borderRadius: height(3),
    borderWidth: width(0.5),
    borderColor: AppColors.primaryGold,
    elevation: 1,
  },
  rowFooter: {
    alignItems: 'center',
    marginTop: height(2)
  },
  reviewImg: {
    height: height(15),
    width: height(15),
    borderRadius: width(2),
    backgroundColor: 'white',
  },
  cameraBg: {
    height: height(15),
    width: height(15),
    borderRadius: width(2),
    backgroundColor: AppColors.cardColor,
    elevation: 4,
    borderWidth: width(0.25),
    borderColor: AppColors.primaryGold,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewContainer: {
    backgroundColor: 'red',
    width: width(65),
  },
  flatlistContainer: {
    width: width(100),
    paddingHorizontal: width(2),
  }
});
export default styles;
