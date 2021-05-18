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
  planButton, gradientContainerStyle
}) => {
  return (
    planButton ?
   <TouchableOpacity  style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={activeOpacity}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
    : 

    <TouchableOpacity style={[styles.container, containerStyle]}
      onPress={onPress}
      activeOpacity={activeOpacity}>
    <LinearGradient style={[styles.gradientContainer,gradientContainerStyle]} colors={AppColors.gradientColor}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </LinearGradient> 
    </TouchableOpacity>
  );
};

export default Button;
