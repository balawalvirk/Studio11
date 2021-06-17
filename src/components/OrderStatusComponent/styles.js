import { StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension'
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    row: {
        width: width(90),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: AppColors.cardColor,
        borderRadius: width(5),
        paddingHorizontal: width(5),
        paddingVertical: height(1.5),
        alignItems: 'center',
        marginTop: height(1)
    },
    textContainer: {
        width: '70%',
        marginStart: width(4)
    },
    goldTitle: {
        color: AppColors.primaryGold,
        fontWeight: 'bold',
        fontSize: width(3.2),
        marginVertical: height(0.25)
    },
    text: {
        color: AppColors.white,
        fontSize: width(3.2),
        marginVertical: height(0.25)
    }
})

export default styles;