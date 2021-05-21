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

  // ****************modal view**************************
  modalView: {
    marginHorizontal: width(12),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: "center",
    elevation: 5
  },

  modalTitle: {
    textAlign: "center",
    fontSize: width(5),
    color: AppColors.white,
    fontWeight: "bold",
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width(10),
    marginVertical: height(1)
  }


});
export default styles;
