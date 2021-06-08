import React, { useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import ReviewCard from '../../components/ReviewCard';
import PostReview from '../../components/PostReview';
import CartItem from '../../components/CartItem';
import CustomModal from '../../components/customModal';
import { reviewList } from '../../dummyData';
export default function ProductDetails(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      props.navigation.navigate('Shop');
    }, 5000)
  }
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()}
        headerTitle={'Product Details'} />}
      footerUnScrollable={() => <View style={styles.footerStyle}>
        <View style={styles.footerTopSection}>
          <Text style={styles.white50}>Quantity:</Text>
          <FontAwesome name='minus-circle' style={styles.countIcon} />
          <Text style={styles.white50}>1</Text>
          <FontAwesome name='plus-circle'
            style={styles.countIcon} />
        </View>
        <View style={styles.buttonRow}>
          <Button title='Buy now' containerStyle={{ width: '45%' }}
            onPress={() => props.navigation.navigate('SelectPaymentMethodShop')} />
          <Button planButton title='Add to cart' onPress={() => openModal()}
            containerStyle={{ borderColor: AppColors.primaryGold, borderWidth: 2, width: '45%' }}
            textStyle={{ color: 'white' }}
          />
        </View>
      </View>}
      transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.topSection}>
          <CartItem
            imageIcons
            imageStyle={{ width: width(45), height: width(45) }}
            itemImage={require('../../assets/images/shop/1.png')}
            itemName='esse corporis'
            rating='4.9'
            ratingCountValue='344'
            itemPrice='130'
          />
        </View>
        <View style={styles.textRow}>
          <View>
            <Text style={styles.whiteText}>Published by:</Text>
            <Text style={styles.white50}>Barber Name here</Text>
          </View>
          <Button onPress={() => props.navigation.navigate('BarberProfile')}
            containerStyle={{ width: '50%' }} title='View Barber Profile' />
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0 }} />
        <HorizontalLine lineColor={{ backgroundColor: AppColors.transparent }} />
        <View style={styles.descriptionText}>
          <Text style={styles.whiteText}>Product Description</Text>
          <Text style={styles.white50}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.
        </Text>
        </View>
        <HorizontalLine lineColor={{ width: width(90) }} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Reviews</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate('Reviews')} />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: width(4) }}
          data={reviewList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ReviewCard
                containerstyle={{ marginHorizontal: width(2) }}
                ReviewerName={item.ReviewerName}
                ratings={item.ratings}
                Review={item.Review}
                reviewerImage={item.reviewerImage}
              />
            );
          }}
        />
        <PostReview containerStyle={{ width: width(90) }} label={'Write a review:'} />
      </View>
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}
        iconName={"checkcircle"} description={'This item has been successfully added to your cart.'} />
    </ScreenWrapper>
  );
};