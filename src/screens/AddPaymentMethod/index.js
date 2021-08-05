import React, { useState } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { height, width } from 'react-native-dimension';
import moment from 'moment'
import stripe from 'tipsi-stripe'
import auth from '@react-native-firebase/auth'
import { useDispatch, useSelector } from 'react-redux';
import { saveCard } from '../../utills/Api';
import { login } from '../../Redux/Actions/Auth'
stripe.setOptions({
  publishableKey:
    // 'pk_live_51HYiWoGxhZbaAkXb0kJiKlkejB1zK4WuuOGEienBOl229r4J1z86dovXAaFC5XhZaFL0PsBDzgRJBboNvLn3yVhn00sbh5W9Kv',
    'pk_test_51JKKvPKlzfvLSqIKSk3aHs5GyGrJtOs4aFr9qLg4xdTP7pMH319w3B5AXwuKSPQDoLMlV9TiUBJqacDG6uOQYKBd00RWJLuaTV',
});
export default function AddPaymentMethod(props) {
  const user = useSelector(state => state.Auth.user)
  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cvc, setCvc] = useState('')
  const [cardName, setCardName] = useState('')
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const onChangeExpiry = (cardExpiry) => {
    if (cardExpiry.indexOf('.') >= 0 || cardExpiry.length > 5) {
      return;
    }
    if (cardExpiry.length === 2 && expDate.length === 1) {
      cardExpiry += '/'
    }
    setExpDate(cardExpiry)
  }
  const onAddPress = async () => {
    const month = Number(expDate.substr(0, 2))
    const year = Number(expDate.substr(3, 4))
    const currentYear = moment().format('YY')
    if (cardName == '' || cardName.length < 4) {
      alert('Please enter valid name')
      return
    }
    if (cardNumber.split(' ').join('').length < 16) {
      alert('Enter valid card number.')
      return
    }
    if (month > 12 || month < 1) {
      alert('Enter valid month.')
      return
    }
    if (year < currentYear) {
      alert('Enter valid year.')
      return
    }
    if (cvc.length != 3) {
      alert('Enter valid cvc.')
      return
    }
    setLoading(true)
    const params = {
      number: cardNumber.split(' ').join(''),
      expMonth: month,
      expYear: year,
      cvc: cvc,
    }
    try {
      const stripeRes = await stripe.createTokenWithCard(params)
      const tokenId = stripeRes.tokenId
      const body = {
        uid: auth().currentUser.uid,
        email: user?.email,
        name: cardName,
        token: tokenId,
      }
      const res = await saveCard(body)
      console.log("RES: ", res)
      if (res.success) {
        dispatch(login({
          ...user,
          card: user?.card ? [...user?.card, res?.card] : [res?.card]
        }))
        props.navigation.goBack()
      } else {
        alert(res.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() =>
        <Header
          headerTitle={'Add Payment Method'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} />}
    >
      <View style={styles.mainViewContainer}>
        <Image style={styles.addPaymentImage} source={require('../../assets/images/addpayment.png')} />
        <HorizontalLine lineColor={{ marginBottom: height(2) }} />
        <InputField
          label={'Card Holder Name'}
          onChangeText={(val) => setCardName(val)}
          value={cardName}
          placeholder={'John Doe'} />
        <InputField
          label={'Card Number'}
          keyboardType={'numeric'}
          maxLength={19}
          onChangeText={(val) => setCardNumber(val.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
          value={cardNumber}
          placeholder={'1234 5678 9010 1112'} />
        <View style={styles.cardRow}>
          <InputField
            label={'Valid Till'}
            placeholder={'12/24'}
            value={expDate}
            onChangeText={(val) => onChangeExpiry(val)}
            keyboardType={'numeric'}
            containerStyles={{ width: width(35) }} />
          <InputField
            label={'CVC'}
            maxLength={3}
            onChangeText={val => setCvc(val)}
            value={cvc}
            placeholder={'678'}
            keyboardType={'numeric'}
            containerStyles={{ width: width(35) }} />
        </View>

        <HorizontalLine lineColor={{ marginVertical: height(2) }} />
        <Button
          isLoading={isLoading}
          title={'Add payment method'}
          onPress={onAddPress} />
      </View>
    </ScreenWrapper>
  );
};
