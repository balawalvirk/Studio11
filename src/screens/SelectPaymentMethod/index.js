import React, { useState } from 'react';
import { View } from 'react-native';
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
export default function SelectPaymentMethod(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [master, setmaster] = useState(false);
  const [paypal, setpaypal] = useState(false);
  const [visacard, setvisacard] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      props.navigation.navigate('Dashboard');
    }, 5000)
  }
  const renderItem = ({ item, index }) => {
    return (
      <PaymentCard
        onPress={() => setSelectedIndex(index)}
        cardTitle={item.cardTitle}
        textStyle={{ color: AppColors.white50 }}
        cardImage={item.cardImage}
        iconName={selectedIndex == index ? 'radio-btn-active' : 'radio-btn-passive'}
      />
    )
  }
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Select Payment Method'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      }>
      <View style={styles.mainViewContainer}>

        <FlatList
          ListHeaderComponent={() => <PaymentCard disabled textStyle={{ color: AppColors.white50 }}
            cardTitle={'Account Tile'}
            accountAmount={'$539'}
            cardImage={require('../../assets/images/venmo.png')}
            iconName={'radio-btn-passive'}
          />}
          data={cardsData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          ListFooterComponent={() => <PaymentCard disabled
            cardTitle={'Cash on appointment'}
            iconName={'radio-btn-passive'}
          />}
        />
        <HorizontalLine />
        <Button containerStyle={{ paddingVertical: height(2), width: '80%', borderRadius: width(4) }} title={'Proceed'} onPress={() => openModal()} />
      </View>
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}
        iconName={"checkcircle"} description={'Your appointment have been sent to the barber successfully.'} />
    </ScreenWrapper>
  );
};
