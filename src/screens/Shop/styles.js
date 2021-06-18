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
  searchView: {
    flexDirection: 'row',
    width: width(100),
    alignItems: 'center',
    paddingHorizontal: width(4),
    paddingTop: height(2),
  },
  filterButton: {
    width: width(15),
    height: width(15),
    backgroundColor: AppColors.headerColor,
    borderRadius: width(5),
    marginLeft: width(2),
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(4),
  },
  flatlistcolumn: {
    justifyContent: 'space-between',
    paddingVertical: height(2),
  },
  dash: {
    backgroundColor: AppColors.white09,
    marginTop: 0,
    marginVertical: height(2),
    width: width(60),
  },
  flatlist: {
    width: width(90),
  },
  btnContainer: {
    backgroundColor: AppColors.transparent,
    borderColor: AppColors.primaryGold,
    borderWidth: width(0.15),
    width: width(25)
  },
  searchIcon: {
    color: AppColors.primaryGold,
    fontSize: width(6)
  },
  renderedIcons: {
    fontSize: width(5),
    color: AppColors.primaryGold
  },
  // ****************modal view**************************
  modalView: {
    marginHorizontal: width(8),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: 'center',
    elevation: 5,
  },
  icon: { width: width(10), alignItems: 'center', height: height(5), justifyContent: 'center' },
  modalTitle: {
    textAlign: 'center',
    fontSize: width(5),
    color: AppColors.white,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width(12),
    marginVertical: height(1),
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width(65),
    marginHorizontal: width(10),
    marginVertical: height(1),
  },
});
export default styles;
