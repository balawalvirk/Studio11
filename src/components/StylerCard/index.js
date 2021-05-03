import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import HighlightedText from '../HighlightedText';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/Entypo';
import AppColors from '../../utills/AppColors'

const StylerCard = ({
   stylerName,Haircuts,ratings,price,styleImage, onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.StylerCard}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.stylerTitle}>{stylerName}</Text>
              <Text style={styles.white50}>{Haircuts}</Text>
              <View style={styles.stylerRating}>
                <Icon style={styles.ratingIcon} name="star"/>
                <Text style={styles.ratingText}>{ratings}</Text>
              </View>
            </View>
            <Text style={styles.white50}>{price}</Text>
          </View>
          <Image style={styles.imageSection} source={styleImage} />
        </TouchableOpacity>
    );
};

export default StylerCard;
