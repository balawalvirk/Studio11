import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        height: height(22),
        width: width(85),
    },
    loaderContainer: {
        marginTop: height(10)
    }
});
export default styles;
