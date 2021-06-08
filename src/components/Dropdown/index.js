import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
const Component = ({ showLabel, dropdownLabel, defaultValue, options, onselect, LabelValue, disabled, selected, setSelected }) => {
    const renderRow = (item) =>
        <View style={styles.dropDownRow}>
            <Text style={styles.textColor}>{item}</Text>
        </View>
    return (
        <View style={styles.dropdownView}>
            {showLabel && <Text style={styles.dropdownLabelText}>{dropdownLabel}</Text>}
            <ModalDropdown style={styles.dropdownField}
                textStyle={styles.dropdownText}
                dropdownStyle={styles.dropdownStyle}
                options={options}
                onSelect={(value) => setSelected(options[value])}
                renderRow={renderRow}
                disabled={disabled}
            >
                <View style={styles.flexRow}>
                    <Text style={styles.text}>{selected}</Text>
                    <Icon style={styles.dropdownIcon} name="angle-down" />
                </View>
            </ModalDropdown>
        </View >
    );
};
export default Component;
