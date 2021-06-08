import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { width } from 'react-native-dimension'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image';
const HairStyle = ({
  cuttingImage, cuttingTitle,
  containerStyle = {}, onPress, iconName, checkicon, activeOpacity
}) => {
  return (
    <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress} style={[styles.imageSection, containerStyle]}>
      <Image
        style={[styles.image, containerStyle]} source={cuttingImage}
      />
      <View style={styles.imageContent}>
        {checkicon ? <Icon name={iconName} style={styles.checkIcon} /> : <View></View>}
        <Text style={styles.cuttingTitle}>{cuttingTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default HairStyle;
