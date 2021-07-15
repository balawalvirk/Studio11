import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    // paddingTop: height(4),
  },
  input: {
    borderRadius: width(4),
    height: height(5.5)
  },
  modalConatiner: {
    width: width(80),
    height: height(5.5),
    borderRadius: width(4),
    paddingHorizontal: width(4),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: width(0.15),
    borderColor: AppColors.primaryGold,
    marginVertical: height(1)
  },
  dropText: {
    color: AppColors.white,
    flex: 1
  },
  dropDown: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    marginTop: -height(4)
  },
  priceContainer: {
    backgroundColor: AppColors.white,
    width: width(30),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    width: width(80),
  },
  rowText: {
    color: AppColors.black
  },
  label: {
    color: AppColors.white50,
    alignSelf: 'flex-start',
    marginStart: width(14),
  },
  calendar: {
    height: height(40),
    width: width(100),
  },
  item: {
    backgroundColor: AppColors.cardColor,
    flex: 1,
    borderRadius: width(5),
    padding: width(5),
    marginRight: width(5),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: height(2),
  },
  nameText: {
    color: AppColors.primaryGold,
    marginBottom: height(0.5)
  },
  emptyDate: {
    height: height(5),
    flex: 1,
    paddingTop: height(5)
  },
  apptContainer: {
    // width: width(90),
    padding: width(1),
    alignItems: 'center',
    backgroundColor: AppColors.modalBg,
    minHeight: height(8),
    marginBottom: height(2),
    borderRadius: width(2),
    alignSelf: 'center',
    paddingHorizontal: width(2),
    paddingVertical: height(1)
  },
  listTitle: {
    color: AppColors.white,
    paddingVertical: height(2),
    marginStart: width(4),
    fontWeight: 'bold',
    fontSize: width(3.7)
  },
  golden: {
    color: AppColors.primaryGold,
    fontSize: width(4.2)
  },
  goldenSmall: {
    color: AppColors.white,
    fontSize: width(3.4)
  },
});
export default styles;
