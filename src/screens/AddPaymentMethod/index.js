import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { height, width } from 'react-native-dimension';
export default function AddPaymentMethod(props) {

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() =>
        <Header headerTitle={'Add Payment Method'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />}
    >
      <View style={styles.mainViewContainer}>
        <Image style={styles.addPaymentImage} source={require('../../assets/images/addpayment.png')} />
        <HorizontalLine lineColor={{ marginBottom: height(2) }} />
        <InputField label={'Card Number'} keyboardType={'numeric'}
          placeholder={'1234 5678 9010 1112'} />
        <View style={styles.cardRow}>
          <InputField label={'Valid Till'} placeholder={'12/24'} keyboardType={'numeric'}
            containerStyles={{ width: width(35) }} />
          <InputField label={'CVC'} maxLength={3} placeholder={'678'} keyboardType={'numeric'}
            containerStyles={{ width: width(35) }} />
        </View>

        <HorizontalLine lineColor={{ marginVertical: height(2) }} />
        <Button title={'Add payment method'} onPress={() => props.navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
};
