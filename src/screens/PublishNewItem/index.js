import React, { useState } from 'react';
import { View, ImageBackground, FlatList } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/AntDesign';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import CartItem from '../../components/CartItem';
import NewItemImage from '../../components/NewItemImage';
export default function PublishNewItem(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [setImages, setImagesUploaded] = useState(false);
  const ItemImageList = [
    {
      id: '1',
      imageAddress: require('../../assets/images/shop/1.png')
    },
    {
      id: '2',
      imageAddress: require('../../assets/images/shop/1.png')
    },
    {
      id: '3',
      imageAddress: require('../../assets/images/shop/1.png')
    },
    {
      id: '4',
      imageAddress: require('../../assets/images/shop/1.png')
    },
  ];
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Publish New Item'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}
      footerUnScrollable={() =>
        <View style={styles.footer}>
          <Button title='Publish New Item'
          disabled={!setImages}
          onPress={() => props.navigation.goBack()}
            gradientContainerStyle={{ width: '100%', borderRadius: width(2.5), paddingVertical: height(2) }} />
        </View>}
      transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>

        <View style={styles.bringCenter}>
          <InputField label='Item Name' placeholder='esse corporis'
            inputStyle={{ borderRadius: width(4) }} />
          <InputField label='Item Price' placeholder='$130'
            inputStyle={{ borderRadius: width(4) }} />
          <HorizontalLine lineColor={{ marginTop: 0, }} />
          {setImages ?
            <View style={{ width: '100%' }}>
              <FlatList
                horizontal={true}
                contentContainerStyle={{
                  paddingHorizontal:width(4)
                }}
                data={ItemImageList}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                  return (
                    <NewItemImage
                      imageAddress={item.imageAddress}
                      onPress={()=>console.log('delete item ?')}
                    />
                  );
                }}
              />

              <Button
                title='Upload more images' gradientContainerStyle={{
                  width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
                }} />
            </View>
            : <Button
              onPress={() => setImagesUploaded(true)}
              title='Upload images' gradientContainerStyle={{
                width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
              }} />}
          <HorizontalLine lineColor={{ marginTop: 0, }} />
          <InputField
            multiline label='Item Description'
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.'
            inputStyle={{ borderRadius: width(4) }} />
        </View>
      </View>
    </ScreenWrapper>
  );
};