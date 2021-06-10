import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import Button from '../Button';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Dropdown from '../../components/Dropdown';
import InputField from '../InputField';
const MediaModal = ({
  isVisible,
  onClose,
  onpressFirstButton,
  onpressSecondButton,
  image,
  waiting,
  onPressUploadImage,
  options,
  selected,
  setSelected,
  firstValue,
  secondValue,
  multiline,
  numoflines,
  capturedImage,
  onchangefirst,
  onchangesecond,
  detailsError,
}) => {
  return (
    <Modal onBackButtonPress={onClose} isVisible={isVisible}>
      {waiting ? (
        <ActivityIndicator size="large" color={AppColors.primaryGold} />
      ) : (
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>{'Add New Hairstyle'}</Text>
          {image ? (
            <TouchableOpacity onPress={onPressUploadImage}>
              <View style={styles.cameraView}>
                <Icon name="camera" style={styles.cameraIcon} />
              </View>
              <Text style={styles.colouredText}>Add a picture</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPressUploadImage}>
              <Image style={styles.image} source={capturedImage} />
            </TouchableOpacity>
          )}
          <InputField
            containerStyles={{width: '100%'}}
            value={firstValue}
            label={'Name'}
            onChangeText={onchangefirst}
            placeholder={'Cutting Title'}
          />
          {firstValue == '' && (
            <Dropdown
              options={options}
              disabled={firstValue == '' ? false : true}
              selected={selected}
              setSelected={setSelected}
            />
          )}
          <InputField
            multiline={multiline}
            fielderror={detailsError}
            numoflines={numoflines}
            onChangeText={onchangesecond}
            containerStyles={{width: '100%'}}
            value={secondValue}
            label={'Details'}
            placeholder={'Cutting Details'}
          />
          <View style={styles.buttonLine}>
            <Button
              title={'Add'}
              containerStyle={{
                height: 'auto',
                width: width(30),
              }}
              onPress={onpressFirstButton}
            />
            <Button
              planButton
              textStyle={{color: AppColors.black}}
              containerStyle={styles.cancel}
              title={'Cancel'}
              onPress={onpressSecondButton}
            />
          </View>
        </View>
      )}
    </Modal>
  );
};
export default MediaModal;
