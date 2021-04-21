import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../utills/AppColors'

const Button = ({
  title,
  onPress,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <LinearGradient colors={Colors.gradientColor}
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
