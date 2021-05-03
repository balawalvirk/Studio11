import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const InputField = ({
    label, placeholder, secureTextEntry, containerStyles, onChangeText, value, fielderror, onBlur, maxLength, keyboardType,
    labelStyle = {}, multiline, numoflines
}) => {
    return (
        <View style={[{ width: width(80) }, containerStyles ? containerStyles : {}]}>
            <Text style={[styles.label, labelStyle]}>{label}</Text>
            <TextInput style={styles.InputField}
                multiline={multiline} numberOfLines={numoflines}
                onBlur={onBlur} maxLength={maxLength}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={AppColors.white50}
                secureTextEntry={secureTextEntry}
            />
            <Text style={styles.Texterror}>{fielderror}</Text>
        </View>
    );
};

export default InputField;
