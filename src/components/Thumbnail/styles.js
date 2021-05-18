import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
  videoThumbnail: {
    width: width(70),
    height: height(20),
    justifyContent: 'space-between',
    marginHorizontal: width(2)
  },
  playButton: {
    fontSize: width(15),
    color: AppColors.white,
    // padding: height(5),
    alignSelf: 'center'
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
  },
  viewIcon: {
    color: AppColors.white50,
    fontSize: width(5),
    marginRight: width(2)
  },
  reactIcons: {
    fontSize: width(4),
    marginRight:width(1)
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
});
export default styles;
