import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

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
    alignItems: 'center'
  },
  filterButton: {
    width: width(15),
    height: width(15),
    backgroundColor: AppColors.headerColor,
    borderRadius: width(5),
    marginLeft: width(2),
    marginTop: width(2),
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
  cancelBtn: {
    backgroundColor: AppColors.transparent,
    borderColor: AppColors.primaryGold,
    borderWidth: width(0.15),
    width: width(25)
  },
  applyBtn: {
    width: width(25)
  },
  label: {
    color: AppColors.white50,
    fontSize: width(3),
    marginStart: width(2),
    marginBottom: height(0.5)
  },
  dropContainer: {
    width: width(32),
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
  dash: {
    backgroundColor: AppColors.white09,
    marginTop: 0,
    marginVertical: height(2),
    width: width(60),
  },
  priceContainer: {
    backgroundColor: AppColors.black,
    width: width(30),
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    borderRadius: width(1.5)
  },
  rowText: {
    color: AppColors.white
  },
  dropDown: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  // ****************modal view**************************
  modalView: {
    marginHorizontal: width(10),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: "center",
    elevation: 5
  },
  modalTitle: {
    textAlign: "center",
    fontSize: width(4),
    color: AppColors.white,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width(10),
    marginVertical: height(1)
  },
  width60: { width: width(60) },
  labelStyle: {
    fontSize: width(3)
  }
});
export default styles;
