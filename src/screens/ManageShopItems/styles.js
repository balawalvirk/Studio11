import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

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
    marginBottom: height(2.5),
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
  // ****************modal view**************************
  modalView: {
    marginHorizontal: width(8),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: 'center',
    elevation: 5,
  },

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
  dash: {
    backgroundColor: AppColors.white50,
    width: width(90),
    height: height(0.1),
    alignSelf: 'center',
    marginBottom: height(1),
  },
});
export default styles;
