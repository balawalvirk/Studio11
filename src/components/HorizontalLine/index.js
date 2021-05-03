import React from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import AppColors from '../../utills/AppColors'
import { width } from 'react-native-dimension';

const HorizontalLine = ({
  HorizontalLine100, lineColor
}) => {
  return (
    <View>
      {
      HorizontalLine100 ? 
      <View style={[styles.HorizontalLine100,lineColor]}></View> : 
      <View style={[styles.HorizontalLine,lineColor]}></View>
    }
    </View>
  );

};

export default HorizontalLine;
