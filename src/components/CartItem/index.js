import React from 'react';
import {Text, View, Image, TouchableOpacity, FlatList} from 'react-native';
import HighlightedText from '../HighlightedText';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../utills/AppColors';
import {height} from 'react-native-dimension';

const CartItem = ({
  onPressItem,
  itemImage,
  itemName,
  rating,
  ratingCountValue,
  itemPrice,
  itemQuantity,
  onPressDecrease,
  onPressIncrease,
  imageStyle,
  imageIcons,
  images,
}) => {
  const renderImages = ({item, index}) => (
    <Image
      resizeMode="cover"
      style={styles.imageIcon}
      source={{uri: item.imageUri}}
    />
  );
  return (
    <View style={styles.cartItem}>
      <TouchableOpacity onPress={onPressItem}>
        <Image
          style={[styles.productImage, imageStyle]}
          resizeMode="cover"
          source={itemImage}
        />
      </TouchableOpacity>
      <View style={styles.itemDetails}>
        <TouchableOpacity onPress={onPressItem} style={styles.upperSection}>
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
