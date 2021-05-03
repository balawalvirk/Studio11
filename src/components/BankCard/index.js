import React from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

const BankCard = ({
  cardImage,cardOnPress, cardTitle,onPressDelete
}) => {
  return (
    <View style={styles.cardButton}>
      <TouchableOpacity onPress={cardOnPress} style={styles.cardLeftSection}>
        <Image style={styles.cardImage} source={cardImage} />
        <Text style={styles.cardTitle}>{cardTitle}</Text>
      </TouchableOpacity>
      <Icon onPress={onPressDelete} style={styles.cardIcon} name='trash' />
    </View>
  );
};

export default BankCard;
