import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
export default function GetAppointment(props) {

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Get an appointment'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      }>
      <View style={styles.mainViewContainer}>
        <InputField label={'Select a Hair Style'} placeholder={'Crew Cut'} />
        <InputField label={'Time and Date'} placeholder={'Monday, 13th March, 3:00 PM'} />
        <InputField label={'Additional Notes'} placeholder={'I would like to have coffee while my haircut.'}
          multiline numoflines={5} />
        <Button title={'Request an appointment'} onPress={() => props.navigation.navigate('SelectPaymentMethod')} />
      </View>
    </ScreenWrapper>
  );
};
