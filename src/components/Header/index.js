import React from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import Logo from '../Logo';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { width } from 'react-native-dimension';
const Header = ({
  midLogo,
  headerTitle,
  leadingIcon = null,
  actionIcon,
  onPressLeadingIcon,
  onPressActionIcon,
  renderIconRight = null,
  renderTrackOrder = null
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPressLeadingIcon}>
        <Icon name={leadingIcon} style={styles.leadingIcon} />
      </TouchableOpacity>
      {midLogo ? (
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      ) : (
        <Text style={[styles.heading, { width: renderTrackOrder ? width(70) : leadingIcon ? width(80) : width(90) }]}>{headerTitle}</Text>
      )}
      {renderTrackOrder &&
        renderTrackOrder()
      }
      {renderIconRight ? (
        renderIconRight()
      ) : (
        <TouchableOpacity
          style={styles.leadingIcon}
          onPress={onPressActionIcon}>
          <Icon name={actionIcon} style={styles.leadingIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default Header;
