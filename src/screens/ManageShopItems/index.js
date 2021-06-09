import React, {useState} from 'react';
import {View, Image, FlatList, Text} from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import {height, width} from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
import {useDispatch, useSelector} from 'react-redux';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import {manageProductList} from '../../dummyData';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import ProductCard from '../../components/ProductCard';
export default function ManageShopItems(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const renderItem = ({item, index}) => {
    return (
      <ProductCard
        editable
        onPressProduct={() =>
          props.navigation.navigate('EditItem', {item, index})
        }
        productImage={{uri: item?.images[0]?.imageUri}}
        productTitle={item.name}
        productRating={item.rating.toFixed(1)}
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
            inputStyle={{borderRadius: width(3)}}
            labelStyle={{marginTop: 0}}
            searchIconstyle={{color: AppColors.primaryGold, fontSize: width(6)}}
            placeholder={'Search'}
            containerStyles={{width: '80%'}}
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
          data={user?.Items ?? []}
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
