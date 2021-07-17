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
import auth from '@react-native-firebase/auth'
export default function ResetPassword(props) {
  const [email, setemail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fEmail, setFEmail] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [modalText, setModalText] = useState('Password reset link has been send on your email.');
  const [iconName, setIconName] = useState('checkcircle');

  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      setModalText('Password reset link has been send on your email.')
      setIconName('checkcircle')
      setModalVisible(false)
      // props.navigation.navigate('Login');
    }, 2000)
  }
  const checkEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = false;
    reg.test(fEmail) ? setEmailError('yeh') : setEmailError('woh')
    if (reg.test(fEmail)) {
      setEmailError('')
      valid = true
    } else { setEmailError('Email address is invalid') }
    if (fEmail == '') {
      setEmailError('Please enter an email address')
    }
    return valid
  }
  const sendResetPasswordEmail = async (buttonClicked = false) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (fEmail == '') {
      setFEmailError('Please enter reset email')
      return
    }
    if (reg.test(fEmail) == false) {
      setFEmailError('Invalid email format')
      return
    }
    setEmailError('')

    await auth().sendPasswordResetEmail(fEmail).then(function () {
      setFEmail('')
      openModal()
    }).catch(error => {
      if (error.code === "auth/invalid-email") {
        setModalText("That email address is invalid!")
        setIconName('exclamationcircle')
        openModal()
      }
      else if (error.code === "auth/user-disabled") {
        setModalText("User is disabled!")
        setIconName('exclamationcircle')
        openModal()
      }
      else if (error.code === "auth/user-not-found") {
        setModalText("User not found!")
        setIconName('exclamationcircle')
        openModal()
      }
      else if (error.code === "auth/wrong-password") {
        setModalText("Incorrect Password!")
        setIconName('exclamationcircle')
        openModal()
      } else if (error.code === "auth/too-many-requests") {
        setModalText("We have blocked all requests from this device due to unusual activity. Try again later.")
        setIconName('exclamationcircle')
        openModal()
      }
      else {
        console.log(error.message)
        setModalText("Something went wrong!")
        setIconName('exclamationcircle')
        openModal()
      }
    });
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
        <InputField
          autoCapitalize={'none'}
          value={fEmail}
          onBlur={checkEmail}
          onChangeText={email => {
            setFEmail(email)
            checkEmail()
          }}
          fielderror={emailError}
          label={'Email'}
          placeholder={'Enter you Email'}
          keyboardType={'email-address'}
        />
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          title="Reset Password"
          onPress={() => sendResetPasswordEmail()}
        />
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onModalShow={() => {

        }}
        iconName={iconName}
        description={modalText} />
    </ScreenWrapper>
  );
}