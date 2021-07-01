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
    justifyContent: 'space-between',
    width: width(90),
    alignItems: 'center',
    marginTop: height(1.5),
  },
  filterButton: {
    width: width(13),
    height: width(13),
    backgroundColor: AppColors.headerColor,
    borderRadius: width(5),
  },
  filterContainer: {
    width: width(13),
    height: width(13),
    borderRadius: width(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
  },
  columnWrapper: {
    width: width(90),
    justifyContent: 'space-between',
    paddingVertical: height(2),
  },
  btn: {
    marginVertical: height(2),
  },
  cancelBtn: {
    backgroundColor: AppColors.transparent,
    borderColor: AppColors.primaryGold,
    borderWidth: width(0.15),
    width: width(25)
  },
  radioContainer: {
    marginTop: height(1.5),
    flexDirection: 'row',
    width: width(65),
    justifyContent: 'space-evenly'
  },

  // ****************modal view**************************
  modalView: {
    marginHorizontal: width(6),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: 'center',
    elevation: 5,
  },

  modalTitle: {
    textAlign: 'center',
    fontSize: width(4),
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
    width: width(70),
    marginHorizontal: width(10),
    marginVertical: height(1),
  },
  dash: {
    backgroundColor: AppColors.white50,
    width: width(90),
    height: height(0.1),
    alignSelf: 'center',
    marginBottom: height(1),
  },
  labelStyle: { fontSize: width(3) },
  dropContainer: {
    width: width(65),
    paddingHorizontal: width(4),
    paddingVertical: height(1),
    borderWidth: width(0.15),
    borderColor: AppColors.primaryGold,
    borderRadius: height(3),
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedText: {
    color: AppColors.white50,
    flex: 1
  },
  label: {
    color: AppColors.white50,
    fontSize: width(3),
    marginStart: width(2),
    marginBottom: height(0.5)
  },
  flexRow: {
    flexDirection: 'row',
  },
  dropDown: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  priceContainer: {
    backgroundColor: AppColors.black,
    width: width(65),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    borderRadius: width(1.5)
  },
  rowText: {
    color: AppColors.white
  }
});
export default styles;
