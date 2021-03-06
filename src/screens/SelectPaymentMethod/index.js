import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomModal from '../../components/customModal';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { height, width } from 'react-native-dimension';
import PaymentCard from '../../components/PaymentCard';
import { FlatList } from 'react-native-gesture-handler';
import { cardsData } from '../../dummyData';
import { useDispatch, useSelector } from 'react-redux';
import BankCard from '../../components/BankCard';
import Visa from '../../assets/images/visa.png'
import Master from '../../assets/images/master.png'
import { charge, sendOrderPlacementNotification, transfer } from '../../utills/Api';
import { checkout, clearCart, getData, saveData } from '../../firebaseConfig';
import { setCart } from '../../Redux/Actions/Customer';
import messaging from '@react-native-firebase/messaging'
export default function SelectPaymentMethod(props) {
  const { orderType, total, orders } = props.route.params
  const user = useSelector(state => state.Auth.user)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false);
  const [master, setmaster] = useState(false);
  const [paypal, setpaypal] = useState(false);
  const [visacard, setvisacard] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setLoading] = useState(false);
  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      props.navigation.navigate('Dashboard');
    }, 5000)
  }
  const renderItem = ({ item, index }) =>
    <PaymentCard
      onPress={() => setSelectedIndex(index)}
      cardTitle={item.cardTitle}
      textStyle={{ color: AppColors.white50 }}
      cardImage={item.cardImage}
      iconName={selectedIndex == index ? 'radio-btn-active' : 'radio-btn-passive'}
    />
  const getUserCards = () => {
    if (user?.card?.length > 0) {
      let temp = []
      user?.card?.map(item => {
        temp.push({
          ...item,
          selected: false
        })
      })
      return temp
    } else {
      return []
    }
  }
  const onProceed = async () => {
    if (selectedIndex != -1) {
      setLoading(true)
      try {
        if (orderType == 'CART') {
          console.log("CART")
          const body = {
            amount: Number(total).toFixed(2) * 100,
            currency: "usd",
            token: user?.card[selectedIndex]?.id,
            customer: user?.card[selectedIndex]?.customer
          }
          const res = await charge(body?.amount, body?.token, body?.customer)
          if (res) {
            await makeOrders()
            props.navigation.navigate('TrackOrder')
          } else {
            alert('Something went wrong.')
          }
          setLoading(false)
        } else {
          console.log("DIRECT")
          try {
            const body = {
              amount: Number(total).toFixed(2) * 100,
              currency: "usd",
              token: user?.card[selectedIndex]?.id,
              customer: user?.card[selectedIndex]?.customer
            }
            const res = await charge(body?.amount, body?.token, body?.customer)

            if (res) {
              await makeOrder(orders)
            } else {
              alert('Something went wrong.')
            }
            props.navigation.navigate('TrackOrder')
          } catch (error) {
            console.log(error)
          }
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.log(error.message)
      }
    } else {
      alert('Please select a card')
    }
  }
  const makeOrder = async (orderObj) => {
    try {
      const barber = await getData('Users', orderObj.barberId)
      let transferRes = await transfer(
        Number(orderObj.total).toFixed(2),
        barber?.expressAccount,
        orderObj.barberId)
      if (transferRes) {
        await saveData('Orders', orderObj?.id, orderObj)
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }
  const makeOrders = async () => {
    for (let i = 0; i < orders.length; i++) {
      let transferRes
      const barber = await getData('Users', orders[i].barberId)
      try {
        transferRes = await transfer(
          Number(orders[i].total).toFixed(2),
          barber?.expressAccount,
          orders[i].barberId)
      } catch (error) {
        console.log(error.message, "===>")
      }
      if (transferRes) {
        const title = `An order has been placed.`
        const body = `id: ${orders[i]?.id}`
        await sendOrderPlacementNotification(orders[i]?.barberId, title, body)
        await checkout(orders[i])
        return true
      } else {
        return false
      }
    }
    await clearCart()
    dispatch(setCart({
      cartItems: [],
      itemCount: 0,
      total: 0
    }))

  }
  const renderBankCard = ({ item, index }) =>
    <BankCard
      selectable
      containerStyle={{
        justifyContent: 'space-evenly',
      }}
      selectedIndex={selectedIndex}
      onCheckPress={() => setSelectedIndex(index)}
      index={index}
      cardTitle={item?.brand + ' - ' + item?.last4}
      cardImage={item?.brand == 'Visa' ? Visa : Master}
      onPressDelete={() => {
        setSelectedCard({ card: item, index })
        setModalVisible(true)
      }}
      cardOnPress={() => console.log('card Selected')} />
  const renderEmpty = () =>
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No cards added</Text>
    </View>
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() =>
        <Header
          headerTitle={'Select Payment Method'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} />
      }>
      <View style={styles.mainViewContainer}>
        <FlatList
          data={getUserCards()}
          renderItem={renderBankCard}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmpty}
        />
        <HorizontalLine />
        <Button
          isLoading={isLoading}
          containerStyle={styles.proceedBtn}
          inputStyle={{ height: 'auto' }}
          title={'Proceed'}
          onPress={onProceed} />
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconName={"checkcircle"}
        description={'Your appointment have been sent to the barber successfully.'} />
    </ScreenWrapper>
  );
};
