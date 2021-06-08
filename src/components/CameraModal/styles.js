
import { StyleSheet } from 'react-native';
import { width, height, totalSize } from 'react-native-dimension';

const styles = StyleSheet.create({
    imageModalContainer: {
        backgroundColor: 'white',
        width: width(70),
        borderRadius: width(5),
        alignSelf: 'center',
        paddingBottom: height(3)
    },
    closeContainer: {
        width: width(70),
        alignSelf: 'center',
        alignItems: 'flex-end',
        marginTop: width(4),
        justifyContent: 'space-between',
        paddingHorizontal: width(4)
    },
    buttonContainer: {
        width: width(70),
        height: height(15),
        justifyContent: 'space-evenly',
    },
    picOption: {
        paddingLeft: width(12),
        alignItems: 'center',
        flexDirection: 'row'
    },
    picOptionText: {
        marginLeft: width(2),
        fontSize: totalSize(2)
    },
    line: {
        width: '70%',
        alignSelf: 'center',
        backgroundColor: 'gray',
        height: 0.5
    }
})
export default styles;
