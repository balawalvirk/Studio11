import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import styles from './Button.Styles';

const Button = ({
  title,
  onPress,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={activeOpacity}
      style={[styles.container, containerStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
