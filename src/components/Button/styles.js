import {StyleSheet} from 'react-native';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(2.5),
    alignSelf: 'center',
    width: width(80),
    height: height(5.5),
    margin: width(2),
    overflow: 'hidden',
  },
  gradientContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width(80),
    height: height(5.5),
    paddingVertical: height(1),
    alignSelf: 'center',
  },
  text: {
    color: AppColors.black,
    fontSize: width(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default styles;
