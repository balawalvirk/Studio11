import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.textColor,
  },
  textRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: width(90),
    alignItems: 'center',
    marginBottom: height(2),
    marginTop: height(2)
  },
  whiteText: {
    color: AppColors.white,
    fontWeight: 'bold',
    fontSize: width(4),
  },
  white50: {
    color: AppColors.white50,
  },
  dash: {
    backgroundColor: AppColors.white50,
    width: width(85),
    alignSelf: 'center',
    height: width(0.1),
    marginVertical: height(3),
  },
  flatlist: { paddingHorizontal: width(4), },
  // ***********************drawer styling**************************
  itemStyle: {
    borderBottomColor: AppColors.white,
    borderBottomWidth: width(0.05),
    marginHorizontal: width(4),
  },
  labelStyle: {
    paddingLeft: width(3),
    fontSize: width(4),
    color: AppColors.white,
  },
  drawerContainerStyle: {
    marginHorizontal: width(2),
  },
  drawerStyle: {
    backgroundColor: AppColors.headerColor,
  },
  hairContainer: {
    width: width(42),
    height: width(42),
  },
});
export default styles;
