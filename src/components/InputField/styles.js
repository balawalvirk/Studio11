import { StyleSheet } from 'react-native';
import {height, width} from 'react-native-dimension'
import AppColors from '../../utills/AppColors';

const styles = StyleSheet.create({
    label:{
        color:AppColors.white50,
        marginLeft:width(4),
        marginVertical:height(1)
    },
    Texterror:{
        color:AppColors.red,
        marginLeft:width(4),
        // marginVertical:height(1)
    },
    InputField:{
        borderRadius:width(6),
        borderColor:AppColors.primaryGold,
        borderWidth:width(0.15),
        paddingVertical:height(0.5),
        color:AppColors.white,
        textDecorationLine:'none',
        paddingHorizontal:width(5),
    },
});
export default styles;
