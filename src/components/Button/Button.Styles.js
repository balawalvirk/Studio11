import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: AppColors.green,
    width: '80%',
    alignSelf: 'center',
    paddingVertical: 10,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    color: "white",
    fontSize: 20,
    textShadowRadius: 0.1,
    textShadowColor: AppColors.darkGreen,
    textShadowOffset: { width: 1.2, height: 1.2 }
  }
});
export default styles;
