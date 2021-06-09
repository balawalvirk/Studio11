import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import InputField from '../../components/InputField';
import {useDispatch, useSelector} from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Logo from '../../components/Logo';
import {width} from 'react-native-dimension';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import auth from '@react-native-firebase/auth';
import AppColors from '../../utills/AppColors';
import {saveData} from '../../firebaseConfig';
import {login, setLoginScreenType} from '../../Redux/Actions/Auth';
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
    if (reg.test(email)) {
      setemailerror('');
      return true;
    } else {
      setemailerror('Email address is invalid');
      return false;
    }
    elseif(email == '');
    {
      setemailerror('Please enter an email address');
      return false;
    }
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
            // }
            {
              auth()
                .createUserWithEmailAndPassword(email, password)
                .then(async (result) => {
                  await saveData('Users', result.user.uid, {
                    FirstName: firstName,
                    LastName: lastName,
                    Email: email,
                    Password: password,
                    Type: userType,
                  });
                  console.log('User account created & signed in!');
                  dispatch(
                    login({
                      FirstName: firstName,
                      LastName: lastName,
                      Email: email,
                      Password: password,
                      Type: userType,
                    }),
                  );
                  // props.navigation.navigate('Login')
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
            }
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
        <Logo imagepath={require('../../assets/images/logo.png')} />
        <Text style={styles.heading}>Create an Account</Text>
        <Text style={styles.description}>Register to get started</Text>
        <View style={styles.NameRow}>
          <InputField
            value={firstName}
            onChangeText={(firstName) => {
              setfirstName(firstName);
              checkFirstName(firstName);
            }}
            label={'First Name'}
            placeholder={'First Name'}
            containerStyles={{width: width(37.5)}}
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
            containerStyles={{width: width(37.5)}}
            fielderror={lastNameerror}
          />
        </View>
        <InputField
          value={email.trim()}
          onChangeText={(email) => {
            setemail(email.trim());
            checkEmail(email);
          }}
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
        <TouchableOpacity
          style={styles.RowafterInputField}
          onPress={() => {
            setCheckIcon(!checkIcon);
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
        <Text style={styles.whiteText}>Select User Type</Text>
        <View style={styles.buttonRow}>
          <Button
            planButton={userType != 'Customer'}
            containerStyle={{
              width: width(30),
              backgroundColor: AppColors.iconColor,
            }}
            title="Customer"
            onPress={() => setuserType('Customer')}
          />
          <Button
            planButton={userType != 'Barber'}
            containerStyle={{
              width: width(30),
              backgroundColor: AppColors.iconColor,
            }}
            title="Barber"
            onPress={() => setuserType('Barber')}
          />
        </View>
        <Button
          title="Signup"
          disabled={checkIcon ? false : true}
          // onPress={()=>props.navigation.navigate('Dashboard')}
          onPress={() => signUpUser()}
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
