import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View, Image } from 'react-native';
import { height, width } from 'react-native-dimension';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import PostReview from '../../components/PostReview';
import ReviewCard from '../../components/ReviewCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getReviewsBarber, postBarberReview } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import Entypo from 'react-native-vector-icons/Entypo'
import CameraModel from '../../components/CameraModal';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import styles from './styles';
import { useSelector } from 'react-redux';
export default function Reviews(props) {
  const { barberId } = props?.route?.params
  const user = useSelector(state => state.Auth.user)
  const [barberReviews, setBarberReviews] = useState([]);
  const [cameraModal, setCameraModal] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewErr, setReviewErr] = useState('');
  const [starCount, setStarCount] = useState('');
  const [reviewImg, setReviewImg] = useState('');
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const reviews = await getReviewsBarber(barberId)
      setBarberReviews(reviews)
    } catch (error) {
      console.log(error.message)
    }
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
  const postRating = async () => {
    // const snapshot = await firestore()
    //   .collection('Users')
    //   .doc(barberId)
    //   .collection('Reviews')
    //   .where('reviewerId', '==', auth().currentUser.uid)
    //   .get();
    // if (snapshot.size > 0) {
    //   alert('You have already left a review on this product.');
    //   setReviewText('');
    //   setStarCount(3);
    //   setReviewImg(null);
    //   return;
    // }
    if (reviewText == '') {
      setReviewErr('Please enter review text.');
      return;
    }
    setReviewErr('');
    if (!reviewImg) {
      alert('Please select review image.');
      return;
    }
    try {
      setPostLoading(true);
      await postBarberReview(
        reviewText,
        starCount,
        user?.FirstName + ' ' + user?.LastName,
        auth().currentUser.uid,
        reviewImg,
        barberId,
      );
      setPostLoading(false);
      loadData()
      setReviewText('');
      setStarCount(3);
      setReviewImg(null);
    } catch (error) {
      console.log(error.message);
      setPostLoading(false);
    }
  }
  const renderReview = ({ item }) =>
    <ReviewCard
      containerstyle={{ marginHorizontal: width(2), marginBottom: height(3) }}
      ReviewerName={item.reviewerName}
      ratings={item?.rating}
      Review={item?.description}
      reviewerImage={{ uri: item.image }}
    />
  const renderHeader = () =>
    <>
      {reviewImg ? (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.cameraBgImg}
          onPress={() => setCameraModal(true)}>
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
    </>
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Reviews'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}>
      <View style={styles.mainViewContainer}>
        <HorizontalLine />
        <FlatList
          contentContainerStyle={styles.flatlist}
          data={barberReviews}
          keyExtractor={item => item.id}
          renderItem={renderReview}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={styles.headerContainer}
        />
      </View>
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
};
