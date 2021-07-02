import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import Entypo from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
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
import { reviewList } from '../../dummyData';
import { getItemsById, postProductReview, saveData } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import { setItems } from '../../Redux/Actions/Barber';
import { setCart } from '../../Redux/Actions/Customer';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function ProductDetails(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch()
  const product = props.route.params.item;
  const cart = useSelector(state => state.Customer.cart)
  const [modalVisible, setModalVisible] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [starCount, setStarCount] = useState(3);
  const [reviewText, setReviewText] = useState('');
  const [reviewErr, setReviewErr] = useState('');
  const [reviewImg, setReviewImg] = useState(null);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    loadData()
    console.log(cart)
  }, [])
  const loadData = async () => {
    let temp = []
    const snapshot = await firestore()
      .collection('ShopItems')
      .doc(product.id)
      .collection('Reviews')
      .get()
    snapshot.forEach(doc => {
      temp.push(doc.data())
    })
    setReviews(temp)
  }
  const openCamera = () => {
    ImagePicker.openCamera({
      mediaType: 'photo',
      compressImageQuality: 0.5,
    }).then((image) => {
      setReviewImg(image.path);
      setCameraModal(false);
    });
  };
  const openPicker = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.5,
    }).then((image) => {
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
  const renderReviewCard = ({ item }) => (
    <ReviewCard
      containerstyle={{ marginHorizontal: width(2) }}
      ReviewerName={item.reviewerName}
      ratings={item.rating.toFixed(1)}
      Review={item.description}
      reviewerImage={{ uri: item.image }}
    />
  );
  const addToCart = async () => {
    if (quantity == 0) {
      alert('Quantity cannot be 0.')
      return
    }
    if (user.cart) {
      const index = user.cart.items.findIndex(item => item.id == product.id)
      if (index > -1) {
        alert('Item is already in cart.')
        return
      }
    }
    try {
      setCartLoading(true)
      let newProduct = {
        ...product,
        quantity: quantity
      }
      console.log("ITEM COUNT: ", cart)
      if (cart.itemCount == 0) {
        console.log('here==============>')
        await firestore()
          .collection('Cart')
          .doc(auth().currentUser.uid)
          .set({
            total: Number(product.price) * Number(quantity),
            itemCount: 1
          }, { merge: true })
        console.log({
          total: Number(product.price) * Number(quantity),
          itemCount: 1
        })
        await firestore()
          .collection('Cart')
          .doc(auth().currentUser.uid)
          .collection('Cart')
          .doc(product.id)
          .set(newProduct)
        dispatch(setCart({
          itemCount: 1,
          total: Number(product.price) * Number(quantity),
          cartItems: [newProduct]
        }))
      } else {
        console.log('herrre+++++++++++++++++++++++++>')
        const doc = await firestore().collection('Cart').doc(auth().currentUser.uid).collection('Cart').doc(product.id).get()
        if (doc.exists) {
          alert('Item is already in cart.')
          setCartLoading(false)
          return
        }
        await firestore()
          .collection('Cart')
          .doc(auth().currentUser.uid)
          .set({
            total: Number(cart.total) + (Number(product.price) * Number(quantity)),
            itemCount: Number(cart.itemCount) + 1
          }, { merge: true })
        await firestore()
          .collection('Cart')
          .doc(auth().currentUser.uid)
          .collection('Cart')
          .doc(product.id)
          .set(newProduct)
        dispatch(setCart({
          itemCount: cart.itemCount + 1,
          total: Number(cart.total) + (Number(product.price) * Number(quantity)),
          cartItems: [...cart.cartItems, newProduct]
        }))
      }
      setCartLoading(false)
      setModalVisible(true);
      setTimeout(() => {
        setModalVisible(false)
        props.navigation.navigate('Shop');
      }, 1500)
    } catch (error) {
      console.log(error.message)
      setCartLoading(false)
    }
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
      const newRatingObj = await postProductReview(
        reviewText,
        starCount,
        user?.FirstName + ' ' + user?.LastName,
        auth().currentUser.uid,
        reviewImg,
        product,
      );
      console.log(newRatingObj)
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
              onPress={() => {
                if (quantity < 1) {
                  alert('Please select quantity')
                  return
                }
                props.navigation.navigate('SelectPaymentMethodShop', { quantity: quantity, product: product })
              }}
            />
            <Button
              planButton
              isLoading={cartLoading}
              disabled={cartLoading}
              title="Add to cart"
              onPress={() => addToCart()}
              containerStyle={styles.addCartBtn}
              textStyle={{ color: 'white' }}
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
            imageStyle={{ width: width(45), height: width(45) }}
            itemImage={{ uri: product?.images[0]?.imageUri }}
            itemName={product?.name}
            rating={product?.rating?.toFixed(1)}
            ratingCountValue={product?.ratingCount}
            itemPrice={product?.price}
            qtyControls={false}
          />
        </View>
        <View style={styles.textRow}>
          <View>
            <Text style={styles.whiteText}>Published by:</Text>
            <Text style={{ color: AppColors.white50 }}>{product?.userName}</Text>
          </View>
          <Button
            onPress={() =>
              props.navigation.navigate('BarberProfile', {
                barberId: product?.userId,
              })
            }
            containerStyle={styles.profileBtn}
            textStyle={{ fontSize: width(3.5) }}
            title="View Barber Profile"
          />
        </View>
        <HorizontalLine lineColor={{ width: width(90), marginTop: 0 }} />
        <HorizontalLine lineColor={{ backgroundColor: AppColors.transparent }} />
        <View style={styles.descriptionText}>
          <Text style={styles.whiteText}>Product Description</Text>
          <Text style={[styles.white50, { paddingBottom: height(1.5) }]}>
            {product?.description}
          </Text>
        </View>
        <HorizontalLine lineColor={{ width: width(90) }} />
        {reviews.length > 0 &&
          <>
            <View style={[styles.textRow, { marginBottom: 0, marginVertical: height(0), marginTop: height(1) }]}>
              <Text style={styles.whiteText}>Reviews</Text>
              <HighlightedText
                text={'View all'}
                onPress={() => props.navigation.navigate('Reviews')}
              />
            </View>
            <FlatList
              horizontal={true}
              contentContainerStyle={styles.flatlistContainer}
              data={reviews}
              keyExtractor={(item) => item.id}
              renderItem={renderReviewCard}
            />
          </>}
        <View style={styles.rowFooter}>
          {reviewImg ? (
            <TouchableOpacity onPress={() => setCameraModal(true)}>
              <Image source={{ uri: reviewImg }} style={styles.reviewImg} />
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
    </ScreenWrapper >
  );
}
