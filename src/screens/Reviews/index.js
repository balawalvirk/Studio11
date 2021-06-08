import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import PostReview from '../../components/PostReview';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import ReviewCard from '../../components/ReviewCard';
import { reviewList } from '../../dummyData';
export default function Reviews(props) {
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Reviews'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <PostReview label={'Write a review:'} />
        <HorizontalLine />

        <FlatList showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: height(15) }}
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
      </View>
    </ScreenWrapper>
  );
};
