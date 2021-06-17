import React from 'react';
import { TouchableOpacity, Text, Image, View, ImageBackground } from 'react-native';
import styles from './styles';
import { width, height } from 'react-native-dimension'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AppColors from '../../utills/AppColors';
const ProductCard = ({
  productImage, productTitle, productRating, productRatingCount, productPrice, editable,
  onPressProduct
}) => {
  return (
    <TouchableOpacity disabled={editable} onPress={onPressProduct}
      style={styles.productCard}>
      <ImageBackground resizeMode='cover'
        source={productImage}
        style={styles.productImage} >
        {editable &&
          <View style={styles.editContainer}>
            <TouchableOpacity onPress={onPressProduct}>
              <MaterialCommunityIcons name="pencil" style={styles.editIcon} />
            </TouchableOpacity>
          </View>}
      </ImageBackground>
      <View style={styles.detailSection}>
        <Text style={styles.productName}>{productTitle}</Text>
        <View style={styles.productDetails}>
          <View style={styles.productRating}>
            <Icon name='star' style={styles.ratingIcon} />
            <Text style={styles.ratingValue}> {productRating?.toFixed(1)} ({productRatingCount})</Text>
          </View>
          <Text style={styles.productPrice}>${productPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
