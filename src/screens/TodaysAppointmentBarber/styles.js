import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
    paddingTop: height(4)
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width(90),
    // backgroundColor:'red',
    marginVertical: width(4),
  },
  messageLeftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width(70)
  },
  messageTime: {
    alignSelf: 'center',
    width: width(15)
  },
  messageDp: {
    width: width(15),
    height: width(15),
    borderRadius: width(10),
    resizeMode: 'cover',
  },
  messageDetails: {
    marginLeft: width(2),
    width: (100)
  },
  userTitle: {
    fontWeight: 'bold',
    color: AppColors.white,
    fontSize: width(4)
  },
  messageText: {
    color: AppColors.white50,
    fontSize: width(4),
    width: width(55)
  },
  messageTimeText: {
    color: AppColors.white50,
    fontSize: width(4),
    textAlign: 'right',
  },
  transparent: {
    width: width(100),
    backgroundColor: AppColors.transparent,
    height: height(0.125),
    marginBottom: height(.1)
  },
  emptyContainer: {
    height: height(60),
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    color: AppColors.primaryGold,
    fontSize: width(4),
    fontWeight: 'bold'
  }
});
export default styles;
