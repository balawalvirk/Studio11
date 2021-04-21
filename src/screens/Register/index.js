import React, { useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import InputField from '../../components/InputField';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Logo from '../../components/Logo';
import { width } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Colors from '../../utills/AppColors';
import auth from '@react-native-firebase/auth'
export default function Register({ navigation }) {
    const user = useSelector((state) => state.Auth.user);
    const dispatch = useDispatch();
    const [checkIcon, setCheckIcon] = useState(false);
    const [firstName, setfirstName] = useState();
    const [firstNameerror, setfirstNameerror] = useState('');
    const [lastName, setlastName] = useState();
    const [lastNameerror, setlastNameerror] = useState('');
    const [email, setemail] = useState();
    const [emailerror, setemailerror] = useState('');
    const [password, setpassword] = useState();
    const [passworderror, setpassworderror] = useState('');
    let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const signUp = async () => {
        // const user = {

        // }
        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setpassworderror('That email address is already in use!')
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (
        <ScreenWrapper scrollEnabled transclucent statusBarColor = {'transparent'} 
            backgroundImage={require('../../assets/images/bg.png')}  >
            <View style={styles.mainViewContainer}>
               <Logo  imagepath={require('../../assets/images/logo.png')} />
                <Text style={styles.heading}>Create an Account</Text>
                <Text style={styles.description}>Register to get started</Text>
                <View style={styles.NameRow}>
                    <InputField value={firstName}
                        onChangeText={firstName => { setfirstName(firstName)
                            if (firstName.length < 3) {setfirstNameerror('invalid user name')}else{setfirstNameerror('')}}}
                        label={'First Name'} placeholder={'Enter your first Name'}
                        containerStyles={{ width: width(37.5) }} fielderror={firstNameerror}
                    />
                    <InputField value={lastName}
                        onChangeText={lastName => {setlastName(lastName)
                            if (lastName.length < 3) {setlastNameerror('invalid user name') }else{setlastNameerror('')}}}
                        label={'Last Name'} placeholder={'Enter your Last Name'}
                        containerStyles={{ width: width(37.5) }} fielderror={lastNameerror}
                    />
                </View>
                <InputField value={email}
                    onChangeText={email => {
                        setemail(email)
                        {
                            reg.test(email) ? setemailerror('') : setemailerror('invalid mail')
                        }
                    }}
                    label={'Email'} placeholder={'Enter you Email'} fielderror={emailerror}
                />
                <InputField secureTextEntry value={password}
                    onChangeText={password => {
                        setpassword(password)
                        { (password.length < 7) ? setpassworderror('invalid password') : setpassworderror('') }
                    }}
                    label={'Password'} placeholder={'Enter you Password'} fielderror={passworderror}
                />
                <TouchableOpacity style={styles.RowafterInputField} onPress={()=>{setCheckIcon(!checkIcon)}}>
                {checkIcon ?
                <Icon name="checkcircle" style={styles.checkIcon} color={Colors.primaryGold}/>
                : <Icon name="checkcircleo" style={styles.checkIcon} color={Colors.white50} />
                } 
                <HighlightedText
                        text={'Terms & Conditions'}
                    />
                </TouchableOpacity>
                <Button
                    title="Signup"
                    onPress={() => signUp()}
                />
                <View style={styles.TextRow}>
                    <Text style={styles.whiteText}>Already have an account? </Text>
                    <HighlightedText text={'Login'} onPress={() => navigation.navigate('Login')} />
                </View>
            </View>
        </ScreenWrapper>
    );
}
