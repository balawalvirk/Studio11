import React from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import CartItem from '../../components/CartItem';
import { ItemList } from '../../dummyData';
export default function ShoppingCart(props) {

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
                <HorizontalLine lineColor={{ width: width(90), marginBottom: height(2) }} />
              </View>
            );
          }}
        />
        <View style={styles.row}>
          <Text style={styles.whiteText}>Total Amount:</Text>
          <Text style={styles.whiteText}>$458</Text>
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0 }} />
        <Button title='Checkout' onPress={() => props.navigation.navigate('SelectPaymentMethodShop')}
          containerStyle={{ width: width(90) }}
          gradientContainerStyle={{ borderRadius: width(3), paddingVertical: height(1.5) }} />
      </View>
    </ScreenWrapper>
  );
};