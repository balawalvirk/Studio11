import React from 'react';
import { Text, ImageBackground} from 'react-native';
import styles from './styles';
import {width, height} from 'react-native-dimension'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AppColors from '../../utills/AppColors';
const HairStyle = ({
  cuttingImage, cuttingTitle,
  containerStyle={},onPress,iconName, checkicon, activeOpacity
}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress}>
   <ImageBackground source={cuttingImage} style={[styles.cuttingImage, containerStyle]}
    imageStyle={{borderRadius:width(4)}}>
       {checkicon ?  <Icon name={iconName} style={styles.checkIcon} /> : null}
    <Text style={styles.cuttingTitle}>{cuttingTitle}</Text>
  </ImageBackground>
  </TouchableOpacity>
  );
};

export default HairStyle;
