import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { Text, View } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
const customModal = ({iconName,description, isVisible, onClose,navigateTo, buttonLine, onpressFirstButton, onpressSecondButton,
  firstButtonTitle,secondButtonTitle
}) => {
    return(
        <Modal 
        onBackButtonPress={onClose} 
        isVisible={isVisible} onBackdropPress={onClose}>
          <View style={styles.modalView} >
          <Icon name={iconName} style={styles.modalIcon}/>
            <Text style={styles.modalText}>{description}</Text>
            {buttonLine ?  
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
            marginHorizontal:width(10),marginVertical:height(1)}}>
            <Button title={firstButtonTitle} onPress={onpressFirstButton} />
            <Button planButton textStyle={{color:AppColors.white}} 
            containerStyle={{backgroundColor:AppColors.transparent, borderColor:AppColors.primaryGold,borderWidth:width(0.15)}} 
            title={secondButtonTitle} onPress={onpressSecondButton}  />
            </View> : null}
           
          </View>
        </Modal>
    );
};
export default customModal;