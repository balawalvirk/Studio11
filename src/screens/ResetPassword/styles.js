import { ColorPropType, StyleSheet } from 'react-native';
import { width, height } from 'react-native-dimension';
import Colors from '../../utills/AppColors';

const styles = StyleSheet.create({
  mainViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.textColor
  },
  logo: {
    width: width(40),
    height: width(40),
    resizeMode: 'contain',
    marginVertical:height(4),
  },
  heading: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: width(8)
  },
  description: {
    color: Colors.white,
    textAlign:'center',
    width:width(80)
  },


  // **************************************
  modalView: {
    margin: 20,
    backgroundColor: Colors.Modalbg,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalIcon:{
    fontSize:width(4)
  }
});
export default styles;
