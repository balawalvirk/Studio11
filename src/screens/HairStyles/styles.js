import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: AppColors.textColor
  },
  column: {
    justifyContent: 'space-between',
    paddingVertical: height(2)
  },
  listContainer: {
    paddingHorizontal: width(6)
  },
  hairStyle: { width: width(40), height: width(40) }
});
export default styles;
