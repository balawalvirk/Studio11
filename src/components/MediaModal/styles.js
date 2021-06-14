import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  modalView: {
    marginHorizontal: width(8),
    backgroundColor: AppColors.modalBg,
    borderRadius: width(5),
    padding: width(5),
    alignItems: 'center',
  },
  modalTitle: {
    textAlign: 'center',
    fontSize: width(4),
    color: AppColors.white,
    marginBottom: height(2),
    fontWeight: 'bold',
  },
  colouredText: {
    textAlign: 'center',
    marginVertical: height(1),
    fontSize: width(4),
    color: AppColors.primaryGold,
  },
  cameraView: {
    marginTop: height(2),
    backgroundColor: AppColors.textColor,
    padding: width(10),
    borderColor: AppColors.primaryGold,
    borderWidth: width(0.25),
    borderRadius: width(5),
    marginBottom: height(2)
  },
  image: {
    width: width(30),
    height: width(30),
    borderRadius: width(20),
  },
  cameraIcon: {
    color: AppColors.primaryGold,
    fontSize: width(5),
  },
  buttonLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: width(12),
    marginVertical: height(1),
  },
  cancel: {
    height: height(5),
    width: width(30),
    // elevation: 1,
    backgroundColor: AppColors.iconColor,
  },
  yellowText: {
    color: AppColors.primaryGold,
    alignSelf: 'flex-start',
    paddingBottom: height(1)
  },
  orText: {
    color: AppColors.primaryGold,
    paddingBottom: height(2)
  }
});
export default styles;
