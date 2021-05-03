import React from 'react';
import { Text, ImageBackground} from 'react-native';
import styles from './styles';
import {width, height} from 'react-native-dimension'
import { TouchableOpacity } from 'react-native-gesture-handler';
const HairStyle = ({
  cuttingImage, cuttingTitle,
  containerStyle={},onPress
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <ImageBackground source={cuttingImage} style={[styles.cuttingImage, containerStyle]}
    imageStyle={{borderRadius:width(4)}}>
      <Text style={styles.cuttingTitle}>{cuttingTitle}</Text>
  </ImageBackground>
  </TouchableOpacity>
  );
};

export default HairStyle;
