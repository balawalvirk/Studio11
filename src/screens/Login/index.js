import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import InputField from '../../components/InputField';
import { useDispatch } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Logo from '../../components/Logo';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import {
  getCuttingsById,
  getData,
  getItemsById,
  getVideosById,
} from '../../firebaseConfig';
import {
  login,
  logout,
  setCustomerType,
  setLoginScreenType,
} from '../../Redux/Actions/Auth';
import firestore from '@react-native-firebase/firestore'
import { setCuttings, setItems, setVideos } from '../../Redux/Actions/Barber';
import { setCart } from '../../Redux/Actions/Customer';
import { UserTypes } from '../../utills/Enums';
export default function Login(props) {
  const [email, setemail] = useState('Customer@mail.com');
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('12345678');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setLoading] = useState(false);

  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const checkEmail = () => {
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
    let valid = false;
    if (pass.length < 7) {
      setPasswordError('invalid password');
    } else {
      setPasswordError('');
      valid = true;
    }
    return valid;
  };

  async function onAuthStateChanged(user) {
    if (user) {
      const userObj = await getData('Users', user.uid);
      dispatch(setCustomerType(userObj?.Type));
      console.log('USER LOGGED IN ', userObj?.Type);

      if (userObj?.Type == UserTypes.BARBER) {
        const items = await getItemsById();
        const videos = await getVideosById();
        const cuttings = await getCuttingsById();
        const { breakTime } = userObj
        dispatch(setItems(items));
        dispatch(setCuttings(cuttings));
        dispatch(setVideos(videos));
        if (breakTime) {
          console.log(breakTime)
          dispatch(login({
            ...userObj,
            breakTime: {
              fromMoment: breakTime?.fromMoment?.toDate(),
              toMoment: breakTime?.toMoment?.toDate(),
              to: breakTime.to,
              from: breakTime.from
            }
          }));
        } else {
          dispatch(login({
            ...userObj,
          }));
        }
      } else if (userObj?.Type == UserTypes.CUSTOMER) {
        let cartItems = []
        const cartData = await getData('Cart', auth().currentUser.uid)
        const snapshot = await firestore().collection('Cart').doc(auth().currentUser.uid).collection('Cart').get()
        snapshot.forEach(doc => {
          cartItems.push(doc.data())
        })
        dispatch(setCart({
          ...cartData,
          cartItems,
        }))
        dispatch(login(userObj));
      }
    } else {
      console.log('USER NOT LOGGED IN');
    }
  }
  useEffect(() => {
    window.subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  const _login = async () => {
    if (checkEmail()) {
      if (checkPassword()) {
        setLoading(true);
        auth()
          .signInWithEmailAndPassword(email, password)
          .then(async (result) => {
            console.log(result.user.displayName);
            if (result.user.displayName === 'Customer') {
              const user = await getData('Users', result.user.uid);
              dispatch(setCustomerType(user.Type));
              dispatch(login(user));
              setLoading(false);
            } else {
              console.log('logout please this is barber');
              alert('invalid User details');
              await auth().signOut();
              dispatch(logout());
              setLoading(false);
            }
          })
          .catch((error) => {
            setLoading(false);
            if (error.code === 'auth/email-already-in-use') {
              setPasswordError('That email address is already in use!');
              setemail('');
              setPassword('');
              console.log('That email address is already in use!');
            }

            if (error.code === 'auth/invalid-email') {
              setPasswordError('That email address is invalid!');
              setemail('');
              setPassword('');
              console.log('That email address is invalid!');
            }

            if (error.code === 'auth/user-not-found') {
              setPasswordError('No user found ');
              setemail('');
              setPassword('');
            }

            console.error(error);
            setPasswordError('User details are invalid!');
          });
      } else null;
    } else null;
  };

  return (
    <ScreenWrapper
      transclucent
      statusBarColor={AppColors.transparent}
      backgroundImage={require('../../assets/images/bg.png')}>
      <View style={styles.mainViewContainer}>
        <Logo imagepath={require('../../assets/images/logo.png')} />
        <View style={styles.titleContainer}>
          <Text
            onPress={() => props.navigation.navigate('Dummy')}
            style={styles.heading}>
            Welcome Studio 11
          </Text>
          <Text style={styles.description}>Login to continue</Text>
        </View>
        <InputField
          value={email}
          onBlur={checkEmail}
          onChangeText={(email) => {
            setemail(email.trim());
            checkEmail();
          }}
          fielderror={emailError}
          label={'Email'}
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
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          containerStyle={styles.loginBtn}
          title="Login"
          onPress={_login}
        />
        <View style={styles.TextRow}>
          <Text style={styles.whiteText}>Don't have any account? </Text>
          <HighlightedText
            text={'Register'}
            onPress={() => props.navigation.navigate('Register')}
          />
        </View>
        <View style={styles.TextRow}>
          <Text style={styles.whiteText}>Are you from the staff? </Text>
          <HighlightedText
            onPress={() => props.navigation.navigate('StaffLogin')}
            text={'Login from here'}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
