import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getAllOfCollection } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import { AlphaSortTypes, SortTypes } from '../../utills/Enums';
import styles from './styles';
export default function Shop(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [shopItems, setShopItems] = useState([]);
  const [searchedItems, setSearchedItems] = useState([])
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(SortTypes.LOW_TO_HIGH)
  const [selectedAlpha, setSelectedAlpha] = useState('A - Z')
  const priceSort = [SortTypes.LOW_TO_HIGH, SortTypes.HIGH_TO_LOW]
  const alphaSort = [AlphaSortTypes.A_Z, AlphaSortTypes.Z_A]
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
  const search = (val = null) => {
    let items = [...shopItems]
    if (min != 0 && max != 0) {
      console.log('both')
      items = items.filter(item => item.price >= min && item.price <= max)
    } else if (min != 0) {
      console.log('min')
      items = items.filter(item => item.price > min)
    } else if (max != 0) {
      console.log('max')
      items = items.filter(item => item.price < max)
    }
    if (val) {
      items = items.filter(item => {
        const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `;
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
    }
    if (selectedPrice == SortTypes.LOW_TO_HIGH) {
      items = items.sort((a, b) => a.price - b.price)
    }
    if (selectedPrice == SortTypes.HIGH_TO_LOW) {
      items = items.sort((a, b) => b.price - a.price)
    }
    if (selectedAlpha == AlphaSortTypes.A_Z) {
      items.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (selectedAlpha == AlphaSortTypes.Z_A) {
      items.sort((a, b) => b.name.localeCompare(a.name));
    }
    setSearchedItems(items)
  }
  const onChangeMin = text => {
    const filteredText = text.replace(/[^0-9]/g, '')
    if (filteredText == '') {
      setMin('')
      return
    }
    setMin(Number(filteredText))
  }
  const onChangeMax = text => {
    const filteredText = text.replace(/[^0-9]/g, '')
    if (filteredText == '') {
      setMax('')
      return
    }
    setMax(Number(filteredText))
  }
  const clearAllFilters = () => {
    setMin('')
    setMax('')
    search(searchText)
  }
  const renderShopItems = ({ item }) =>
    <ProductCard
      onPressProduct={() => props.navigation.navigate('ProductDetails', { item })}
      productImage={{ uri: item?.images[0]?.imageUri }}
      productTitle={item.name}
      productRating={item.rating}
      productRatingCount={item.ratingCount}
      productPrice={item.price}
    />
  const renderPriceRow = (data) =>
    <TouchableOpacity
      onPress={() => console.log(data)}
      style={styles.priceContainer}>
      <Text style={styles.rowText}>{data}</Text>
    </TouchableOpacity>
  const renderCart = () =>
    <View style={styles.icon}>
      <FontAwesome
        name="shopping-cart"
        onPress={() => props.navigation.navigate('ShoppingCart')}
        style={styles.renderedIcons}
      />
    </View>
  const renderOrderIcon = () =>
    <View style={styles.icon}>
      <Feather
        name="box"
        onPress={() => props.navigation.navigate('TrackOrder')}
        style={styles.renderedIcons}
      />
    </View>

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() =>
        <Header
          headerTitle={'Shop'}
          renderIconRight={renderCart}
          renderTrackOrder={renderOrderIcon}
        />}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.searchView}>
          <InputField
            value={searchText}
            searchIcon
            inputStyle={{ borderRadius: width(3) }}
            searchIconstyle={styles.searchIcon}
            placeholder={'Search'}
            containerStyles={{ width: width(75) }}
            onChangeText={text => {
              setSearchText(text)
              search(text)
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
          style={styles.flatlist}
          contentContainerStyle={{ alignSelf: 'center' }}
          columnWrapperStyle={styles.flatlistcolumn}
          data={searchedItems.length > 0 ? searchedItems : shopItems}
          keyExtractor={(item) => item.id}
          renderItem={renderShopItems}
          refreshing={refreshing}
          onRefresh={() => loadData()}
        />
      </View>
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        onBackdropPress={() => { }}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Filter by Price</Text>
          <View style={styles.inputRow}>
            <InputField
              containerStyles={{ width: width(32), }}
              inputStyle={{ height: 'auto' }}
              label={'Minimum'}
              placeholder={'$90'}
              labelStyle={styles.labelStyle}
              keyboardType={'number-pad'}
              value={min + ''}
              onChangeText={text => onChangeMin(text)}
            />
            <InputField
              containerStyles={{ width: width(32) }}
              inputStyle={{ height: 'auto' }}
              label={'Maximum'}
              placeholder={'$120'}
              labelStyle={styles.labelStyle}
              keyboardType={'number-pad'}
              value={max + ''}
              onChangeText={text => onChangeMax(text)}
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
          <Text style={styles.modalTitle}>Sort</Text>
          <View style={[styles.inputRow, { width: width(70) }]}>
            <ModalDropdown
              renderRow={renderPriceRow}
              onSelect={(value) => setSelectedPrice(priceSort[value])}
              dropdownStyle={styles.dropDown}
              options={priceSort}>
              <>
                <Text style={styles.label}>Price</Text>
                <View style={styles.dropContainer}>
                  <Text style={styles.selectedText}>{selectedPrice}</Text>
                  <Entypo
                    name={'chevron-down'}
                    size={width(4)}
                    color={AppColors.primaryGold}
                  />
                </View>
              </>
            </ModalDropdown>
            <ModalDropdown
              renderRow={renderPriceRow}
              onSelect={(value) => setSelectedAlpha(alphaSort[value])}
              dropdownStyle={styles.dropDown}
              options={alphaSort}>
              <>
                <Text style={styles.label}>Name</Text>
                <View style={styles.dropContainer}>
                  <Text style={styles.selectedText}>{selectedAlpha}</Text>
                  <Entypo
                    name={'chevron-down'}
                    size={width(4)}
                    color={AppColors.primaryGold}
                  />
                </View>
              </>
            </ModalDropdown>
          </View>
          <HorizontalLine
            lineColor={{
              backgroundColor: AppColors.white09,
              marginTop: 0,
              marginVertical: height(2),
              width: width(60),
            }}
          />

          <HighlightedText onPress={() => clearAllFilters()} text={'Clear All'} />
          <HorizontalLine
            lineColor={{
              backgroundColor: AppColors.white09,
              marginTop: height(2),
              marginVertical: height(2),
              width: width(60),
            }}
          />
          <View style={styles.buttonRow}>
            <Button
              onPress={() => {
                search()
                setModalVisible(false)
              }}
              containerStyle={{ width: width(60) }}
              title={'Done'}
            />
            {/* <Button
              planButton
              textStyle={{ color: AppColors.white }}
              containerStyle={styles.cancelBtn}
              title={'Cancel'}
              onPress={() => setModalVisible(false)}
            /> */}
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
