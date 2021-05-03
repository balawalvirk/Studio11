import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Fontisto';

const PaymentCard = ({
  cardImage, cardTitle, iconName, accountAmount,textStyle={}, disabled, onPress
}) => {
  return (
    <TouchableOpacity 
    disabled={disabled}
    onPress={onPress} 
    // {unClickable ? activeOpacity:{1} : activeOpacity:{0.6}}
    style={styles.cardButton}>
      {/* <Icon onPress={onPressDelete} style={styles.cardIcon} name={iconName} />
      <Icon onPress={onPressDelete} style={styles.cardIcon} name='radio-btn-active' /> */}
      <Icon style={styles.cardIcon} name={iconName} />
     {cardImage ? <Image style={styles.cardImage} source={cardImage} /> : null}
      <View>
        <Text style={[styles.cardTitle,textStyle]}>{cardTitle}</Text>
       { accountAmount ? <Text style={styles.cardTitle}>{accountAmount}</Text>: null}
      </View>
    </TouchableOpacity>
  );
};

export default PaymentCard;
