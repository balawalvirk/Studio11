import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
  },
  profileImage: {
    width: width(30),
    height: width(30),
    borderRadius: width(4),
    marginVertical: height(2),
  },
  inputRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(80),
    alignSelf: 'center',
    marginBottom: height(2),
    marginVertical: height(3),
  },
  imageContainer: {paddingVertical: height(2)},
  text: {
    marginBottom: height(1.5),
  },
});
export default styles;
