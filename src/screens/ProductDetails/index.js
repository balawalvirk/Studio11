import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import Button from '../../components/Button';
import CameraModel from '../../components/CameraModal';
import CartItem from '../../components/CartItem';
import CustomModal from '../../components/customModal';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import PostReview from '../../components/PostReview';
import ReviewCard from '../../components/ReviewCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import {reviewList} from '../../dummyData';
import {postProductReview} from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import firestore from '@react-native-firebase/firestore';
export default function ProductDetails(props) {
  const user = useSelector((state) => state.Auth.user);
  const product = props.route.params.item;
  const [modalVisible, setModalVisible] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [starCount, setStarCount] = useState(3);
  const [reviewText, setReviewText] = useState('');
  const [reviewErr, setReviewErr] = useState('');
  const [reviewImg, setReviewImg] = useState(null);

  const openCamera = () => {
    ImagePicker.openCamera({}).then((image) => {
      setReviewImg(image.path);
      setCameraModal(false);
    });
  };
  const openPicker = () => {
    ImagePicker.openPicker({}).then((image) => {
      setReviewImg(image.path);
      setCameraModal(false);
    });
  };
  const onMinus = () => {
    if (quantity == 0) {
      return;
    }
    setQuantity(quantity - 1);
  };
  const renderReviewCard = ({item}) => (
    <ReviewCard
      containerstyle={{marginHorizontal: width(2)}}
      ReviewerName={item.ReviewerName}
      ratings={item.ratings}
      Review={item.Review}
      reviewerImage={item.reviewerImage}
    />
  );
  const openModal = () => {
    setModalVisible(true);
    setTimeout(() => {
      props.navigation.navigate('Shop');
    }, 5000);
  };
  const postRating = async () => {
    if (reviewText == '') {
      setReviewErr('Please enter review text.');
      return;
    }
    setReviewErr('');
    if (!reviewImg) {
      alert('Please select review image.');
      return;
    }
    const snapshot = await firestore()
      .collection('ShopItems')
      .doc(product.id)
      .collection('Reviews')
      .where('reviewerId', '==', auth().currentUser.uid)
      .get();
    if (snapshot.size > 0) {
      alert('You have already left a review on this product.');
      return;
    }
    try {
      setPostLoading(true);
      await postProductReview(
        reviewText,
        starCount,
        user?.FirstName + ' ' + user?.LastName,
        auth().currentUser.uid,
        reviewImg,
        product,
      );
      setPostLoading(false);
      setReviewText('');
      setStarCount(3);
      setReviewImg(null);
    } catch (error) {
      console.log(error.message);
      setPostLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
          headerTitle={'Product Details'}
        />
      )}
      footerUnScrollable={() => (
        <View style={styles.footerStyle}>
          <View style={styles.footerTopSection}>
            <Text style={styles.white50}>Quantity:</Text>
            <TouchableOpacity onPress={onMinus}>
              <FontAwesome name="minus-circle" style={styles.countIcon} />
            </TouchableOpacity>
            <Text style={styles.white50}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <FontAwesome name="plus-circle" style={styles.countIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonRow}>
            <Button
              title="Buy now"
              containerStyle={styles.buyBtn}
              onPress={() =>
                props.navigation.navigate('SelectPaymentMethodShop')
              }
            />
            <Button
              planButton
              title="Add to cart"
              onPress={() => openModal()}
              containerStyle={styles.addCartBtn}
              textStyle={{color: 'white'}}
            />
          </View>
        </View>
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.topSection}>
          <CartItem
            imageIcons
            images={product?.images}
            imageStyle={{width: width(45), height: width(45)}}
            itemImage={{uri: product?.images[0]?.imageUri}}
            itemName={product?.name}
            rating={product?.rating}
            ratingCountValue={product?.ratingCount}
            itemPrice={product?.price}
          />
        </View>
        <View style={styles.textRow}>
          <View>
            <Text style={styles.whiteText}>Published by:</Text>
            <Text style={{color: AppColors.white50}}>{product?.userName}</Text>
          </View>
          <Button
            onPress={() =>
              props.navigation.navigate('BarberProfile', {
                barberId: product?.userId,
              })
            }
            containerStyle={styles.profileBtn}
            textStyle={{fontSize: width(3.5)}}
            title="View Barber Profile"
          />
        </View>
        <HorizontalLine lineColor={{width: width(90), marginTop: 0}} />
        <HorizontalLine lineColor={{backgroundColor: AppColors.transparent}} />
        <View style={styles.descriptionText}>
          <Text style={styles.whiteText}>Product Description</Text>
          <Text style={[styles.white50, {paddingBottom: height(1.5)}]}>
            {product?.description}
          </Text>
        </View>
        <HorizontalLine lineColor={{width: width(90)}} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Reviews</Text>
          <HighlightedText
            text={'View all'}
            onPress={() => props.navigation.navigate('Reviews')}
          />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{paddingHorizontal: width(4)}}
          data={reviewList}
          keyExtractor={(item) => item.id}
          renderItem={renderReviewCard}
        />
        <View style={styles.rowFooter}>
          {reviewImg ? (
            <TouchableOpacity onPress={() => setCameraModal(true)}>
              <Image source={{uri: reviewImg}} style={styles.reviewImg} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setCameraModal(true)}
              style={styles.cameraBg}>
              <Entypo
                name={'camera'}
                size={height(3.5)}
                color={AppColors.primaryGold}
              />
            </TouchableOpacity>
          )}
          <PostReview
            reviewErr={reviewErr}
            label={'Write a review:'}
            onRatingPress={(rating) => setStarCount(rating)}
            starCount={starCount}
            onPostPress={() => postRating()}
            reviewText={reviewText}
            setReviewText={setReviewText}
            postLoading={postLoading}
          />
        </View>
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconName={'checkcircle'}
        description={'This item has been successfully added to your cart.'}
      />
      <CameraModel
        isVisible={cameraModal}
        onClose={() => setCameraModal(false)}
        iconName={'photo-camera'}
        labelName={'Take Photo'}
        imageFromCamera={() => openCamera()}
        imageFromGallery={() => openPicker()}
      />
    </ScreenWrapper>
  );
}
