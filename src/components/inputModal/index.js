import React from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import InputField from '../InputField';
const inputModal = ({ modalTitle,
  isVisible,
  onClose,
  onpressFirstButton,
  onpressSecondButton,
  image,
  onPressUploadImage,
  firstButtonTitle,
  secondButtonTitle,
  firstLabel,
  secondLabel,
  firstValue,
  secondValue,
  multiline,
  numoflines,
  onToPress,
  onFromPress,
  breakLoading
}) => {

  return (
    <Modal
      onBackButtonPress={onClose}
      isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalView} >
        <Text style={styles.modalTitle}>{modalTitle}</Text>
        {image ?
          <TouchableOpacity onPress={onPressUploadImage}>
            <View style={styles.cameraView}>
              <Icon name='camera' style={styles.cameraIcon} />
            </View>
            <Text style={styles.colouredText}>Add a picture</Text>
          </TouchableOpacity>
          : null}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={onFromPress}
          style={{ width: '100%' }}>
          <InputField
            containerStyles={{ width: '100%' }}
            value={firstValue}
            label={firstLabel}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onToPress}
          activeOpacity={0.5}
          style={{ width: '100%' }}>
          <InputField
            multiline={multiline}
            numoflines={numoflines}
            containerStyles={{ width: '100%' }}
            value={secondValue}
            label={secondLabel}
            editable={false}
          />
        </TouchableOpacity>
        <View style={styles.buttonLine}>
          <Button
            isLoading={breakLoading}
            containerStyle={{ width: width(30) }}
            title={firstButtonTitle}
            onPress={onpressFirstButton} />
          <Button
            planButton
            textStyle={{ color: AppColors.white }}
            containerStyle={styles.cancelBtn}
            title={secondButtonTitle} onPress={onpressSecondButton} />
        </View>

      </View>
    </Modal>
  );
};
export default inputModal;