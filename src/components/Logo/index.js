import React from 'react';
import { Image } from 'react-native';
import styles from './styles';

const Logo = ({imagepath}) => {
    return (
        <Image source={imagepath}
            style={styles.logo} />
    );};
export default Logo;
