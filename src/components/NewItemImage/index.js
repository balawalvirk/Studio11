import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/AntDesign';

const NewItemImage = ({
  imageAddress, onPress, activeOpacity, containerStyle,
  disabled
}) => {
  return (
    <>
      <TouchableOpacity disabled={disabled} activeOpacity={activeOpacity} style={[styles.container, containerStyle]}>
        <Image resizeMode='cover'
          source={imageAddress}
          style={styles.itemImage} />
        <TouchableOpacity onPress={onPress} style={styles.iconContainer}>
          <Icon name='closecircle' style={styles.closeIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};

export default NewItemImage;
