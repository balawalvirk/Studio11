import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import HairStyle from '../../components/HairStyle';
import Icon from 'react-native-vector-icons/dist/Entypo';
import HorizontalLine from '../../components/HorizontalLine';
import Button from '../../components/Button';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import ReviewCard from '../../components/ReviewCard';
import PostReview from '../../components/PostReview';
import Thumbnail from '../../components/Thumbnail';
import { manageCuttingImages, reviewList, ThumbnailList } from '../../dummyData';
export default function BarberProfile(props) {
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Barber Profile'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.ProfileDetail}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.stylerTitle}>Dorris Ortiz</Text>
              <Text style={styles.white50}>415 Haircuts</Text>
              <View style={styles.stylerRating}>
                <Icon style={styles.ratingIcon} name="star" />
                <Text style={styles.ratingText}>4.7</Text>
                <Text style={styles.ratingText}>(367 reviews)</Text>
              </View>
            </View>
            <Text style={styles.white50}>$83</Text>
          </View>
          <Image style={styles.imageSection} source={require('../../assets/images/cuttings/1.png')} />
        </View>
        <View style={styles.textRow}>
          <Button containerStyle={{ width: '60%', margin: 0 }}
            onPress={() => props.navigation.navigate('GetAppointment')}
            title={'Get an appointment'} />
          <Button containerStyle={{ width: '35%', backgroundColor: AppColors.cardColor, margin: 0 }}
            textStyle={{ color: AppColors.white }}
            onPress={() => props.navigation.navigate('Chat')}
            planButton title={'Message'} />
        </View>
        <HorizontalLine />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Hair Styles</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate('HairStyles')} />
        </View>
        <FlatList
          contentContainerStyle={{ paddingHorizontal: width(8), }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={manageCuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle onPress={() => props.navigation.navigate('HairStylesBarber')} cuttingImage={item.image} cuttingTitle={item.title} />
            );
          }}
        />
        <HorizontalLine />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Video Uploads</Text>
          <HighlightedText text={'View all'}
            onPress={() => props.navigation.navigate('VideoUploads')}
          />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: width(8) }}
          data={ThumbnailList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <Thumbnail thumbnailImage={item.thumbnailImage}
                onPress={() => props.navigation.navigate('VideoPlay')}
                videoTitle={item.videoTitle}
                views={item.views} />
            );
          }}
        />

        <HorizontalLine />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Reviews</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate('Reviews')} />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: width(5) }}
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
        <PostReview label={'Write a review:'} />
      </View>
    </ScreenWrapper>
  );
};