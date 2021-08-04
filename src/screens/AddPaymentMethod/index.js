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
export default function AddPaymentMethod(props) {
  const [cardNumber, setCardNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cvc, setCvc] = useState('')
  const onChangeExpiry = (cardExpiry) => {
    if (cardExpiry.indexOf('.') >= 0 || cardExpiry.length > 5) {
      return;
    }
    if (cardExpiry.length === 2 && expDate.length === 1) {
      cardExpiry += '/'
    }
    setExpDate(cardExpiry)
  }
  const onAddPress = () => {
    const month = Number(expDate.substr(0, 2))
    const year = Number(expDate.substr(3, 4))
    const currentYear = moment().format('YY')
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
    const params = {
      cardNumber: cardNumber.split(' ').join(''),
      expMonth: month,
      expYear: year,
      cvc: cvc,
    }
    console.log(params)
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
        <Button title={'Add payment method'} onPress={onAddPress} />
      </View>
    </ScreenWrapper>
  );
};
