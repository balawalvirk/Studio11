import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

const Logo = ({imagepath, containerStyle}) => {
  return <Image source={imagepath} style={[styles.logo, containerStyle]} />;
};
export default Logo;
