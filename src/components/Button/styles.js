import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width(6),
    width: '80%',
    alignSelf: 'center',
    paddingVertical: height(1),
    margin: width(2),
    elevation: 2
  },
  text: {
    color: AppColors.black,
    fontSize: width(4.5),
    fontWeight:'bold',
    textAlign:'center',
  }
});
export default styles;
