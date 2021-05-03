import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import AppColors from '../../utills/AppColors'
import { height, width } from 'react-native-dimension';
import InputField from '../InputField';
import Button from '../Button';

const PostReview = ({
  onPress, containerStyle={}
}) => {
  return (
    <View style={[styles.reviewRow,containerStyle]}>
      <InputField label={'Write a review:'}
        labelStyle={styles.labelStyle}
        containerStyles={styles.inputFieldStyle} />
      <Button onPress={onPress} containerStyle={styles.buttonStyle} title={'Post'} />
    </View>
  );

};

export default PostReview;
