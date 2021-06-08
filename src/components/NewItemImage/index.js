import React from 'react';
import { ImageBackground } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { width } from 'react-native-dimension';

const NewItemImage = ({
  imageAddress, onPress, activeOpacity
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <ImageBackground resizeMode='cover' imageStyle={{ borderRadius: width(5) }}
        source={imageAddress}
        style={styles.itemImage}>
        <Icon name='closecircle' style={styles.closeIcon} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default NewItemImage;
