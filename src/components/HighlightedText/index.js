import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import styles from './styles';

const highlightedText = ({
    text, onPress, disabled
}) => {
    return (
        <TouchableOpacity style={styles.container} disabled={disabled} onPress={onPress}>
            <Text style={styles.highlightedText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default highlightedText;
