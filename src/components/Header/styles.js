import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension'
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    header: {
        backgroundColor: AppColors.headerColor,
        height: height(10),
        width: width(100),
        paddingTop: height(3),
        flexDirection: 'row',
        paddingHorizontal: width(5),
        elevation: 12,
        alignItems: 'center',
    },
    leadingIcon: {
        fontSize: width(5),
        color: AppColors.white,
    },
    heading: {
        color: AppColors.white,
        fontSize: width(4),
        fontWeight: 'bold',
        width: width(70),
        textAlign: 'center'
    },
    logo: {
        width: width(20),
        resizeMode: 'contain',
        marginStart: width(30)
    }

})

export default styles;