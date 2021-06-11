import React, {useState, useEffect} from 'react';
import {FlatList, Image, Text, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import {manageProductList} from '../../dummyData';
import {getAllOfCollection} from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function Shop(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const items = await getAllOfCollection('ShopItems');
      setShopItems(items);
    } catch (error) {
      console.log(error.message);
    }
  };
  const renderShopItems = ({item}) => {
    return (
      <ProductCard
        onPressProduct={() =>
          props.navigation.navigate('ProductDetails', {item})
        }
        productImage={{uri: item?.images[0]?.imageUri}}
        productTitle={item.name}
        productRating={item.rating}
        productRatingCount={item.ratingCount}
        productPrice={item.price}
      />
    );
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Shop'}
          renderIconRight={() => (
            <FontAwesome
              name="shopping-cart"
              onPress={() => props.navigation.navigate('ShoppingCart')}
              style={{fontSize: width(5), color: AppColors.primaryGold}}
            />
          )}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.searchView}>
          <InputField
            searchIcon
            inputStyle={{borderRadius: width(3)}}
            searchIconstyle={{color: AppColors.primaryGold, fontSize: width(6)}}
            placeholder={'Search'}
            containerStyles={{
              width: width(75),
            }}
          />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.filterButton}
              source={require('../../assets/images/filter.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.flatlistcolumn}
          data={shopItems}
          keyExtractor={(item) => item.id}
          renderItem={renderShopItems}
        />
      </View>
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Filter by Price</Text>
          <View style={styles.inputRow}>
            <InputField
              containerStyles={{width: '48%'}}
              label={'Minimum'}
              placeholder={'$90'}
            />
            <InputField
              containerStyles={{width: '48%'}}
              label={'Maximum'}
              placeholder={'$120'}
            />
          </View>
          <View style={styles.dash} />
          <Text style={styles.modalTitle}>Sort</Text>
          <View style={styles.inputRow}>
            <InputField
              containerStyles={{width: '48%'}}
              label={'Price'}
              placeholder={'High - Low'}
            />
            <InputField
              containerStyles={{width: '48%'}}
              label={'Name'}
              placeholder={'A - Z'}
            />
          </View>
          <HorizontalLine
            lineColor={{
              backgroundColor: AppColors.white09,
              marginTop: 0,
              marginVertical: height(2),
              width: width(60),
            }}
          />
          <HighlightedText text={'Clear All'} />
          <HorizontalLine
            lineColor={{
              backgroundColor: AppColors.white09,
              marginTop: height(2),
              marginVertical: height(2),
              width: width(60),
            }}
          />
          <View style={styles.buttonRow}>
            <Button title={'Apply'} onPress={() => setModalVisible(false)} />
            <Button
              planButton
              textStyle={{color: AppColors.white}}
              containerStyle={{
                backgroundColor: AppColors.transparent,
                borderColor: AppColors.primaryGold,
                borderWidth: width(0.15),
              }}
              title={'Cancel'}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
