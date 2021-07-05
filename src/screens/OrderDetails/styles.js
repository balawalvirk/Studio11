import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    mainViewContainer: {
        flex: 1,

    },
    tabContainer: {
        backgroundColor: AppColors.cardColor,
        flexDirection: 'row'
    },
    activeTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height(7),
        borderBottomWidth: height(0.4),
        borderBottomColor: AppColors.primaryGold,
    },
    inActiveTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: height(7),
    },
    tabText: {
        color: AppColors.white,
        fontSize: width(3.5)
    },
    productDetails: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    productInfo: {
        paddingVertical: height(2.5),
        paddingHorizontal: width(4),
        flex: 0.95
    },
    idText: {
        color: AppColors.white,
        fontSize: width(3.8),
        fontWeight: 'bold',
        marginVertical: height(0.5)
    },
    descrText: {
        color: AppColors.white,
        fontSize: width(3.5),
        fontWeight: 'bold',
        marginVertical: height(0.5)
    },
    priceText: {
        color: AppColors.primaryGold,
        fontWeight: 'bold',
        fontSize: width(5),
        marginVertical: height(0.5)
    },
    productImg: {
        height: width(27),
        width: width(27),
        borderRadius: width(2)
    },
    dash: {
        backgroundColor: AppColors.white,
        width: width(90),
        alignSelf: 'center',
        height: height(0.1),
        opacity: 0.3,
        marginVertical: height(1.5)
    },
    trackText: {
        color: AppColors.white,
        fontWeight: 'bold',
        fontSize: width(3.8),
        marginStart: width(5)
    },
    orderContainer: {
        marginBottom: height(3),
        marginTop: height(1)
    },
    plainBtn: {
        backgroundColor: AppColors.gray,
        elevation: 3,
        width: width(30)
    },
    flexRow: {
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'center',
        marginBottom: height(2)
    }
});
export default styles;
