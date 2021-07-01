import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { FlatList, Text, View, ActivityIndicator } from 'react-native';
import { height, width } from 'react-native-dimension';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import CartItem from '../../components/CartItem';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { checkout, clearCart, getAllOfCollection, getData, removeFromArrayInObj, saveData } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import { setCart } from '../../Redux/Actions/Customer';
import AppColors from '../../utills/AppColors';
import { OrderStatus } from '../../utills/Enums';
import styles from './styles';
export default function ShoppingCart(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const cart = useSelector(state => state.Customer.cart)
  const [isLoading, setLoading] = useState(false)
  const [checkOutLoading, setCheckoutLoading] = useState(false)
  const [screenLoading, setScreenLoading] = useState(false)
  const renderCartItem = ({ item, index }) =>
    <CartItem
      itemImage={{ uri: item.images[0].imageUri }}
      itemName={item?.name}
      rating={item?.rating}
      ratingCountValue={item?.ratingCount}
      itemPrice={item?.price}
      itemQuantity={item.quantity}
      onPressItem={() => props.navigation.navigate('ProductDetails', { item })}

      onPlus={() => onPlus(item)}
      onMinus={() => onMinus(item)}
      quantity={item.quantity}
      isLoading={isLoading}
    />
  const onPlus = async (item) => {
    try {
      setLoading(true)
      await firestore()
        .collection('Cart')
        .doc(auth().currentUser.uid)
        .collection('Cart')
        .doc(item.id)
        .set({
          quantity: firestore.FieldValue.increment(1)
        }, { merge: true })
      await saveData('Cart', auth().currentUser.uid, { total: Number(cart.total) + Number(item.price) })
      const snap = await firestore()
        .collection('Cart')
        .doc(auth().currentUser.uid)
        .collection('Cart')
        .get()
      let items = []
      snap.forEach(doc => {
        items.push(doc.data())
      })
      dispatch(setCart({
        ...cart,
        total: Number(cart.total) + Number(item.price),
        cartItems: items
      }))

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }
  const onMinus = async (item) => {
    try {
      setLoading(true)
      if (item.quantity == 1) {
        //decrease itemcount decrease price remove item
        await firestore().collection('Cart')
          .doc(auth().currentUser.uid)
          .set({
            itemCount: firestore.FieldValue.increment(-1),
            total: Number(cart.total) - Number(item.price)
          }, { merge: true })
        await firestore().collection('Cart').doc(auth().currentUser.uid).collection('Cart').doc(item.id).delete()
        const snap = await firestore()
          .collection('Cart')
          .doc(auth().currentUser.uid)
          .collection('Cart')
          .get()
        let items = []
        snap.forEach(doc => {
          items.push(doc.data())
        })
        dispatch(setCart({
          itemCount: Number(cart.itemCount) - 1,
          total: Number(cart.total) - Number(item.price),
          cartItems: items
        }))
        return
      }
      await firestore()
        .collection('Cart')
        .doc(auth().currentUser.uid)
        .collection('Cart')
        .doc(item.id)
        .set({
          quantity: firestore.FieldValue.increment(-1)
        }, { merge: true })

      await firestore()
        .collection('Cart')
        .doc(auth().currentUser.uid)
        .set({
          total: Number(cart.total) - Number(item.price),
        }, { merge: true })
      const snap = await firestore()
        .collection('Cart')
        .doc(auth().currentUser.uid)
        .collection('Cart')
        .get()
      let items = []
      snap.forEach(doc => {
        items.push(doc.data())
      })
      dispatch(setCart({
        ...cart,
        total: Number(cart.total) - Number(item.price),
        cartItems: items
      }))
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }
  const onPressClearAll = async () => {
    setScreenLoading(true)
    try {
      await clearCart()
      dispatch(setCart({
        cartItems: [],
        itemCount: 0,
        total: 0
      }))
      setScreenLoading(false)
    } catch (error) {
      console.log(error.message)
      setScreenLoading(false)

    }
  }
  const onCheckoutPress = async () => {
    if (cart?.cartItems.length > 0) {
      setCheckoutLoading(true)
      const orderId = firestore().collection('rnd').doc().id
      let orderObj = {
        ...cart,
        status: OrderStatus.PLACED,
        customerId: user.id,
        id: orderId,
      }
      try {
        await checkout(orderObj)
        await clearCart()
        dispatch(setCart({
          cartItems: [],
          itemCount: 0,
          total: 0
        }))
        setCheckoutLoading(false)
        props.navigation.goBack()
      } catch (error) {
        console.log(error.message)
        setCheckoutLoading(false)
      }
    }
  }
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Shopping Cart'}
        leadingIcon='arrow-left' onPressLeadingIcon={() => props.navigation.goBack()} />}
      transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.row}>
          <Text style={styles.whiteText}>{cart.itemCount ?? 0} Item(s)</Text>
          <HighlightedText onPress={() => onPressClearAll()} text={'Clear All'} />
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0, marginBottom: height(2) }} />
        {screenLoading ?
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={AppColors.primaryGold} />
          </View>
          : <FlatList
            contentContainerStyle={{ height: height(68) }}
            data={cart.cartItems ?? []}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            ItemSeparatorComponent={() => <HorizontalLine lineColor={styles.dash} />}
          />}
        <View style={styles.row}>
          <Text style={styles.whiteText}>Total Amount:</Text>
          <Text style={styles.whiteText}>${cart.total ?? 0}</Text>
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0 }} />
        <Button
          isLoading={checkOutLoading}
          title='Checkout'
          onPress={onCheckoutPress}
          containerStyle={{ width: width(90) }}
          gradientContainerStyle={{ borderRadius: width(3), paddingVertical: height(1.5) }} />
      </View>
    </ScreenWrapper>
  );
};