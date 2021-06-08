import { StyleSheet } from 'react-native';
import AppColors from '../../utills/AppColors';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    dropdownView: {
        marginBottom: width(1)
    },
    dropdownLabelText: {
        color: AppColors.white50,
        fontSize: width(4),
    },
    Placeholders: {
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: width(1)
    },
    dropdownField: {
        width: width(65),
        backgroundColor: AppColors.transparent,
        borderWidth: width(0.15),
        padding: width(1),
        height: height(5),
        borderRadius: width(5),
        justifyContent: 'center',
        borderColor: AppColors.primaryGold,
        marginBottom: height(1.5)
    },
    dropdownText: {
        color: AppColors.white,
        fontSize: width(4),
    },
    dropdownIcon: {
        color: AppColors.primaryGold,
        fontSize: width(4)
    },
    dropdownStyle: {
        backgroundColor: AppColors.transparent,
        borderWidth: width(0.15),
        borderRadius: width(1),
        borderColor: AppColors.modalBg,
        width: width(60),
    },
    dropDownRow: {
        backgroundColor: AppColors.black,
        height: height(4.5),
        justifyContent: 'center',
        paddingHorizontal: width(2),
        borderRadius: width(1)
    },
    textColor: {
        color: AppColors.white,
        fontSize: width(4),
    },
    text: {
        color: AppColors.white,
        fontSize: width(4),
        paddingHorizontal: width(4),
        flex: 0.95
    },
    flexRow: {
        flexDirection: 'row',
        // justifyContent:''
    }
}
);
export default styles;
