import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import {width, height} from 'react-native-dimension'

const styles = StyleSheet.create({

  cardButton: {
    backgroundColor: AppColors.cardColor,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'center',
    width: width(80),
    borderRadius: width(4),
    height: height(10),
    marginVertical: height(2)
  },
  cardImage: {
    width: width(15),
    height: width(15),
    resizeMode: 'contain',
    marginRight: width(3)
  },
  cardTitle: {
    color: AppColors.white,
    fontSize: width(4)
  },
  cardIcon: {
    color: AppColors.primaryGold,
    fontSize: width(4),
    margin: width(4)
  },
});
export default styles;
