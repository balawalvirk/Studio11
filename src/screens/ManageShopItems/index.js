import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View, TouchableOpacity } from 'react-native';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity as TouchableGesture } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import ModalDropdown from 'react-native-modal-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { AlphaSortTypes, SortTypes } from '../../utills/Enums';
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles from './styles';
import { getAccount } from '../../utills/Api';
export default function ManageShopItems(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const barberItems = useSelector((state) => state.Barber.barberItems);
  const [searchedItems, setSearchedItems] = useState([])
  const [searchText, setSearchText] = useState('');
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  const [selectedPrice, setSelectedPrice] = useState(SortTypes.LOW_TO_HIGH)
  const [selectedAlpha, setSelectedAlpha] = useState('A - Z')
  const [selectedSort, setSelectedSort] = useState(0);
  const priceSort = [SortTypes.LOW_TO_HIGH, SortTypes.HIGH_TO_LOW]
  const alphaSort = [AlphaSortTypes.A_Z, AlphaSortTypes.Z_A]
  useEffect(() => {
    console.log('fired')
    setSearchedItems(barberItems)
  }, [barberItems])
  const search = (val = null) => {
    let items = [...barberItems]
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
    if (selectedSort == 0) {
      if (selectedPrice == SortTypes.LOW_TO_HIGH) {
        items = items.sort((a, b) => a.price - b.price)
      }
      if (selectedPrice == SortTypes.HIGH_TO_LOW) {
        console.log("SORT TYPE: ", selectedPrice)
        items = items.sort((a, b) => b.price - a.price)
      }
    } else {
      if (selectedAlpha == AlphaSortTypes.A_Z) {
        items.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (selectedAlpha == AlphaSortTypes.Z_A) {
        items.sort((a, b) => b.name.localeCompare(a.name));
      }
    }
    setSearchedItems(items)
  }
  const onChangeMin = text => {
    if (text == '') {
      setMin('')
      return
    }
    setMin(Number(text))
  }
  const onChangeMax = text => {
    if (text == '') {
      setMax('')
      return
    }
    setMax(Number(text))
  }
  const clearAllFilters = () => {
    setMin('')
    setMax('')
    setModalVisible(false)
    search(searchText)
  }
  const onAddPress = async () => {
    if (user?.expressAccount) {
      const response = await getAccount(user?.expressAccount)
      console.log(response)
      props.navigation.navigate('PublishNewItem')
    } else {
      alert('Please create a stripe account before adding items.')
    }
  }
  const renderItem = ({ item, index }) => {
    return <ProductCard
      editable
      onPressProduct={() => props.navigation.navigate('EditItem', { item, index })}//
      productImage={
        item?.images?.length > 0
          ? { uri: item?.images[0]?.imageUri ?? '' }
          : require('../../assets/images/1.png')
      }
      productTitle={item.name}
      productRating={item.rating}
      productRatingCount={item.ratingCount}
      productPrice={item.price}
    />
  }
  const renderPriceRow = (data) =>
    <TouchableGesture
      onPress={() => console.log(data)}
      style={styles.priceContainer}>
      <Text style={styles.rowText}>{data}</Text>
    </TouchableGesture>
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Manage Shop Items'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <Button
          title="Add an item in shop"
          onPress={onAddPress}
          containerStyle={styles.btn}
        />
        <View style={styles.dash} />
        <Text style={styles.white50}>
          Please select the shop item you want to manage.
        </Text>
        <View style={styles.searchView}>
          <InputField
            searchIcon
            inputStyle={{ borderRadius: width(3) }}
            labelStyle={{ marginTop: 0 }}
            searchIconstyle={{ color: AppColors.primaryGold, fontSize: width(6) }}
            placeholder={'Search'}
            containerStyles={{ width: '80%' }}
            value={searchText}
            onChangeText={text => {
              setSearchText(text)
              search(text)
            }}
          />
          <TouchableOpacity
            style={styles.filterContainer}
            onPress={() => setModalVisible(true)}>
            <Image
              style={styles.filterButton}
              source={require('../../assets/images/filter.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          data={searchedItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
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
          <View style={styles.radioContainer}>
            <TouchableOpacity onPress={() => setSelectedSort(0)} activeOpacity={0.7} style={styles.flexRow}>
              <Ionicons name={selectedSort == 0 ? 'radio-button-on' : 'radio-button-off'} size={width(5)} color={AppColors.primaryGold} />
              <Text style={styles.white50}>Price</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setSelectedSort(1)} activeOpacity={0.7} style={styles.flexRow}>
              <Ionicons name={selectedSort == 1 ? 'radio-button-on' : 'radio-button-off'} size={width(5)} color={AppColors.primaryGold} />
              <Text style={styles.white50}>Name</Text>
            </TouchableOpacity>
          </View>
          <View style={[{ width: width(70), alignItems: 'center', marginVertical: height(2) }]}>
            {selectedSort == 0 ?
              <ModalDropdown
                renderRow={renderPriceRow}
                onSelect={(value) => setSelectedPrice(priceSort[value])}
                dropdownStyle={styles.dropDown}
                options={priceSort}>
                <>
                  {/* <Text style={styles.label}>Price</Text> */}
                  <View style={styles.dropContainer}>
                    <Text style={styles.selectedText}>{selectedPrice}</Text>
                    <Entypo
                      name={'chevron-down'}
                      size={width(4)}
                      color={AppColors.primaryGold}
                    />
                  </View>
                </>
              </ModalDropdown> :
              <ModalDropdown
                renderRow={renderPriceRow}
                onSelect={(value) => setSelectedAlpha(alphaSort[value])}
                dropdownStyle={styles.dropDown}
                options={alphaSort}>
                <>
                  {/* <Text style={styles.label}>Name</Text> */}
                  <View style={styles.dropContainer}>
                    <Text style={styles.selectedText}>{selectedAlpha}</Text>
                    <Entypo
                      name={'chevron-down'}
                      size={width(4)}
                      color={AppColors.primaryGold}
                    />
                  </View>
                </>
              </ModalDropdown>}
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
    </ScreenWrapper >
  );
}
