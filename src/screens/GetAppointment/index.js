import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { height, width } from 'react-native-dimension';
export default function GetAppointment(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
    headerUnScrollable={()=><Header headerTitle={'Get an appointment'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
  }>
      <View style={styles.mainViewContainer}>
       <InputField label={'Select a Hair Style'} placeholder={'Crew Cut'} />
       <InputField label={'Time and Date'} placeholder={'Monday, 13th March, 3:00 PM'} />
       <InputField label={'Additional Notes'} placeholder={'I would like to have coffee while my haircut.'}
       multiline numoflines={5} />
       <Button title={'Request an appointment'} onPress={()=>props.navigation.navigate('SelectPaymentMethod')} />
      </View>
    </ScreenWrapper>
  );
};
