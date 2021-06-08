import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const highlightedText = ({
    text, onPress, disabled, containerStyle
}) => {
    return (
        <TouchableOpacity style={[styles.container, containerStyle]} disabled={disabled} onPress={onPress}>
            <Text style={styles.highlightedText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default highlightedText;
