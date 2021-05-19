import { StyleSheet } from 'react-native';
import AppColors from '../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({

    drawerStyleMain: {
        width: width(70)
    },
    itemStyle: {
        borderBottomColor: AppColors.white,
        borderBottomWidth: width(.05),
        marginHorizontal: width(4)
    },
    labelStyle: {
        paddingLeft: width(3),
        fontSize: width(4),
        color: AppColors.white
    },
    drawerContainerStyle: {
        // marginHorizontal: width(2)
    },
    drawerStyle: {
        backgroundColor: AppColors.headerColor
    },
});
export default styles;
