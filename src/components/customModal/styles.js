import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: width(12),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: "center",
    elevation: 5
  },
  modalText: {
    textAlign: "center",
    fontSize: width(4),
    color: AppColors.white,
    fontWeight: "bold",
  },
  modalIcon: {
    fontSize: width(12),
    color: AppColors.primaryGold,
    marginBottom: height(2)
  },
  imageIcon: {
    width: width(12),
    height: width(12),
  },
  imageIconBg: {
    backgroundColor: AppColors.primaryGold,
    padding: width(5),
    borderRadius: width(15),
    marginBottom: height(2)
  },
  cancelBtn: {
    backgroundColor: AppColors.transparent,
    borderColor: AppColors.primaryGold,
    borderWidth: width(0.15),
    width: width(25),
  },
  btnContainer: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginHorizontal: width(10), marginVertical: height(1),
  }
});
export default styles;
