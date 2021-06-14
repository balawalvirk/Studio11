import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/dist/Entypo';
import HorizontalLine from '../HorizontalLine';

const ReviewCard = ({
  ReviewerName, ratings, reviewerImage, Review, containerstyle = {}
}) => {
  return (
    <View style={[styles.ReviewCard, containerstyle]}>
      <View style={styles.textSection}>
        <View style={styles.textRow}>
          <Text style={styles.ReviewerName}>{ReviewerName}</Text>
          <View style={styles.ReviewRating}>
            <Icon style={styles.ratingIcon} name="star" />
            <Text style={styles.ratingText}>{ratings}</Text>
          </View>
        </View>
        <View style={styles.dash} />
        <Text style={styles.white50}>{Review}</Text>
      </View>
      <Image style={styles.imageSection} source={reviewerImage} />
    </View>
  );
};

export default ReviewCard;
