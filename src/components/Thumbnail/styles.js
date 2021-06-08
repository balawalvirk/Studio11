import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width(2),
    borderRadius: width(4),
    overflow: 'hidden',
  },
  videoThumbnail: {
    width: width(70),
    height: height(20),
  },
  imageContent: {
    position: 'absolute',
    width: width(70),
    height: height(20),
  },
  editIcon: {
    fontSize: width(5),
    color: AppColors.primaryGold,
    backgroundColor: AppColors.headerColor,
    padding: width(1),
    margin: width(2.5),
    borderRadius: width(4)
  },
  playButton: {
    fontSize: width(15),
    color: AppColors.white,
    // padding: height(5),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  videoStats: {
    paddingHorizontal: width(2),
    paddingBottom: width(2),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height(2)
  },
  viewIcon: {
    color: AppColors.white50,
    fontSize: width(5),
    marginRight: width(2)
  },
  reactIcons: {
    fontSize: width(4),
    marginRight: width(1)
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
  checkIcon: {
    color: AppColors.primaryGold,
    backgroundColor: AppColors.textColor,
    borderRadius: width(1),
    fontSize: width(6),
    position: 'absolute',
    top: width(2),
    left: width(2)
  }
});
export default styles;
