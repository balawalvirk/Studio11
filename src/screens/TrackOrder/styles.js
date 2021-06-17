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
        height: width(25),
        width: width(25)
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
    pastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    details: {
        flex: 0.95,
        paddingVertical: height(2),
        paddingHorizontal: width(4)
    },
    pastImg: {
        height: width(25),
        width: width(25),
    },
    id: {
        color: AppColors.white
    },
    title: {
        color: AppColors.white,
        fontWeight: 'bold'
    },
    total: {
        color: AppColors.primaryGold,
        fontWeight: 'bold'
    },
    status: {
        color: AppColors.white
    },
});
export default styles;
