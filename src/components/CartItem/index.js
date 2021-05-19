import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import HighlightedText from '../HighlightedText';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../utills/AppColors'

const CartItem = ({
  onPressItem, itemImage, itemName, rating, ratingCountValue, itemPrice, itemQuantity,
  onPressDecrease, onPressIncrease, imageStyle, imageIcons
}) => {
  return (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={onPressItem}>
        <Image style={[styles.productImage, imageStyle]} resizeMode='contain'
          source={itemImage} />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <TouchableOpacity onPress={onPressItem} style={styles.upperSection}>
          <Text style={styles.whiteText}>{itemName}</Text>
          <View style={styles.row}>
            <FontAwesome name='star' style={styles.ratingIcon} />
            <Text style={styles.white50}> {rating} ({ratingCountValue})</Text>
          </View>
          <Text style={styles.whiteText}>${itemPrice}</Text>
        </TouchableOpacity>
        <View style={styles.lowerSection}>
          <View style={styles.row}>
            {imageIcons ? (<>
            <Image resizeMode='contain' style={styles.imageIcon} source={itemImage} />
            <Image resizeMode='contain' style={styles.imageIcon} source={itemImage} />
            <Image resizeMode='contain' style={styles.imageIcon} source={itemImage} />
            </>) : (
              <>
                <Text style={styles.white50}>Quantity:</Text>
                <FontAwesome onPress={onPressDecrease} name='minus-circle' style={styles.countIcon} />
                <Text style={styles.white50}>{itemQuantity}</Text>
                <FontAwesome onPress={onPressIncrease} name='plus-circle'
                  style={styles.countIcon} />
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;
