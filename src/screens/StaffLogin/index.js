import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import InputField from '../../components/InputField';
import HighlightedText from '../../components/HighlightedText';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import ScreenWrapper from '../../components/ScreenWrapper';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {getData} from '../../firebaseConfig';
import {
  login,
  logout,
  setCustomerType,
  setLoginScreenType,
} from '../../Redux/Actions/Auth';
export default function StaffLogin(props) {
  const dispatch = useDispatch();
  const [email, setemail] = useState('Barber@mail.com');
  const [emailError, setEmailError] = useState('');
  const [checkIcon, setCheckIcon] = useState(false);
  const [activeUser, setactiveUser] = useState(true);
  const [waiting, setwaiting] = useState(false);
  const [password, setPassword] = useState('12345678');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const checkEmail = () => {
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let valid = false;
    reg.test(email);
    if (reg.test(email)) {
      setEmailError('');
      valid = true;
    } else {
      setEmailError('Email address is invalid');
    }
    if (email == '') {
      setEmailError('Please enter an email address');
    }
    return valid;
  };
  const checkPassword = (pass = password) => {
    if (pass.length < 7) {
      setPasswordError('invalid password');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };
  const _login = async () => {
    setwaiting(true);
    if (checkEmail()) {
      if (checkPassword()) {
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (result) => {
            if (result.user.displayName === 'Barber') {
              const user = await getData('Users', result.user.uid);
              dispatch(setCustomerType(user.Type));
              dispatch(login(user));
            } else {
              alert('invalid User details');
              await auth().signOut();
              dispatch(logout());
            }
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              setPasswordError('That email address is already in use!');
              setemail('');
              setPassword('');
            }

            if (error.code === 'auth/invalid-email') {
              setPasswordError('That email address is invalid!');
              setemail('');
              setPassword('');
            }

            if (error.code === 'auth/user-not-found') {
              setPasswordError('No user found ');
              setemail('');
              setPassword('');
            }
            setPasswordError('User details are invalid!');
          });
      } else null;
    } else null;
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(setLoginScreenType('Barber'));
    });
    dispatch(setLoginScreenType('Barber'));
  }, []);
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}
      backgroundImage={require('../../assets/images/bg.png')}>
      <View style={styles.mainViewContainer}>
        <Logo imagepath={require('../../assets/images/logo.png')} />
        {waiting ? (
          <View style={styles.waitingContainer}>
            <ActivityIndicator size="large" color={AppColors.primaryGold} />
          </View>
        ) : (
          <>
            <Text style={styles.heading}>Welcome Studio 11</Text>
            <Text style={styles.description}> Login to continue</Text>
            <View style={styles.tabContainer}>
              <TouchableOpacity
                onPress={() => setactiveUser(true)}
                style={activeUser ? styles.tab : null}>
                <Text style={styles.tabTitle}>Barber</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setactiveUser(false)}
                style={activeUser ? null : styles.tab}>
                <Text style={styles.tabTitle}>Receptionist</Text>
              </TouchableOpacity>
            </View>
            <InputField
              value={email.trim()}
              onBlur={checkEmail}
              onChangeText={(email) => {
                setemail(email.trim());
                checkEmail();
              }}
              fielderror={emailError}
              label={'Username'}
              placeholder={'Enter you Email'}
            />
            <InputField
              secureTextEntry
              value={password}
              onChangeText={(password) => {
                setPassword(password);
                checkPassword(password);
              }}
              fielderror={passwordError}
              label={'Password'}
              placeholder={'Enter you Password'}
            />
            <View style={styles.RowafterInputField}>
              <HighlightedText
                onPress={() => props.navigation.navigate('ResetPassword')}
                text={'Forgot password?'}
              />
            </View>
            {activeUser ? (
              <Button
                isLoading={isLoading}
                title="Login"
                onPress={() => _login()}
              />
            ) : (
              <Button
                title="Login"
                onPress={() => console.log('Reception login pressed')}
              />
            )}
            <View style={styles.TextRow}>
              <Text style={styles.whiteText}>Do you have a user account?</Text>
              <HighlightedText
                containerStyle={{marginStart: width(1)}}
                text={'Login from here'}
                onPress={() => props.navigation.navigate('Login')}
              />
            </View>
          </>
        )}
      </View>
    </ScreenWrapper>
  );
}
