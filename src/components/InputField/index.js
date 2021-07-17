import React from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { height, width } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppColors from '../../utills/AppColors';
import styles from './styles';

const InputField = ({
  label,
  placeholder,
  secureTextEntry,
  containerStyles,
  onChangeText,
  value,
  fielderror = null,
  onBlur,
  maxLength,
  keyboardType,
  labelStyle = {},
  multiline,
  numoflines,
  searchIcon,
  searchIconstyle,
  defaultValue,
  suffixIcon,
  suffixIconName,
  suffixIconstyle,
  editable,
  onFocus,
  inputStyle,
  onPressOut,
  autoCapitalize

}) => {
  return (
    <View style={[{ width: width(80) }, containerStyles ? containerStyles : {}]}>
      {label && label != '' && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      <View style={[styles.mainInputView, inputStyle ?? {}]}>
        <TextInput
          style={[
            styles.InputField,
            {
              textAlignVertical: multiline ? 'top' : 'auto',
              paddingVertical: multiline ? height(2) : height(0.5),
            },
          ]}
          onPressOut={onPressOut}
          onFocus={onFocus}
          defaultValue={defaultValue}
          multiline={multiline}
          numberOfLines={numoflines}
          onBlur={onBlur}
          maxLength={maxLength}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={AppColors.white50}
          secureTextEntry={secureTextEntry}
          editable={editable}
          autoCapitalize={autoCapitalize}
        />

        {searchIcon ? (
          <View style={styles.iconView}>
            <Icon
              name={'search'}
              style={[styles.searchIcon, searchIconstyle]}
            />
          </View>
        ) : null}
        {suffixIcon ? (
          <View style={styles.iconView}>
            <Icon
              name={suffixIconName}
              style={[styles.searchIcon, suffixIconstyle]}
            />
          </View>
        ) : null}
      </View>
      {!searchIcon && <Text style={styles.Texterror}>{fielderror}</Text>}
    </View>
  );
};

export default InputField;
