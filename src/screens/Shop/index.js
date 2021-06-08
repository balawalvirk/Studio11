import React, { useState } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InputField from '../../components/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import ProductCard from '../../components/ProductCard';
import { manageProductList } from '../../dummyData';
export default function Shop(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Shop'}
        renderIconRight={() => <FontAwesome name="shopping-cart"
          onPress={() => props.navigation.navigate('ShoppingCart')}
          style={{ fontSize: width(5), color: AppColors.primaryGold }}
        />} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.searchView}>
          <InputField searchIcon inputStyle={{ borderRadius: width(3) }}
            searchIconstyle={{ color: AppColors.primaryGold, fontSize: width(6) }}
            placeholder={'Search'} containerStyles={{ width: '80%' }} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.filterButton}
              source={require('../../assets/images/filter.png')} />
          </TouchableOpacity>
        </View>
        <FlatList numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingVertical: height(2)
          }}
          data={manageProductList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ProductCard
                onPressProduct={() => props.navigation.navigate('ProductDetails')}
                productImage={item.productImage}
                productTitle={item.productTitle}
                productRating={item.productRating}
                productRatingCount={item.productRatingCount}
                productPrice={item.productPrice}
              />
            );
          }}
        />
      </View>
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView} >
          <Text style={styles.modalTitle}>Filter by Price</Text>

          <View style={styles.inputRow}>
            <InputField
              containerStyles={{ width: '48%' }}
              label={'Minimum'}
              placeholder={'$90'} />
            <InputField
              containerStyles={{ width: '48%' }}
              label={'Maximum'}
              placeholder={'$120'} />
          </View>

          <HorizontalLine lineColor={{ backgroundColor: AppColors.white09, marginTop: 0, marginVertical: height(2), width: width(60) }} />
          <Text style={styles.modalTitle}>Sort</Text>
          <View style={styles.inputRow}>
            <InputField
              containerStyles={{ width: '48%' }}
              label={'Price'}
              placeholder={'High - Low'} />
            <InputField
              containerStyles={{ width: '48%' }}
              label={'Name'}
              placeholder={'A - Z'} />
          </View>
          <HorizontalLine lineColor={{ backgroundColor: AppColors.white09, marginTop: 0, marginVertical: height(2), width: width(60) }} />
          <HighlightedText text={'Clear All'} />
          <HorizontalLine lineColor={{ backgroundColor: AppColors.white09, marginTop: height(2), marginVertical: height(2), width: width(60) }} />
          <View style={styles.buttonRow}>
            <Button title={'Apply'} onPress={() => setModalVisible(false)} />
            <Button planButton textStyle={{ color: AppColors.white }}
              containerStyle={{
                backgroundColor: AppColors.transparent,
                borderColor: AppColors.primaryGold, borderWidth: width(0.15)
              }}
              title={'Cancel'} onPress={() => setModalVisible(false)} />
          </View>

        </View>
      </Modal>
    </ScreenWrapper>
  );
};