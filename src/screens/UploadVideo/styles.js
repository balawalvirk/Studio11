import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    width: width(100)
  },
  flexRow: {
    flexDirection: 'row',
    width: width(85),
    justifyContent: 'space-evenly'
  },
  uploadButton: {
    backgroundColor: AppColors.headerColor,
    marginTop: height(2),
    width: width(35),
    height: width(35),
    borderRadius: width(5),
    borderColor: AppColors.primaryGold,
    borderWidth: width(.20),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height(2)
  },
  videoThumbnail: {
    marginTop: height(2),
    width: width(80),
    height: height(25),
    borderRadius: width(5),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: height(2)
  },
  videoIcon: {
    fontSize: width(8),
    color: AppColors.primaryGold
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4)
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(4)
  },
  bringCenter: {
    width: width(90),
    alignItems: 'center',
    justifyContent: 'center',
    height: height(90)
  },
  progText: {
    color: AppColors.primaryGold,
    marginBottom: height(2),
    textAlign: 'center',
    alignSelf: 'center'
  }
});
export default styles;
