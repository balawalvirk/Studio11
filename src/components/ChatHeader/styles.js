import { StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    headerContainer: {
        width: width(100),
        height: height(8),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.appColor2,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.inputBorder,
    },
    headerInnerContainer: {
        width: width(90),
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // justifyContent: 'space-between',
    },
    infoContainer: {
        flexDirection: 'row',
        width: width(70),
        paddingHorizontal: width(2),
        alignItems: 'center',
    },
    technicianImage: {
        height: totalSize(5),
        width: totalSize(5),
        borderRadius: totalSize(2.5),
    },
    nameContainer: {
        marginLeft: width(2),
    },
    nameText: {
        color: AppColors.appTextColor1,
        fontSize: totalSize(1.75),
    },
    jobText: {
        color: AppColors.appColor1,
        fontSize: totalSize(1.65),
        marginTop: height(1),
    },
});
export default styles;
