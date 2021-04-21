import { ColorPropType, StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import Colors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)'
  },
  heading: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: width(8)
  },
  description: {
    color: Colors.white,
  },
  RowafterInputField: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(80),
    alignItems: 'center',
    marginBottom: height(2)
  },
  highlightedText: {
    color: Colors.primaryGold
  },
  blurText: {
    color: Colors.white50
  },
  whiteText: {
    color: Colors.white
  },
  TextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(2)
  },
  rememberbeSection: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkIcon: {
    fontSize: width(5),
    paddingRight: width(2)
  }
});
export default styles;
