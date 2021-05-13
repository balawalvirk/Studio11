import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
export default function SearchAppointment(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Search Appointment'} leadingIcon={'arrow-left'} 
      onPressLeadingIcon={() => props.navigation.goBack()} />}>

      <View style={styles.mainViewContainer}>
        <InputField searchIcon
          labelStyle={{marginVertical: 0 }}
          placeholder={'Type here...'}
        />

      </View>
    </ScreenWrapper>
  );
};
