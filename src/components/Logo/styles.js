import {ColorPropType, StyleSheet} from 'react-native';
import {width, height} from 'react-native-dimension';

const styles = StyleSheet.create({
  logo: {
    width: width(50),
    height: width(40),
    resizeMode: 'contain',
    marginVertical: height(1.2),
  },
});
export default styles;
