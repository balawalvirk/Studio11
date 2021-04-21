import { StyleSheet } from 'react-native';
import {height, width} from 'react-native-dimension'
import Colors from '../../utills/AppColors';

const styles = StyleSheet.create({
    label:{
        color:Colors.white50,
        marginLeft:width(4),
        marginVertical:height(1)
    },
    Texterror:{
        color:Colors.red,
        marginLeft:width(4),
        // marginVertical:height(1)
    },
    InputField:{
        borderRadius:width(6),
        borderColor:Colors.primaryGold,
        borderWidth:width(0.5),
        // width:width(80),
        color:Colors.white,
        paddingHorizontal:width(5)
    },
});
export default styles;
