import React, { useState } from 'react';
import { View, Image, FlatList, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Thumbnail from '../../components/Thumbnail';
import InputField from '../../components/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import ProductCard from '../../components/ProductCard';
export default function Shop(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const ProductList = [
    {
      id: '1',
      productTitle: 'esse corporis',
      productRating: '4.9',
      productRatingCount: '344',
      productPrice: '130',
      productImage: require('../../assets/images/shop/1.png')
    },
    {
      id: '2',
      productTitle: 'aperiam totam',
      productRating: '3.8',
      productRatingCount: '438',
      productPrice: '181',
      productImage: require('../../assets/images/shop/2.png')
    },
    {
      id: '3',
      productTitle: 'voluptas quibusdam',
      productRating: '4.7',
      productRatingCount: '133',
      productPrice: '190',
      productImage: require('../../assets/images/shop/3.png')
    },
    {
      id: '4',
      productTitle: 'itaque atque',
      productRating: '3.5',
      productRatingCount: '277',
      productPrice: '100',
      productImage: require('../../assets/images/shop/4.png')
    },
    {
      id: '5',
      productTitle: 'veritatis dignissimos',
      productRating: '5.0',
      productRatingCount: '285',
      productPrice: '111',
      productImage: require('../../assets/images/shop/5.png')
    },
    {
      id: '6',
      productTitle: 'at reprehenderit',
      productRating: '3.4',
      productRatingCount: '462',
      productPrice: '159',
      productImage: require('../../assets/images/shop/6.png')
    },
    {
      id: '7',
      productTitle: 'sed tempora',
      productRating: '3.4',
      productRatingCount: '411',
      productPrice: '152',
      productImage: require('../../assets/images/shop/7.png')
    },
    {
      id: '8',
      productTitle: 'velit sed',
      productRating: '3.5',
      productRatingCount: '252',
      productPrice: '147',
      productImage: require('../../assets/images/shop/8.png')
    },
    {
      id: '9',
      productTitle: 'blanditiis ut',
      productRating: '4.6',
      productRatingCount: '211',
      productPrice: '181',
      productImage: require('../../assets/images/shop/9.png')
    },
    {
      id: '10',
      productTitle: 'labore id',
      productRating: '3.6',
      productRatingCount: '154',
      productPrice: '175',
      productImage: require('../../assets/images/shop/10.png')
    },
  ];
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Shop'} 
      renderIconRight={() => <FontAwesome name="shopping-cart" 
        onPress={()=>props.navigation.navigate('ShoppingCart')}
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
          data={ProductList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ProductCard
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