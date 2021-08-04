import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import CustomModal from '../../components/customModal';
import BankCard from '../../components/BankCard';
import { width } from 'react-native-dimension';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
export default function PaymentMethods(props) {
  const user = useSelector(state => state.Auth.user)
  const [modalVisible, setModalVisible] = useState(false);
  const renderBankCard = () =>
    <BankCard
      cardTitle={'Mastercard-6543'}
      cardImage={require('../../assets/images/master.png')}
      onPressDelete={() => setModalVisible(true)}
      cardOnPress={() => console.log('card Selected')} />
  const renderEmpty = () =>
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No cards added</Text>
    </View>
  return (
    <ScreenWrapper
      transclucent
      statusBarColor={AppColors.transparent}>
      <Header
        headerTitle={'Payment Methods'}
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <Text style={styles.labels}>Venmo Account</Text>
        <Button
          title={'Connect your Venmo account'}
          onPress={() => props.navigation.navigate('VenmoConnected')}
          containerStyle={{ width: width(80) }} />
        <HorizontalLine />
        <Text style={styles.labels}>Credit or Debit Cards</Text>
        <FlatList
          data={user?.cards ?? []}
          renderItem={renderBankCard}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmpty}
        />
        <Button
          title={'Add credit or debit card'}
          containerStyle={{ width: width(80) }}
          onPress={() => props.navigation.navigate('AddPaymentMethod')} />
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        buttonLine
        firstButtonTitle={'Cancel'}
        secondButtonTitle={'No'}
        onpressFirstButton={() => setModalVisible(false)}
        onpressSecondButton={() => setModalVisible(false)}
        iconName={"closecircle"}
        description={'Do you really want to remove this payment method?'} />
    </ScreenWrapper>
  );
};
