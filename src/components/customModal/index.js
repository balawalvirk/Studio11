import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
const customModal = ({ iconName, description, isVisible, onClose, navigateTo, buttonLine, onpressFirstButton, onpressSecondButton,
  firstButtonTitle, secondButtonTitle, modalImage, modalImagePath
}) => {
  return (
    <Modal
      onBackButtonPress={onClose}
      isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalView} >
        {modalImage ? <View style={styles.imageIconBg}><Image style={styles.imageIcon} source={modalImagePath} /></View> : <Icon name={iconName} style={styles.modalIcon} />}
        <Text style={styles.modalText}>{description}</Text>
        {buttonLine ?
          <View style={{
            flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            marginHorizontal: width(10), marginVertical: height(1),
            backgroundColor: 'red'
          }}>
            <Button
              containerStyle={{ width: width(15) }}
              title={firstButtonTitle}
              onPress={onpressFirstButton} />
            <Button
              planButton
              textStyle={{ color: AppColors.white }}
              containerStyle={styles.cancelBtn}
              title={secondButtonTitle}
              onPress={onpressSecondButton} />
          </View> : null}

      </View>
    </Modal>
  );
};
export default customModal;