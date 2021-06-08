import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    mainViewContainer: {
        height: height(100),
        alignItems: 'center',
        backgroundColor: AppColors.textColor,
        paddingTop: height(4),
    },
    heading: {
        color: AppColors.white,
        fontSize: width(8),
        fontWeight: 'bold'
    },
    text: {
        color: AppColors.white,
        fontSize: width(4)
    },
    userList: {
        paddingVertical: width(5),
        paddingHorizontal: width(5),
        width: width(90),
    },
    oneEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    leftSection: {

    },
    BtnSection: {
        flexDirection: 'row',
        width: width(30),
        justifyContent: 'space-between'
    }

});
export default styles;
