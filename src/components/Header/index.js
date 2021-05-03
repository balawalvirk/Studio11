import React from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import Logo from '../Logo';
import { Text, View, Image } from 'react-native';
import styles from './styles';
const Header = ({ midLogo, headerTitle, leadingIcon, actionIcon, onPressLeadingIcon, onPressActionIcon
}) => {
    return (
        <View style={styles.header}>
            <Icon name={leadingIcon} style={styles.leadingIcon}
                onPress={onPressLeadingIcon}
            />
            {midLogo ?
                 <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                :
                <Text style={styles.heading}>{headerTitle}</Text>
            }
            <Icon name={actionIcon} style={styles.leadingIcon}
                onPress={onPressActionIcon}
            />
        </View>
    );
};
export default Header;