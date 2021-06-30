import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import InputField from '../../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Logo from '../../components/Logo';
import { height, width } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import auth from '@react-native-firebase/auth';
import AppColors from '../../utills/AppColors';
import { saveData } from '../../firebaseConfig';
import { login, setLoginScreenType } from '../../Redux/Actions/Auth';
import { UserTypes } from '../../utills/Enums';
import moment from 'moment';
export default function Register(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [checkIcon, setCheckIcon] = useState(false);
  const [userType, setuserType] = useState('Customer');
  const [firstName, setfirstName] = useState('');
  const [firstNameerror, setfirstNameerror] = useState('');
  const [lastName, setlastName] = useState('');
  const [lastNameerror, setlastNameerror] = useState('');
  const [email, setemail] = useState('');
  const [emailerror, setemailerror] = useState('');
  const [password, setpassword] = useState('');
  const [passworderror, setpassworderror] = useState('');
  const [termsError, setTermsError] = useState('');
  const [isLoading, setLoading] = useState(false);
  let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const checkFirstName = (firstName) => {
    if (firstName.length < 3) {
      setfirstNameerror('invalid First name');
      return false;
    } else {
      setfirstNameerror('');
      return true;
    }
  };
  const checkLastName = (lastName) => {
    if (lastName.length < 3) {
      setlastNameerror('invalid Last name');
      return false;
    } else {
      setlastNameerror('');
      return true;
    }
  };
  const checkEmail = (email) => {
    if (!reg.test(email)) {
      setemailerror('Invalid email.');
      return false;
    }
    if (email == '') {
      setemailerror('Please enter email.');
      return false;
    }
    setemailerror('');
    return true;
  };
  const checkPassword = (password) => {
    if (password.length < 7) {
      setpassworderror('invalid password');
      return false;
    } else {
      setpassworderror('');
      return true;
    }
  };

  const signUpUser = async () => {
    if (checkFirstName(firstName)) {
      if (checkLastName(lastName)) {
        if (checkEmail(email)) {
          if (checkPassword(password)) {
            if (!checkIcon) {
              console.log('sddddffddd');
              setTermsError('Please accept terms & conditions');
              return;
            }
            setTermsError('');
            setLoading(true);
            auth()
              .createUserWithEmailAndPassword(email, password)
              .then(async (result) => {
                let userOBJ = {
                  id: result.user.uid,
                  FirstName: firstName,
                  LastName: lastName,
                  Email: email,
                  Type: userType,
                };
                if (userOBJ.Type == UserTypes.BARBER) {
                  userOBJ.HairCutCount = 0;
                  userOBJ.Rating = 0;
                  userOBJ.RatingCount = 0;
                  userOBJ.breakTime = {
                    fromMoment: moment().valueOf(),
                    toMoment: moment().valueOf()
                  }
                }
                await saveData('Users', result.user.uid, userOBJ);
                console.log('User account created & signed in!');
                dispatch(login(userOBJ));
                return result.user.updateProfile({
                  displayName: userType,
                });
              })
              .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                  setpassworderror('That email address is already in use!');
                  console.log('That email address is already in use!');
                }
                if (error.code === 'auth/invalid-email') {
                  console.log('That email address is invalid!');
                }
                console.error(error);
              });
          } // else null
        } //else null
      } //else null
    } //else null
  };
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      dispatch(setLoginScreenType('REGISTER'));
    });
    dispatch(setLoginScreenType('REGISTER'));
  }, []);
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}
      backgroundImage={require('../../assets/images/bg.png')}>
      <View style={styles.mainViewContainer}>
        <Logo
          imagepath={require('../../assets/images/logo.png')}
          containerStyle={{ marginVertical: 'auto' }}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.heading}>Create an Account</Text>
          <Text style={styles.description}>Register to get started</Text>
        </View>
        <View style={styles.NameRow}>
          <InputField
            value={firstName}
            onChangeText={(firstName) => {
              setfirstName(firstName);
              checkFirstName(firstName);
            }}
            label={'First Name'}
            placeholder={'First Name'}
            containerStyles={{ width: width(37.5) }}
            fielderror={firstNameerror}
          />
          <InputField
            value={lastName}
            onChangeText={(lastName) => {
              setlastName(lastName);
              checkLastName(lastName);
            }}
            label={'Last Name'}
            placeholder={'Last Name'}
            containerStyles={{ width: width(37.5), height: 'auto' }}
            fielderror={lastNameerror}
          />
        </View>
        <InputField
          value={email.trim()}
          onChangeText={(email) => {
            setemail(email.trim());
            checkEmail(email);
          }}
          // onBlur={()=>}
          label={'Email'}
          placeholder={'Enter your Email'}
          fielderror={emailerror}
        />
        <InputField
          secureTextEntry
          value={password}
          onChangeText={(password) => {
            setpassword(password);
            checkPassword(password);
            // { (password.length < 7) ? setpassworderror('invalid password') : setpassworderror('') }
          }}
          label={'Password'}
          placeholder={'Enter your Password'}
          fielderror={passworderror}
        />
        <View>
          <TouchableOpacity
            style={styles.RowafterInputField}
            onPress={() => {
              setCheckIcon(!checkIcon);
              setTermsError('');
            }}>
            {checkIcon ? (
              <Icon
                name="checkcircle"
                style={styles.checkIcon}
                color={AppColors.primaryGold}
              />
            ) : (
              <Icon
                name="checkcircle"
                style={styles.checkIcon}
                color={AppColors.white50}
              />
            )}
            <HighlightedText
              onPress={() => props.navigation.navigate('TermsConditions')}
              text={'Terms & Conditions'}
            />
          </TouchableOpacity>
          <Text style={styles.errText}>{termsError}</Text>
        </View>
        <Text style={styles.whiteText}>Select User Type</Text>
        <View style={styles.buttonRow}>
          <Button
            planButton={userType != 'Customer'}
            containerStyle={styles.btn}
            title="Customer"
            onPress={() => setuserType('Customer')}
          />
          <Button
            planButton={userType != 'Barber'}
            containerStyle={styles.btn}
            title="Barber"
            onPress={() => setuserType('Barber')}
          />
        </View>
        <Button
          title="Signup"
          onPress={() => signUpUser()}
          isLoading={isLoading}
        />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Already have an account? </Text>
          <HighlightedText
            text={'Login'}
            onPress={() => props.navigation.navigate('Login')}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
