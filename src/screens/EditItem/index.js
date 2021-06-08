import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import NewItemImage from '../../components/NewItemImage';
import { ItemImageList } from '../../dummyData'
export default function EditItem(props) {
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const { item } = props.route.params;
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Edit Item'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}
      footerUnScrollable={() =>
        <View style={styles.footer}>
          <Button title='Update item in shop'
            onPress={() => props.navigation.goBack()}
            gradientContainerStyle={{ width: '100%', borderRadius: width(2.5), paddingVertical: height(2) }} />
        </View>}
      transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>

        <View style={styles.bringCenter}>
          <InputField label='Item Name' placeholder='esse corporis' defaultValue={item.ItemTitle}
            inputStyle={{ borderRadius: width(4) }} />
          <InputField label='Item Price' placeholder='$130' defaultValue={item.ItemPrice}
            inputStyle={{ borderRadius: width(4) }} />
          <HorizontalLine lineColor={{ marginTop: 0, }} />

          <View style={{}}>
            {/* <FlatList
              horizontal={true}
              contentContainerStyle={{
                paddingHorizontal: width(4)
              }}
              data={ItemImageList}
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
                return ( */}
            <NewItemImage
              imageAddress={{ uri: item.ItemImage }} onPress={() => console.log('delete item ?')} />
            {/* //   );
              // }} /> */}

          </View>
          <Button
            title='Upload more images' gradientContainerStyle={{
              width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
            }} />
          <HorizontalLine lineColor={{ marginTop: 0, }} />
          <InputField
            multiline label='Item Description'
            defaultValue={item.ItemDetails}
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.'
            inputStyle={{ borderRadius: width(4) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
};