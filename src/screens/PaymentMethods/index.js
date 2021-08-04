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
import { useDispatch, useSelector } from 'react-redux';
import Visa from '../../assets/images/visa.png'
import Master from '../../assets/images/master.png'
import { login } from '../../Redux/Actions/Auth'
import { removeFromArray } from '../../firebaseConfig';
// stripe.setOptions({
//   publishableKey:
//     // 'pk_live_51HYiWoGxhZbaAkXb0kJiKlkejB1zK4WuuOGEienBOl229r4J1z86dovXAaFC5XhZaFL0PsBDzgRJBboNvLn3yVhn00sbh5W9Kv',
//     'pk_test_51JKKvPKlzfvLSqIKSk3aHs5GyGrJtOs4aFr9qLg4xdTP7pMH319w3B5AXwuKSPQDoLMlV9TiUBJqacDG6uOQYKBd00RWJLuaTV',
// });
export default function PaymentMethods(props) {
  const user = useSelector(state => state.Auth.user)
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const dispatch = useDispatch()
  const removeCard = async () => {
    if (!selectedCard) {
      alert('Something went wrong!')
      return
    }
    const updatedCards = user?.card.filter(item => item.id != selectedCard?.card?.id)
    console.log(updatedCards)
    dispatch(login({
      ...user,
      card: updatedCards
    }))
    await removeFromArray('Users', user?.id, 'card', selectedCard?.index)
    setModalVisible(false)
    setTimeout(() => alert('Card deleted successfully'), 1000)
  }
  const renderBankCard = ({ item, index }) =>
    <BankCard
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
          data={user?.card ?? []}
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
        firstButtonTitle={'Yes'}
        secondButtonTitle={'Cancel'}
        onpressFirstButton={removeCard}
        onpressSecondButton={() => setModalVisible(false)}
        iconName={"closecircle"}
        description={'Do you really want to remove this payment method?'} />
    </ScreenWrapper>
  );
};
