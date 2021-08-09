import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AppColors from '../../utills/AppColors';
import { height } from 'react-native-dimension';

const BankCard = ({
  cardImage, cardOnPress, cardTitle, onPressDelete, onCheckPress, selectable = false, selectedIndex = -1, index, containerStyle = {}
}) => {
  return (
    <View style={[styles.cardButton, containerStyle]}>
      {selectable && <TouchableOpacity style={styles.radioBtn} onPress={onCheckPress}>
        <Fontisto
          name={selectedIndex == index ? 'radio-btn-active' : 'radio-btn-passive'}
          color={AppColors.primaryGold}
          size={height(2.5)}
        />
      </TouchableOpacity>}
      <TouchableOpacity onPress={cardOnPress} style={styles.cardLeftSection}>
        <Image style={styles.cardImage} source={cardImage} />
        <Text style={styles.cardTitle}>{cardTitle}</Text>
      </TouchableOpacity>
      {!selectable && <Icon onPress={onPressDelete} style={styles.cardIcon} name='trash' />}
    </View>
  );
};

export default BankCard;
