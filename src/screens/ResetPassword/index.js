import React, { useState } from 'react';
import { Text, View } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import ScreenWrapper from '../../components/ScreenWrapper';
import CustomModal from '../../components/customModal';
import AppColors from '../../utills/AppColors';
export default function ResetPassword(props) {
  const [email, setemail] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 5000)
  }
  const checkEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = false;
    reg.test(email) ? setEmailError('yeh') : setEmailError('woh')
    if (reg.test(email)) {
      setEmailError('')
      valid = true
    } else { setEmailError('Email address is invalid') }
    if (email == '') {
      setEmailError('Please enter an email address')
    }
    return valid
  }
  const [emailError, setEmailError] = useState('');
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header
        leadingIcon={'arrow-left'}
        headerTitle={'Reset Password'}
        onPressLeadingIcon={() => props.navigation.goBack()}
      />
      <View style={styles.mainViewContainer}>
        <Logo imagepath={require('../../assets/images/resetpassword.png')} />
        <Text style={styles.description}>Enter your email and we will send a link to you from where you can reset your password</Text>
        <InputField value={email}
          onBlur={checkEmail}
          onChangeText={email => {
            setemail(email)
            checkEmail()
          }} fielderror={emailError}
          label={'Email'} placeholder={'Enter you Email'}
        />
        <Button
          title="Reset Password"
          onPress={() => openModal()}
        />
      </View>
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)} onModalShow={() => {
        setTimeout(() => {
          props.navigation.navigate('Login');
        }, 5000)
      }}
        iconName={"checkcircle"} description={'Password reset link has been send on your email.'} />
    </ScreenWrapper>
  );
};
