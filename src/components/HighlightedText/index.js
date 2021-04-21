import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Colors from '../../utills/AppColors'

const highlightedText = ({
    text, onPress
}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.highlightedText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default highlightedText;
