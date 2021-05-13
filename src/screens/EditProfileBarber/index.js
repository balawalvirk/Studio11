import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import HairStyle from '../../components/HairStyle';
import StylerCard from '../../components/StylerCard';
import Icon from 'react-native-vector-icons/dist/Entypo';
import HorizontalLine from '../../components/HorizontalLine';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import { height, width } from 'react-native-dimension';
import Appointments from '../Appointments';
import AppColors from '../../utills/AppColors';
import { color } from 'react-native-reanimated';
import ReviewCard from '../../components/ReviewCard';
import PostReview from '../../components/PostReview';
import highlightedText from '../../components/HighlightedText';
export default function EditProfileBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
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