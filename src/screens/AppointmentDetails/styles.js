import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    height: height(100),
    alignItems: 'center',
    backgroundColor: AppColors.textColor
  },
  appointmentDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width(80),
    paddingVertical: height(3)
  },
  textSection: {
    justifyContent: 'space-between',
    width: width(50)
  },
  imageSection: {
    width: width(25),
    height: width(25),
    resizeMode: 'cover',
    borderRadius: width(4),
    marginTop: height(2)
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(3.5),
  },
  goldenText: {
    color: AppColors.primaryGold,
    fontSize: width(3.5),
    marginTop: width(2)
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
    lineHeight: width(8)
  },
  transparent: {
    width: width(100),
    backgroundColor: AppColors.transparent,
    height: height(0.125),
    marginBottom: height(.1)
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width(80),
    alignContent: 'center',
  }
});
export default styles;
