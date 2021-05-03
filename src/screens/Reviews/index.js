import React, { useState } from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import PostReview from '../../components/PostReview';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { height, width } from 'react-native-dimension';
import ReviewCard from '../../components/ReviewCard';
export default function Reviews(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const reviewList = [
    {
      id: '1',
      ReviewerName: 'Jared',
      ratings: '4.9',
      Review: 'Mollitia labore autem sed rem magnam labore. Excepturi cum quasi quidem illo qui quidem id. Dolorum facere natus at minus earum autem rerum. Cumque quia eum et.',
      reviewerImage: require('../../assets/images/reviewers/r1.png')
    },
    {
      id: '2',
      ReviewerName: 'Elwyn',
      ratings: '3.7',
      Review: 'Doloribus et et ea commodi. Porro blanditiis sit eaque. Et quam quod sed est magnam a et tempore.',
      reviewerImage: require('../../assets/images/reviewers/r2.png')
    },
    {
      id: '3',
      ReviewerName: 'Ivory',
      ratings: '3.5',
      Review: 'Rerum nulla tenetur veniam qui fugiat quia. Libero quos nemo dolorem omnis tempora vel. Cupiditate ut harum ratione aliquam dignissimos dolore facere.',
      reviewerImage: require('../../assets/images/reviewers/r3.png')
    },
    {
      id: '4',
      ReviewerName: 'Jared',
      ratings: '4.9',
      Review: 'Mollitia labore autem sed rem magnam labore. Excepturi cum quasi quidem illo qui quidem id. Dolorum facere natus at minus earum autem rerum. Cumque quia eum et.',
      reviewerImage: require('../../assets/images/reviewers/r1.png')
    },
    {
      id: '5',
      ReviewerName: 'Elwyn',
      ratings: '3.7',
      Review: 'Doloribus et et ea commodi. Porro blanditiis sit eaque. Et quam quod sed est magnam a et tempore.',
      reviewerImage: require('../../assets/images/reviewers/r2.png')
    },
    {
      id: '6',
      ReviewerName: 'Ivory',
      ratings: '3.5',
      Review: 'Rerum nulla tenetur veniam qui fugiat quia. Libero quos nemo dolorem omnis tempora vel. Cupiditate ut harum ratione aliquam dignissimos dolore facere.',
      reviewerImage: require('../../assets/images/reviewers/r3.png')
    },
  ];

  return (
    <ScreenWrapper  transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Reviews'} leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} /> }>

      <View style={styles.mainViewContainer}>
        <PostReview />
        <HorizontalLine />

        <FlatList showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom:height(15)}}
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
