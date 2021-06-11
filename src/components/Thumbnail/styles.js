import {StyleSheet} from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  container: {
    marginRight: width(3.5),
    borderRadius: width(4),
    overflow: 'hidden',
    justifyContent: 'center',
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
  leftSection: {
    position: 'absolute',
    bottom: height(1),
    left: width(2),
  },
  editIcon: {
    fontSize: width(5),
    color: AppColors.primaryGold,
    backgroundColor: AppColors.headerColor,
    padding: width(1),
    margin: width(2.5),
    borderRadius: width(4),
  },
  playButton: {
    fontSize: width(15),
    color: AppColors.white,
    alignSelf: 'center',
    position: 'absolute',
    top: height(5),
  },
  videoStats: {
    paddingHorizontal: width(2),
    paddingBottom: width(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: height(2),
  },
  viewIcon: {
    color: AppColors.white50,
    fontSize: width(4),
    marginRight: width(2),
  },
  reactIcons: {
    fontSize: width(4),
    marginRight: width(1),
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(3.7),
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5),
  },
  checkIcon: {
    color: AppColors.primaryGold,
    backgroundColor: AppColors.textColor,
    borderRadius: width(1),
    fontSize: width(6),
    position: 'absolute',
    top: width(2),
    left: width(2),
  },
});
export default styles;
