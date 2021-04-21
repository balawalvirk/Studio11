import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { width } from 'react-native-dimension';
import Colors from '../../utills/AppColors';
import styles from './styles';

const InputField = ({
    label, placeholder, secureTextEntry, containerStyles, onChangeText, value, fielderror, onBlur
}) => {
    return (
        <View style={[{ width: width(80) }, containerStyles ? containerStyles : {}]}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={styles.InputField}
                onBlur={onBlur}
                onChangeText={onChangeText}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={Colors.white50}
                secureTextEntry={secureTextEntry}
            />
            <Text style={styles.Texterror}>{fielderror}</Text>
        </View>
    );
};

export default InputField;
