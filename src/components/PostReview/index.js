import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import AppColors from '../../utills/AppColors';
import {height, width} from 'react-native-dimension';
import InputField from '../InputField';
import Button from '../Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';

const PostReview = ({
  onPress,
  containerStyle = {},
  label,
  starCount = 3,
  onRatingPress = () => {},
  onPostPress = () => {},
  reviewText,
  setReviewText,
  postLoading,
  reviewErr,
}) => {
  return (
    <View style={[styles.reviewSection, containerStyle]}>
      <View style={styles.reviewRow}>
        <InputField
          label={label}
          fielderror={reviewErr}
          labelStyle={styles.labelStyle}
          value={reviewText}
          onChangeText={(text) => setReviewText(text)}
          containerStyles={styles.inputFieldStyle}
          suffixIcon
          suffixIconName="camera"
          suffixIconstyle={{color: AppColors.primaryGold}}
        />
        <Button
          isLoading={postLoading}
          onPress={onPress}
          containerStyle={styles.buttonStyle}
          title={'Post'}
          onPress={onPostPress}
        />
      </View>
      <StarRating
        fullStarColor={AppColors.yellow}
        disabled={false}
        maxStars={5}
        rating={starCount}
        selectedStar={(rating) => onRatingPress(rating)}
        containerStyle={styles.ratingContainer}
      />
    </View>
  );
};

export default PostReview;
