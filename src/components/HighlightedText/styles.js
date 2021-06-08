import { ColorPropType, StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'red',
        // padding: width(1)
    },
    highlightedText: {
        color: AppColors.primaryGold,
        fontSize: width(3),
        textAlign: 'center'
    },
});
export default styles;
