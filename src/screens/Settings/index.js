import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
export default function Settings(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Settings'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>Privacy</Text>
        <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')}/>
        </View>
        {/* <HorizontalLine HorizontalLine100 /> */}
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>Notification</Text>
        <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')}/>
        </View>
        {/* <HorizontalLine HorizontalLine100 /> */}
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>Account</Text>
        <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')}/>
        </View>
        {/* <HorizontalLine HorizontalLine100 /> */}
        <View style={styles.settingsRow}>
          <Text style={styles.labels}>About</Text>
        <Image style={styles.rightArrow} source={require('../../assets/images/arrowRight.png')}/>
        </View>
        {/* <HorizontalLine HorizontalLine100 /> */}
       
      </View>
    </ScreenWrapper>
  );
};