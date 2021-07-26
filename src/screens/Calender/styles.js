import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(4),
    textAlign: 'left'
  },
  empty: {
    height: height(85),
    width: width(100),
    color: AppColors.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  highlightedDay: {
    borderRadius: width(4),
    borderColor: AppColors.primaryGold,
    borderWidth: width(.50),
    color: AppColors.white,
    width: width(8),
    height: width(8),
    paddingHorizontal: width(1.5),
    paddingVertical: width(1.5)
  },
  headingContainer: {
    marginVertical: height(2),
    alignSelf: 'flex-start',
    width: '100%',
    marginHorizontal: width(8)
  },
  item: {
    backgroundColor: AppColors.cardColor,
    borderRadius: width(2),
    padding: width(3.5),
    width: '95%',
    alignSelf: 'flex-end',
    marginBottom: height(1)
  },
  checkIcon: {
    color: AppColors.primaryGold,
    fontSize: width(7),
    // padding: width(6),

  },
  emptyDate: {
    height: height(5),
    flex: 1,
    paddingTop: height(5)
  },
  nameText: {
    color: AppColors.primaryGold,
    fontWeight: 'bold',
    fontSize: width(3.8)
  },
  dateText: {
    color: AppColors.white,
    fontSize: width(3)
  },
  weekRow: {
    alignItems: 'center',
    width: width(14.28),
    height: height(6)
  },
  day: {
    color: AppColors.white
  },
  month: {
    color: AppColors.white
  },
  flatlist: {
    backgroundColor: AppColors.modalBg,
    paddingVertical: height(1)
  },
  selected: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.primaryGold,
    borderRadius: width(7),
    height: height(3.5),
    width: height(3.5)
  },
  unselected: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: width(3),
    paddingVertical: width(0.5),
    paddingHorizontal: width(1)
  },
  header: {
    paddingVertical: height(1),
    width: width(100),
    paddingHorizontal: width(3)
  },
  description: {
    color: AppColors.white,
    fontSize: width(3.3),
    marginTop: height(0.75)
  },
  title: {
    fontWeight: 'bold',
    color: AppColors.white
  },
  emptyText: {
    color: AppColors.white,
    fontSize: width(4)
  }
});
export default styles;
