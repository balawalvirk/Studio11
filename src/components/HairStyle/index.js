import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { width } from 'react-native-dimension'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

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
        <LinearGradient
          start={{ x: 1, y: 1 }}
          end={{ x: 1, y: 0 }}
          locations={[0.1, 0.9]}
          colors={['rgba(0,0,0,0.65)', 'rgba(0,0,0,0)']} //rgba(0,0,0,0.85)
          style={styles.shadowContainerBottom}>
          <Text style={styles.cuttingTitle}>{cuttingTitle}</Text>
        </LinearGradient>
      </View>
    </TouchableOpacity >
  );
};

export default HairStyle;
