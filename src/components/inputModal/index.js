import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import InputField from '../InputField';
const inputModal = ({ modalTitle, isVisible, onClose, onpressFirstButton, onpressSecondButton, image,
  firstButtonTitle, secondButtonTitle, firstLabel, secondLabel, firstValue, secondValue, multiline, numoflines
}) => {
  return (
    <Modal
      onBackButtonPress={onClose}
      isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalView} >
        <Text style={styles.modalTitle}>{modalTitle}</Text>
        {image ?
          <TouchableOpacity >
            <View style={styles.cameraView}>
              <Icon name='camera' style={styles.cameraIcon} />
            </View>
            <Text style={styles.colouredText}>Add a picture</Text>
          </TouchableOpacity>
          : null}
        <InputField containerStyles={{ width: '100%' }} value={firstValue} label={firstLabel} />
        <InputField multiline={multiline} numoflines={numoflines}
          containerStyles={{ width: '100%' }} value={secondValue} label={secondLabel} />
        <View style={styles.buttonLine}>
          <Button title={firstButtonTitle} onPress={onpressFirstButton} />
          <Button planButton textStyle={{ color: AppColors.white }}
            containerStyle={{
              backgroundColor: AppColors.transparent,
              borderColor: AppColors.primaryGold, borderWidth: width(0.15)
            }}
            title={secondButtonTitle} onPress={onpressSecondButton} />
        </View>

      </View>
    </Modal>
  );
};
export default inputModal;