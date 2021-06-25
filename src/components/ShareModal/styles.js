import { StyleSheet } from 'react-native';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: 'flex-end',
        padding: 0,
        margin: 0,
    },
    container: {
        backgroundColor: AppColors.white,
        minHeight: height(25),
        borderTopRightRadius: width(4),
        borderTopLeftRadius: width(4),
        paddingHorizontal: width(6),
        paddingVertical: height(2),
    },
    circleBtn: {
        width: width(18),
        height: width(18),
        borderRadius: width(9),
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: AppColors.black,
        fontSize: width(3),
        fontWeight: 'bold',
        marginTop: height(0.5)
    },
    circleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginEnd: width(5),
        alignSelf: 'baseline',
    },
    flexRow: {
        flexDirection: 'row',
        flex: 1,
    }
});
export default styles;
