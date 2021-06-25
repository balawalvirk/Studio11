import { StyleSheet } from 'react-native';
import { height, totalSize, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: width(2),
    },
    avatarImg: {
        height: height(4),
        width: height(4),
        borderRadius: height(2),
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    mssgImage: {
        height: height(20),
        minWidth: width(50),
    },
    textContainer: {
        paddingHorizontal: width(4),
        paddingVertical: height(1.5),
    },

    ///////MESSAGE STYLES
    mssgContainer: {
        backgroundColor: AppColors.gray,
        overflow: 'hidden',
        alignSelf: 'baseline',
        borderBottomLeftRadius: width(3),
        borderBottomRightRadius: width(3),
        borderTopRightRadius: width(3),
        marginLeft: width(1),
        maxWidth: width(80),

        marginVertical: height(2)
    },
    mssgTimeText: {
        color: AppColors.white,
        fontSize: width(2.8),
        marginTop: height(1)
    },
    mssgText: {
        color: AppColors.white,
        fontSize: width(3.7),

    },
    /////////
    //////MY MESSAGE
    myMssgContainer: {
        backgroundColor: AppColors.primaryGold,
        overflow: 'hidden',
        borderBottomLeftRadius: width(3),
        borderBottomRightRadius: width(3),
        borderTopLeftRadius: width(3),
        marginRight: width(1),
        marginVertical: height(2),
        maxWidth: width(80)
    },
    myMssgText: {
        color: AppColors.white,
        fontSize: width(3.7),

    },
    myMssgTimeText: {
        color: AppColors.white,
        fontSize: width(2.8),
        marginTop: height(1)
    },

    ///////
});
export default styles;
