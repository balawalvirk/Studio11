import React, { useState } from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import HighlightedText from '../HighlightedText';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../utills/AppColors';
import { height } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore'
const CartItem = ({
  onPressItem,
  itemImage,
  itemName,
  rating,
  ratingCountValue,
  itemPrice,
  isLoading,
  itemQuantity,
  imageStyle,
  imageIcons,
  images,
  onPlus,
  onMinus,
  qtyControls = true,
}) => {
  const renderImages = ({ item, index }) => (
    <Image
      resizeMode="cover"
      style={styles.imageIcon}
      source={{ uri: item.imageUri }}
    />
  );
  return (
    <View
      style={styles.cartItem}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPressItem}>
        <Image
          style={[styles.productImage, imageStyle]}
          resizeMode="cover"
          source={itemImage}
        />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <TouchableOpacity activeOpacity={0.7} onPress={onPressItem} style={styles.upperSection}>
          <Text style={styles.whiteText}>{itemName}</Text>
          <View style={styles.row}>
            <FontAwesome name="star" style={styles.ratingIcon} />
            <Text style={styles.white50}>
              {rating} ({ratingCountValue})
            </Text>
          </View>
          <Text
            style={[
              styles.whiteText,
              {
                marginVertical: height(0.5),
              },
            ]}>
            ${itemPrice}
          </Text>
        </TouchableOpacity>
        {qtyControls &&
          <View style={styles.qtyContainer}>
            <TouchableOpacity disabled={isLoading} onPress={() => onMinus()}>
              <FontAwesome name="minus-circle" style={styles.countIcon} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{itemQuantity}</Text>
            <TouchableOpacity disabled={isLoading} onPress={() => onPlus()}>
              <FontAwesome name="plus-circle" style={styles.countIcon} />
            </TouchableOpacity>
          </View>}
        <FlatList
          horizontal
          // style={{backgroundColor: 'teal',}}
          contentContainerStyle={styles.flatlist}
          data={images}
          renderItem={renderImages}
          keyExtractor={(item) => item.imageRef}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CartItem;
