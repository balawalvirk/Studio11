import React from 'react';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import { Text, View } from 'react-native';
import styles from './styles';

const Header = ({ headerTitle, leadingIcon, actionIcon, onPressLeadingIcon,onPressActionIcon
}) => {
    return (
        <View style={styles.header}>
             <Icon name={leadingIcon} style={styles.leadingIcon}
                  onPress={onPressLeadingIcon}
                />
            <Text style={styles.heading}>{headerTitle}</Text>
             <Icon name={actionIcon} style={styles.leadingIcon}
                  onPress={onPressActionIcon}
                />
            </View>
    );
};
export default Header;