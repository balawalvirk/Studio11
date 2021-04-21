import React, { useState } from 'react';
import { Text, View, Image } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Modal from 'react-native-modal';
import ScreenWrapper from '../../components/ScreenWrapper';
export default function ResetPassword(props) {
  const [email, setemail] = useState();
  const [modalVisible, setModalVisible] = useState(false);
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
    <ScreenWrapper transclucent statusBarColor={'transparent'} >
      <Header
        leadingIcon={'arrowleft'}
        headerTitle={'Reset Password'}
        onPressLeadingIcon={() => props.navigation.goBack()}
      />
      <View style={styles.mainViewContainer}>

        <Image source={require('../../assets/images/resetpassword.png')}
          style={styles.logo} />
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
          onPress={() => setModalVisible(true)
          }
        />
      </View>
      <Modal 
      isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView} >
        <Icon name="checkcircle" style={styles.modalIcon} color='red'/>
          <Text style={styles.modalText}>Password reset link has been send on your email.</Text>
        </View>
      </Modal>
    </ScreenWrapper>
  );
};
