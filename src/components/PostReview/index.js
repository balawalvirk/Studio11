import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import AppColors from '../../utills/AppColors'
import { height, width } from 'react-native-dimension';
import InputField from '../InputField';
import Button from '../Button';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostReview = ({
  onPress, containerStyle = {}, label
}) => {
  return (
    <View style={[styles.reviewSection, containerStyle]}>
      <View style={styles.reviewRow}>
        <InputField label={label}
          labelStyle={styles.labelStyle}
          containerStyles={styles.inputFieldStyle}
          suffixIcon suffixIconName='camera' suffixIconstyle={{ color: AppColors.primaryGold }} />
        <Button onPress={onPress} containerStyle={styles.buttonStyle} title={'Post'} />
      </View>
      <View style={styles.ratingRow}>
        <Text style={styles.rateText}>Rate:</Text>
        <Icon name='star' style={styles.ratingIcon} />
        <Icon name='star' style={styles.ratingIcon} />
        <Icon name='star' style={styles.ratingIcon} />
        <Icon name='star' style={styles.ratingIcon} />
        <Icon name='star-o' style={styles.ratingIcon} />
      </View>
    </View>
  );

};

export default PostReview;
