import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { CommonActions } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import BG from '../../assets/images/bg.png';
import LOGO from '../../assets/images/logo.png';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getAppointments, getCuttingsById, getData, getItemsById, getVideosById } from '../../firebaseConfig';
import { login, setCustomerType } from '../../Redux/Actions/Auth';
import { setCuttings, setItems, setVideos } from '../../Redux/Actions/Barber';
import { setAppointments, setCart } from '../../Redux/Actions/Customer';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';

export default function Splash(props) {
    // const user = useSelector(state => state.Auth.user)
    const dispatch = useDispatch()
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
                    dispatch(login({
                        ...userObj,
                        breakTime: {
                            fromMoment: breakTime?.fromMoment,
                            toMoment: breakTime?.toMoment,
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
                const appointments = await getAppointments()
                const snapshot = await firestore().collection('Cart').doc(auth().currentUser.uid).collection('Cart').get()
                snapshot.forEach(doc => {
                    cartItems.push(doc.data())
                })
                dispatch(setAppointments(appointments))
                if (cartData) {
                    dispatch(setCart({
                        ...cartData,
                        cartItems,
                    }))
                }
                dispatch(login(userObj));
            }
        } else {
            console.log('USER NOT LOGGED IN');
            window.subscriber
            setTimeout(() => {
                props.navigation.dispatch(CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                }))
            }, 2000)
        }
    }
    useEffect(() => {
        window.subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
    return (
        <ScreenWrapper
            transclucent
            statusBarColor={AppColors.transparent}
            barStyle={'dark-content'}
            backgroundImage={BG}
        >
            <View style={styles.mainViewContainer}>
                <Image source={LOGO} style={styles.logo} resizeMode={'contain'} />
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size={'large'} color={AppColors.primaryGold} />
                </View>
            </View>
        </ScreenWrapper>
    );
};
