import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import HighlightedText from '../../components/HighlightedText';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ScreenWrapper from '../../components/ScreenWrapper';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
export default function StaffLogin(props) {
  const [email, setemail] = useState();
  const [emailError, setEmailError] = useState('');
  const [checkIcon, setCheckIcon] = useState(false);
  const [activeUser, setactiveUser] = useState(true);
  const [password, setPassword] = useState();
  const [passwordError, setPasswordError] = useState('');
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
  return (

    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      backgroundImage={require('../../assets/images/bg.png')}
    >
      <View
        style={styles.mainViewContainer}>
        <Logo imagepath={require('../../assets/images/logo.png')} />
        <Text style={styles.heading}>Welcome Studio 11</Text>
        <Text style={styles.description}> Login to continue</Text>
        <View style={{ flexDirection: 'row', width: width(80), justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => setactiveUser(true)} style={activeUser ? styles.tab : null}>
            <Text style={styles.tabTitle}>Barber</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setactiveUser(false)} style={activeUser ? null : styles.tab}>
            <Text style={styles.tabTitle}>Receptionist</Text>
          </TouchableOpacity>
        </View>
        <InputField value={email}
          onBlur={checkEmail}
          onChangeText={email => {
            setemail(email)
            checkEmail()
          }} fielderror={emailError}
          label={'Username'} placeholder={'Enter you Email'}
        />
        <InputField secureTextEntry value={password}
          onChangeText={password => {
            setPassword(password)
            checkPassword(password)
          }} fielderror={passwordError}
          label={'Password'} placeholder={'Enter you Password'}
        />
        <View style={styles.RowafterInputField}>
          <TouchableOpacity style={styles.rememberbeSection}
            onPress={() => { setCheckIcon(!checkIcon) }}>
            {checkIcon ?
              <Icon name="checkcircle" style={styles.checkIcon} color={AppColors.primaryGold} />
              : <Icon name="checkcircle" style={styles.checkIcon} color={AppColors.white50} />}
            <Text style={styles.whiteText}>Remember me</Text>
          </TouchableOpacity>
          <HighlightedText onPress={() => props.navigation.navigate('ResetPassword')}
            text={'Forgot password?'}
          />
        </View>
        {activeUser ?
          (<Button
            title="Login" onPress={() =>
              // login()
              console.log('barber login pressed')
            }
          />) :
          (<Button
            title="Login"
            onPress={() =>
              // login()
              console.log('Other login pressed')
            }
          />
          )}
        <View style={styles.TextRow}>
          <Text style={styles.whiteText}>Don't have an user account? </Text>
          <HighlightedText text={'Login from here'}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      </View>
    </ScreenWrapper>

  );
};
