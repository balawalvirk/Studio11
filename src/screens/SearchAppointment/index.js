import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
export default function SearchAppointment(props) {
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Search Appointment'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <InputField searchIcon
          labelStyle={{ marginVertical: 0 }}
          placeholder={'Type here...'}
        />

      </View>
    </ScreenWrapper>
  );
};
