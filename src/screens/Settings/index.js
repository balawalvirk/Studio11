import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { width } from 'react-native-dimension';
export default function Settings(props) {

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Settings'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>Privacy</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>Notification</Text>
          <TouchableOpacity style={styles.arrowContainer}
            onPress={() => props.navigation.navigate('BarberNotifications')}>
            <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>Account</Text>
          <TouchableOpacity style={styles.arrowContainer} onPress={() => props.navigation.navigate('ProfileBarber')}>
            <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>About</Text>
          <TouchableOpacity style={styles.arrowContainer}>
            <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};
