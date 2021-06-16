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
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4)
  },
  white50: {
    color: AppColors.white50,
    fontSize: width(3.5)
  },
  bgImage: {
    width: width(100),
    height: height(25)
  },
  playButton: {
    fontSize: width(15),
    color: AppColors.white,
    alignSelf: 'center',
    padding: width(15)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    width: width(90)
  },
  viewContainer: {
    flexDirection: 'row',
    marginTop: height(1)
  },
  viewIcon: {
    color: AppColors.white50,
    fontSize: width(4.5),
    marginRight: width(2)
  },
  commentIcon: {
    color: AppColors.white,
    fontSize: width(5),
    marginRight: width(2)
  },
  likeIcon: {
    color: AppColors.primaryGold,
    fontSize: width(5),
  },
  ScrollView: {
    // width:width(90),
    marginTop: height(2)
  },
  bringCenter: {
    width: width(90),
    alignSelf: 'center'
  },
  Centerline: {
    width: width(90),
    alignSelf: 'center',
    marginTop: height(2),
    marginBottom: height(1)
  },
  comment: {
    width: width(90),
    color: AppColors.white50,
    fontSize: width(4),
    marginLeft: width(5)
  },
  btnContainer: {
    width: width(40),
    borderRadius: height(3)
  },
  font35: {
    fontSize: width(3.5)
  },
  likeContainer: {
    alignItems: 'center'
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  postBtn: {
    width: width(25),
    borderRadius: height(3),
    // marginTop: height(1)
  },
  commentText: {
    color: AppColors.white,
    fontSize: width(3.8),
    fontWeight: 'bold',
    marginStart: width(4)
  },
  commentContainer: {
    paddingVertical: height(1.5)
  },
  commentCountContainer: {
    flexDirection: 'row',
    paddingVertical: height(1.5),
    paddingHorizontal: width(5)
  }
});
export default styles;
