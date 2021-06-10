import {ColorPropType, StyleSheet} from 'react-native';
import {width, height} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Colors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    // flex: 1,
    height: height(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.60)',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height(2),
  },
  heading: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(6.5),
  },
  description: {
    color: AppColors.white,
  },
  NameRow: {
    flexDirection: 'row',
    alignSelf: 'center',
    width: width(90),
    justifyContent: 'space-evenly',
    height: height(11),
  },
  RowafterInputField: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width(80),
    marginBottom: height(2),
  },
  checkIcon: {
    fontSize: width(5),
    paddingRight: width(2),
  },
  highlightedText: {
    color: AppColors.primaryGold,
  },
  blurText: {
    color: AppColors.white50,
  },
  whiteText: {
    color: AppColors.white,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: height(2),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rememberbeSection: {
    flexDirection: 'row',
  },
});
export default styles;
