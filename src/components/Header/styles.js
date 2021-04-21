import { StyleSheet } from 'react-native';
import Colors from '../../utills/AppColors';
import { width, height } from 'react-native-dimension'

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.headerColor,
        height: height(10),
        paddingTop:height(3),
        flexDirection:'row',
        paddingHorizontal:width(5),
        elevation:12,
        alignItems:'center',
        justifyContent: 'space-between'
    },
    leadingIcon: {
        fontSize: width(5),
        color: Colors.white,
    },
    heading: {
        color: Colors.white,
        fontSize: width(5),
        textAlign: 'center'
    },

})

export default styles;