import React from 'react';
import Icon from 'react-native-vector-icons/dist/Feather';
import Logo from '../Logo';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { height, width } from 'react-native-dimension';
import Entypo from 'react-native-vector-icons/Entypo'
import AppColors from '../../utills/AppColors';
const Header = ({
  midLogo,
  headerTitle,
  leadingIcon = null,
  actionIcon,
  onPressLeadingIcon,
  onPressActionIcon,
  renderIconRight = null,
  renderTrackOrder = null,
  isCalendar = false,
  onDatePress = () => { }
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
      ) : isCalendar ? (
        <TouchableOpacity
          onPress={onDatePress}
          activeOpacity={0.7}
          style={styles.flexRow}>
          <Text style={[styles.heading]}>{headerTitle}</Text>
          <Entypo
            name={'chevron-down'}
            size={height(2.5)}
            color={AppColors.white}
          />
        </TouchableOpacity>
      ) : (
        <Text style={[styles.heading, { width: renderTrackOrder ? width(70) : leadingIcon ? width(80) : width(90) }]}>{headerTitle}</Text>
      )
      }
      {
        renderTrackOrder &&
        renderTrackOrder()
      }
      {
        renderIconRight ? (
          renderIconRight()
        ) : (
          <TouchableOpacity
            style={styles.leadingIcon}
            onPress={onPressActionIcon}>
            <Icon name={actionIcon} style={styles.leadingIcon} />
          </TouchableOpacity>
        )
      }
    </View >
  );
};
export default Header;
