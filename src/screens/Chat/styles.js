import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: AppColors.modalBg,
    height: height(8),
    borderTopRightRadius: width(2),
    borderTopLeftRadius: width(2),
    paddingHorizontal: width(4)
  },
  iconContainer: {
    paddingVertical: height(1),
    paddingHorizontal: width(2),
    width: width(15),
    marginBottom: height(1.5),
    justifyContent: 'center',
    alignItems: 'center'
  },
  previewImg: {
    height: height(20),
    width: height(20),
    borderRadius: width(2),
    margin: width(1),
  },
  searchInput: { marginTop: height(1), width: width(80), }
});
export default styles;
