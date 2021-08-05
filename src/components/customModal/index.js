import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
const customModal = ({ iconName, description, isVisible, onClose, navigateTo, buttonLine, onpressFirstButton, onpressSecondButton,
  firstButtonTitle, secondButtonTitle, modalImage, modalImagePath, cancelLoading
}) => {
  return (
    <Modal
      onBackButtonPress={onClose}
      isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalView} >
        {modalImage ? <View style={styles.imageIconBg}><Image style={styles.imageIcon} source={modalImagePath} /></View> : <Icon name={iconName} style={styles.modalIcon} />}
        <Text style={styles.modalText}>{description}</Text>
        {buttonLine ?
          <View style={styles.btnContainer}>
            <Button
              planButton
              textStyle={{ color: AppColors.white }}
              containerStyle={styles.cancelBtn}
              title={secondButtonTitle}
              onPress={onpressSecondButton} />
            <Button
              isLoading={cancelLoading}
              containerStyle={{ width: width(25) }}
              title={firstButtonTitle}
              onPress={onpressFirstButton} />
          </View> : null}

      </View>
    </Modal>
  );
};
export default customModal;