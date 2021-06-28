import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Button from '../../components/Button';
import HairStyle from '../../components/HairStyle';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import PostReview from '../../components/PostReview';
import ReviewCard from '../../components/ReviewCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import Thumbnail from '../../components/Thumbnail';
import { getCuttingsById, getData, getReviewsBarber, getVideosById, postBarberReview, setChatRoom } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo'
import CameraModel from '../../components/CameraModal';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { useSelector } from 'react-redux';
import { reviewList } from '../../dummyData';
import database from '@react-native-firebase/database'
export default function BarberProfile(props) {
  const barberId = props.route.params.barberId;
  const user = useSelector(state => state.Auth.user)

  const [barberDetails, setBaberDetails] = useState({});
  const [cuttings, setCuttings] = useState([]);
  const [videos, setVideos] = useState([]);
  const [barberReviews, setBarberReviews] = useState([]);
  const [cameraModal, setCameraModal] = useState(false);
  const [postLoading, setPostLoading] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewErr, setReviewErr] = useState('');
  const [starCount, setStarCount] = useState('');
  const [reviewImg, setReviewImg] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    getBarberProfile()
    getBarberCuttings()
    getBarberVideos()
    getBarberReviews()
  }, []);
  const createRoom = async () => {
    const roomObj = {
      roomId: user.id + '_' + barberDetails.id,
      barberId: barberDetails.id,
      barberDetails,
      customerId: user.id,
      customerDetails: user,
      lastMessage: '',
      barberAvatar: barberDetails?.Image?.imageUrl ? barberDetails.Image.imageUrl : '',
      customerAvatar: '',
      lastUpdated: database.ServerValue.TIMESTAMP
    }
    try {
      await setChatRoom(roomObj)
      return roomObj
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }
  const getBarberReviews = async () => {
    try {
      const reviews = await getReviewsBarber(barberId)
      setBarberReviews(reviews)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getBarberProfile = async () => {
    try {
      const info = await getData('Users', barberId);
      setBaberDetails(info);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getBarberCuttings = async () => {
    try {
      const cuttingsArr = await getCuttingsById(barberId);
      setCuttings(cuttingsArr);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getBarberVideos = async () => {
    try {
      const videos = await getVideosById(barberId);
      setVideos(videos);
    } catch (error) {
      console.log(error.message);
    }
  };
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
    const snapshot = await firestore()
      .collection('Users')
      .doc(barberId)
      .collection('Reviews')
      .where('reviewerId', '==', auth().currentUser.uid)
      .get();
    if (snapshot.size > 0) {
      alert('You have already left a review on this product.');
      setReviewText('');
      setStarCount(3);
      setReviewImg(null);
      return;
    }
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
      setReviewText('');
      setStarCount(3);
      setReviewImg(null);
    } catch (error) {
      console.log(error.message);
      setPostLoading(false);
    }

  }
  const onMessagePress = async () => {
    try {
      setLoading(true)
      const roomObj = await createRoom()
      setLoading(false)
      props.navigation.navigate('Chat', { roomId: roomObj.roomId })
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }
  const renderReview = ({ item }) => (
    <ReviewCard
      containerstyle={{ marginHorizontal: width(2), marginBottom: height(3) }}
      ReviewerName={item.reviewerName}
      ratings={item?.rating}
      Review={item?.description}
      reviewerImage={{ uri: item.image }}
    />
  );
  const renderCuttings = ({ item }) => (
    <HairStyle
      disabled={true}
      containerStyle={styles.hairContainer}
      cuttingImage={{ uri: item?.CuttingImage }}
      cuttingTitle={item?.CuttingTitle}
    />
  );
  const renderVideo = ({ item }) => (
    <Thumbnail
      thumbnailImage={{ uri: item?.videoThumb }}
      onPress={() => props.navigation.navigate('VideoPlay', { videoInfo: item, barberDetails: barberDetails })}
      videoTitle={item?.VideoTitle}
      views={item?.views ?? 0}
      cardstyle={{ width: width(90) }}
      containerStyle={{ marginVertical: width(2) }}
    />
  );

  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Barber Profile'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.ProfileDetail}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.stylerTitle}>
                {barberDetails?.FirstName} {barberDetails?.LastName}
              </Text>
              <Text style={styles.white50}>
                {barberDetails?.HairCutCount} Haircuts
              </Text>
              <View style={styles.stylerRating}>
                <Icon style={styles.ratingIcon} name="star" />
                <Text style={styles.ratingText}>
                  {barberDetails?.Rating?.toFixed(1)}
                </Text>
                <Text style={styles.ratingText}>
                  ({barberDetails?.RatingCount} reviews)
                </Text>
              </View>
            </View>
            <Text style={styles.white50}>$83</Text>
          </View>
          <Image
            style={styles.imageSection}
            source={{ uri: barberDetails?.Image?.imageUrl }}
          />
        </View>
        <View style={styles.textRow}>
          <Button
            containerStyle={styles.btnStyle}
            textStyle={{ fontSize: width(3) }}
            onPress={() => props.navigation.navigate('GetAppointment', { hairStyles: cuttings, barberDetails })}
            title={'Get an appointment'}
          />
          <Button
            planButton
            isLoading={isLoading}
            containerStyle={styles.btnMessage}
            textStyle={{ color: AppColors.white }}
            onPress={() => onMessagePress()}
            planButton
            textStyle={{ fontSize: width(3), color: AppColors.white }}
            title={'Message'}
          />
        </View>
        <HorizontalLine />
        {cuttings.length > 0 &&
          <>
            <View style={styles.textRow}>
              <Text style={styles.whiteText}>Hair Styles</Text>
              <HighlightedText
                text={'View all'}
                onPress={() => props.navigation.navigate('HairStyles')}
              />
            </View>
            <FlatList
              contentContainerStyle={styles.hairList}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={cuttings}
              keyExtractor={(item) => item.id}
              renderItem={renderCuttings}
            />
          </>}
        <View style={styles.dash} />
        {videos.length > 0 &&
          <>
            <View style={styles.textRow}>
              <Text style={styles.whiteText}>Video Uploads</Text>
              <HighlightedText
                text={'View all'}
                onPress={() => props.navigation.navigate('VideoUploads')}
              />
            </View>
            <FlatList
              horizontal={true}
              contentContainerStyle={{ paddingLeft: width(4) }}
              data={videos}
              keyExtractor={(item) => item.Id}
              renderItem={renderVideo}
              showsHorizontalScrollIndicator={false}
            />
          </>}
        {barberReviews.length > 0 &&
          <>
            <View style={styles.textRow}>
              <Text style={styles.whiteText}>Reviews</Text>
              <HighlightedText
                text={'View all'}
                onPress={() => props.navigation.navigate('Reviews', { barberId: barberId })}
              />
            </View>
            <FlatList
              horizontal={true}
              contentContainerStyle={{ paddingHorizontal: width(4), }}
              data={barberReviews}
              keyExtractor={(item) => item.id}
              renderItem={renderReview}
              showsHorizontalScrollIndicator={false}
            />
          </>}
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
}
