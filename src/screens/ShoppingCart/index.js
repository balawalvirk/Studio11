import React, { useState } from 'react';
import { View, Image, FlatList, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Thumbnail from '../../components/Thumbnail';
import InputField from '../../components/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import ProductCard from '../../components/ProductCard';
import highlightedText from '../../components/HighlightedText';
import CartItem from '../../components/CartItem';
export default function ShoppingCart(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const ItemList = [
    {
      id: '1',
      itemName: 'repellendus nam',
      rating: '4.9',
      ratingCountValue: '344',
      itemPrice: '173',
      itemQuantity: '1',
      itemImage: require('../../assets/images/shop/1.png')
    },
    {
      id: '2',
      itemName: 'reprehenderit deleniti',
      rating: '4.9',
      ratingCountValue: '344',
      itemPrice: '129',
      itemQuantity: '1',
      itemImage: require('../../assets/images/shop/2.png')
    },
    {
      id: '3',
      itemName: 'eum quos',
      rating: '4.9',
      ratingCountValue: '344',
      itemPrice: '156',
      itemQuantity: '1',
      itemImage: require('../../assets/images/shop/3.png')
    },
  ];
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Shopping Cart'}
        leadingIcon='arrow-left' onPressLeadingIcon={() => props.navigation.goBack()} />}
      transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.row}>
          <Text style={styles.whiteText}>3 Items</Text>
          <HighlightedText text={'Clear All'} />
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0, marginBottom: height(2) }} />
        <FlatList
          data={ItemList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <CartItem
                  itemImage={item.itemImage}
                  itemName={item.itemName}
                  rating={item.rating}
                  ratingCountValue={item.ratingCountValue}
                  itemPrice={item.itemPrice}
                  itemQuantity={item.itemQuantity}
                  onPressItem={() => props.navigation.navigate('ProductDetails')}
                  onPressDecrease={() => console.log('decrease')}
                  onPressIncrease={() => console.log('Increase')}
                />
                <HorizontalLine lineColor={{ width: width(90),marginBottom:height(2) }} />
              </View>
            );
          }}
        />
        <View style={styles.row}>
          <Text style={styles.whiteText}>Total Amount:</Text>
          <Text style={styles.whiteText}>$458</Text>
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0 }} />
        <Button title='Checkout' onPress={()=>props.navigation.navigate('SelectPaymentMethodShop')}
        containerStyle={{ width: width(90) }}
          gradientContainerStyle={{ borderRadius: width(3), paddingVertical: height(1.5) }} />
      </View>
    </ScreenWrapper>
  );
};