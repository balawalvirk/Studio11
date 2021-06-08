import React, { useState } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import { manageProductList } from '../../dummyData'
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import ProductCard from '../../components/ProductCard';
export default function ManageShopItems(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user)
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Manage Shop Items'}
        leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()}
      />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <Button title='Add a item in shop'
          onPress={() => props.navigation.navigate('PublishNewItem')}
          gradientContainerStyle={{ width: width(90), borderRadius: width(2.5), paddingVertical: height(2) }} />
        <HorizontalLine lineColor={{ width: width(90), marginBottom: height(2) }} />
        <Text style={styles.white50}>
          Please select the shop item you want to manage.
        </Text>
        <View style={styles.searchView}>
          <InputField searchIcon inputStyle={{ borderRadius: width(3) }}
            labelStyle={{ marginTop: 0 }}
            searchIconstyle={{ color: AppColors.primaryGold, fontSize: width(6) }}
            placeholder={'Search'} containerStyles={{ width: '80%' }} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.filterButton}
              source={require('../../assets/images/filter.png')} />
          </TouchableOpacity>
        </View>
        <FlatList numColumns={2}
          columnWrapperStyle={{
            width: width(90),
            justifyContent: 'space-between',
            paddingVertical: height(2)
          }}
          data={user?.Items ?? []}
          keyExtractor={item => item.Id}
          renderItem={({ item }) => {
            return (
              <ProductCard
                editable
                onPressProduct={() => props.navigation.navigate('EditItem', { item })}
                productImage={{ uri: item.ItemImage }}
                productTitle={item.ItemTitle}
                productRating={'4.5'}
                productRatingCount={'345'}
                productPrice={item.ItemPrice}
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