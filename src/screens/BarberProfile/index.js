import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
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
import { manageCuttingImages, reviewList, ThumbnailList } from '../../dummyData';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import { getCuttingsById, getData, getVideosById } from '../../firebaseConfig';
import firestore from '@react-native-firebase/firestore';
export default function BarberProfile(props) {
  const barberId = props.route.params.barberId;
  console.log(barberId)
  const [barberDetails, setBaberDetails] = useState({});
  const [cuttings, setCuttings] = useState([]);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getBarberProfile();
    getBarberCuttings();
    getBarberVideos();
  }, []);
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
  const renderReview = ({ item }) => (
    <ReviewCard
      containerstyle={{ marginHorizontal: width(2) }}
      ReviewerName={item.ReviewerName}
      ratings={item.ratings}
      Review={item.Review}
      reviewerImage={item.reviewerImage}
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
      onPress={() => props.navigation.navigate('VideoPlay')}
      videoTitle={item?.VideoTitle}
      views={item?.Views ?? 500}
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
            onPress={() => props.navigation.navigate('GetAppointment')}
            title={'Get an appointment'}
          />
          <Button
            planButton
            containerStyle={styles.btnMessage}
            textStyle={{ color: AppColors.white }}
            onPress={() => props.navigation.navigate('Chat')}
            planButton
            textStyle={{ fontSize: width(3), color: AppColors.white }}
            title={'Message'}
          />
        </View>
        <HorizontalLine />
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
        <View style={styles.dash} />
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

        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Reviews</Text>
          <HighlightedText
            text={'View all'}
            onPress={() => props.navigation.navigate('Reviews')}
          />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: width(5) }}
          data={reviewList}
          keyExtractor={(item) => item.id}
          renderItem={renderReview}
        />
        <PostReview label={'Write a review:'} />
      </View>
    </ScreenWrapper>
  );
}
