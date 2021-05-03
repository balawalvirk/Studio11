import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utills/AppColors'

const Button = ({
  title,
  onPress,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
  planButton
}) => {
  return (
    planButton ?
   <TouchableOpacity  style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={activeOpacity}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
    : 
    
    <LinearGradient colors={AppColors.gradientColor}
      style={[styles.container, containerStyle]} >
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;
