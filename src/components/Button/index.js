import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import AppColors from '../../utills/AppColors';

const Button = ({
  title,
  onPress,
  activeOpacity = 0.7,
  containerStyle = {},
  textStyle = {},
  disabled,
  planButton,
  gradientContainerStyle,
  isLoading,
}) => {
  return planButton ? (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}>
      {!isLoading ? (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      ) : (
        <ActivityIndicator size={'small'} color={AppColors.black} />
      )}
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}>
      <LinearGradient
        style={[styles.gradientContainer, containerStyle]}
        colors={AppColors.gradientColor}>
        {!isLoading ? (
          <Text style={[styles.text, textStyle]}>{title}</Text>
        ) : (
          <ActivityIndicator size={'small'} color={AppColors.black} />
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default Button;
