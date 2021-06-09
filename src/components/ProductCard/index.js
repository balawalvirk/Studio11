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
    <TouchableOpacity onPress={onPressProduct}
      style={styles.productCard}>
      <ImageBackground resizeMode='cover'
        source={productImage}
        style={styles.productImage} >
        {editable && <View style={{ flexDirection: 'row-reverse', }}>
          <MaterialCommunityIcons name="pencil"
            style={styles.editIcon}
          />
        </View>}
      </ImageBackground>
      <View style={styles.detailSection}>
        <Text style={styles.productName}>{productTitle}</Text>
        <View style={styles.productDetails}>
          <View style={styles.productRating}>
            <Icon name='star' style={styles.ratingIcon} />
            <Text style={styles.ratingValue}> {productRating} ({productRatingCount})</Text>
          </View>
          <Text style={styles.productPrice}>${productPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
