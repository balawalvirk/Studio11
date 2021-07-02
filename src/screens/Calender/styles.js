import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: AppColors.textColor,
  },
  whiteText: {
    color: AppColors.white,
    fontSize: width(4),
    textAlign: 'left'
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
    flex: 1,
    borderRadius: width(5),
    padding: width(5),
    marginRight: width(5),
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: height(2),
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
    marginBottom: height(0.5)
  }
});
export default styles;
