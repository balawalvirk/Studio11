import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import ProductCard from '../../components/ProductCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function ManageShopItems(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const barberItems = useSelector((state) => state.Barber.barberItems);
  const [searchedItems, setSearchedItems] = useState([])
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')
  // let priceFiltered = barberItems.filter(item => item.price > min && item.price < max)
  // console.log(priceFiltered)
  // useEffect(() => {
  //   console.log(min, max)
  //   if (min != 0 && max != 0) {
  //     console.log('both')
  //   } else if (min != 0) {
  //     console.log('min')
  //   } else if (max != 0) {
  //     console.log('max')
  //   }
  // }, [])
  const search = (val) => {
    let items = [...barberItems]
    // if (min != 0 && max != 0) {
    //   console.log('both')
    //   items = items.filter(item => item.price > min && item.price < max)
    // } else if (min != 0) {
    //   console.log('min')
    //   items = items.filter(item => item.price > min)
    // } else if (max != 0) {
    //   console.log('max')
    //   items = items.filter(item => item.price < max)
    // }
    const newData = items.filter(item => {
      const itemData = `${item.name.toUpperCase()} ${item.name.toUpperCase()} ${item.name.toUpperCase()} `;
      const textData = val.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setSearchedItems(newData)
  }
  const renderItem = ({ item, index }) =>
    <ProductCard
      editable
      onPressProduct={() => console.log(min, max)}//props.navigation.navigate('EditItem', { item, index })
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
          onPress={() => props.navigation.navigate('PublishNewItem')}
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
            onChangeText={text => search(text)}
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
          data={searchedItems.length > 0 ? searchedItems : barberItems}
          keyExtractor={(item) => item.Id}
          renderItem={renderItem}
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
              containerStyles={{ width: '48%' }}
              label={'Minimum'}
              placeholder={'$90'}
              labelStyle={styles.labelStyle}
              keyboardType={'number-pad'}
              value={min}
              onChangeText={text => {
                setMin(Number(text))
              }}
            />
            <InputField
              containerStyles={{ width: '48%' }}
              label={'Maximum'}
              placeholder={'$120'}
              labelStyle={styles.labelStyle}
              keyboardType={'number-pad'}
              value={max}
              onChangeText={text => {
                setMax(Number(text))
              }}
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
          <View style={styles.inputRow}>
            <InputField
              containerStyles={{ width: '48%' }}
              label={'Price'}
              placeholder={'High - Low'}
              labelStyle={styles.labelStyle}
            />
            <InputField
              labelStyle={styles.labelStyle}
              containerStyles={{ width: '48%' }}
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
            <Button
              onPress={() => console.log(min, max)}
              containerStyle={{ width: width(25) }}
              title={'Apply'}
            />
            <Button
              planButton
              textStyle={{ color: AppColors.white }}
              containerStyle={styles.cancelBtn}
              title={'Cancel'}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}
