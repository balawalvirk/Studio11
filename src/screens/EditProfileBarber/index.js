import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
export default function EditProfileBarber(props) {
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Edit Profile'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <Image style={styles.profileImage} source={require('../../assets/images/cuttings/1.png')} />
        <HighlightedText text={'Change Profile Picture'} />
        <HorizontalLine />
        <View style={styles.inputRow}>
          <InputField label={'First Name'} placeholder={'Micheal'} containerStyles={{ width: '45%' }} />
          <InputField label={'Last Name'} placeholder={'Fox'} containerStyles={{ width: '45%' }} />
        </View>
        <InputField label={'Email'} placeholder={'micheal397@gmail.com'} />
        <Button title={'Update'} onPress={() => props.navigation.goBack()} />
      </View>
    </ScreenWrapper>
  );
};