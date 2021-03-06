import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { FlatList, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { set } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import CustomModal from '../../components/customModal';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import InputModal from '../../components/inputModal';
import ScheduleCard from '../../components/ScheduleCard';
import ScreenWrapper from '../../components/ScreenWrapper';
import WelcomeBarberText from '../../components/WelcomeBarberText';
import { endBreak, getAppointments, getData, saveData, setChatRoom } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import AppColors from '../../utills/AppColors';
import { NotificationTypes, UserTypes } from '../../utills/Enums';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default function BarberHomeScreen(props) {

  const user = useSelector((state) => state.Auth.user);
  const userRef = useRef(user)
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [breakLoading, setBreakLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [resumeModalVisible, setresumeModalVisible] = useState(false);
  const [workBreak, setworkBreak] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromError, setFromError] = useState('');
  const [toError, setToError] = useState('');
  const [fromMoment, setFromMoment] = useState('');
  const [toMoment, setToMoment] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [dateTimeString, setDateTimeString] = useState(moment().format('dddd, DD MMMM, hh:mm a'));

  const [pickerMode, setPickerMode] = useState(0); //0 => from   1=> To
  useEffect(() => { userRef.current = user }, [user])
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Notification caught in app front')
      processNotificationFront(remoteMessage)
    });
    messaging().onNotificationOpenedApp(processNotification);

    return unsubscribe;
  }, []);
  useEffect(() => {
    dynamicLinks()
      .getInitialLink()
      .then(handleDynamicLink);
  }, [])
  const handleDynamicLink = async data => {
    if (data) {
      console.log('DYNAMIC LINK CAUGHT: ', data)
      const userObj = await getData('Users', user?.id)
      dispatch(login(userObj))
    }
  };
  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);
  const processNotification = (remoteMessage) => {
    const messageType = remoteMessage?.data?.type
    console.log('=======>', messageType)
    if (messageType == NotificationTypes.MESSAGE) {
      const roomId = remoteMessage?.data?.roomId
      console.log(roomId)
      props.navigation.navigate('Chat', { roomId })
    } else if (messageType == NotificationTypes.APPOINTMENT) {
      // const appointmentId = remoteMessage?.data?.appointmentId
      // console.log(appointmentId, '============>')
      props.navigation.navigate('Appointments')
    }
  }
  const processNotificationFront = (remoteMessage) => {
    const messageType = remoteMessage?.data?.type
    if (messageType == NotificationTypes.MESSAGE) {
      // const roomId = remoteMessage?.data?.roomId
      // console.log(roomId)
      // props.navigation.navigate('Chat', { roomId })
    }
  }
  useEffect(() => {
    saveToken()
    const sub = props.navigation.addListener('focus', () => {
      getTodaysAppointments()
    })
    clearInterval(window.checkStatus)
    window.checkStatus = setInterval(() => checkBreakStatus(), 1000)
    return () => {
      sub
      clearInterval(window.checkStatus)
    }
  }, []);
  const saveToken = async () => {
    const fcm = await messaging().getToken();
    await saveData('Users', user?.id, { fcm })
    dispatch(login({
      ...user,
      fcm
    }))
  }
  const getTodaysAppointments = async () => {
    try {
      let todaysAppointments = []
      const appts = await getAppointments(UserTypes.BARBER)
      const today = moment().format('DD-MM-YYYY')
      appts.map(item => {
        const apptDate = moment(item?.dateMoment.toDate()).format('DD-MM-YYYY')
        if (apptDate == today) {
          todaysAppointments.push(item)
        }
      })
      setAppointments(todaysAppointments)
    } catch (error) {
      error.message
    }
  }
  const createRoom = async (item) => {
    const roomObj = {
      roomId: item.customerId + '_' + user.id,
      barberId: user.id,
      barberDetails: user,
      customerId: item.customerId,
      customerDetails: item.customerDetails,
      barberAvatar: item?.barberDetails?.Image?.imageUrl ? item?.barberDetails.Image.imageUrl : '',
      customerAvatar: '',
      lastUpdated: moment().toISOString()
    }
    try {
      await setChatRoom(roomObj)
      props.navigation.navigate('Chat', { roomId: roomObj.roomId })
      return roomObj
    } catch (error) {
      console.log(error.message)
      setLoading(false)
    }
  }
  const getDaysLeft = (dateMoment) => {
    const apptDate = dateMoment.toDate()
    const duration = moment.duration(moment(apptDate).diff(moment())).asDays().toFixed(0)
    const daysLeft = duration + ' days left'
    if (duration < 0) {
      return false
    }
    if (duration == 0) {
      return 'Today'
    }
    return daysLeft
  }
  const checkBreakStatus = async () => {
    try {
      setDateTimeString(moment().format('dddd, DD MMMM, hh:mm a'))
      if (user?.breakTime) {
        const fromTime = userRef.current?.breakTime?.fromMoment
        const toTime = userRef.current?.breakTime?.toMoment

        const minutes = moment.duration(toTime - moment().valueOf()).minutes()
        const hrs = moment.duration(toTime - moment().valueOf()).hours()
        const secs = moment.duration(toTime - moment().valueOf()).seconds()

        const minS = minutes.toString().length == 1 ? '0' + minutes : minutes
        const hrsS = hrs.toString().length == 1 ? '0' + hrs : hrs
        const secsS = secs.toString().length == 1 ? '0' + secs : secs
        setTimeLeft(hrsS + " : " + minS + " : " + secsS)
        if (moment().valueOf() > fromTime && moment().valueOf() < toTime) {
          setworkBreak(true)
        } else {
          setworkBreak(false)
        }
      } else {
        setworkBreak(false)
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  const takeBreak = async () => {
    if (from == '') {
      setFromError('Please enter start time')
      return
    }
    setFromError('')
    if (to == '') {
      setToError('Please enter start time')
      return
    }
    setToError('')
    clearInterval(window.checkStatus)
    try {
      setBreakLoading(true);
      const breakObj = {
        from,
        to,
        toMoment: moment(toMoment).valueOf(),
        fromMoment: moment(fromMoment).valueOf()
      };
      await saveData('Users', auth().currentUser.uid, { breakTime: breakObj });
      dispatch(login({
        ...user,
        breakTime: {
          fromMoment: breakObj?.fromMoment,
          toMoment: breakObj?.toMoment
        }
      }))
      setBreakLoading(false);

    } catch (error) {
      console.log(error.message);
      setBreakLoading(false);
    }
    setModalVisible(false);
    setworkBreak(true);
    window.checkStatus = setInterval(() => checkBreakStatus(), 1000)
  }
  const resumeWork = async () => {
    try {
      clearInterval(window.checkStatus)
      await endBreak(auth().currentUser.uid)
      setworkBreak(false)
      dispatch(login({
        ...user,
        breakTime: {
          toMoment: 10000,
          fromMoment: 10000,
        }
      }))
      setresumeModalVisible(false)
      window.checkStatus = setInterval(() => checkBreakStatus(), 1000)
    } catch (error) {
      console.log(error.message)
    }
    // setresumeModalVisible(false), setworkBreak(false);
  };
  const renderAppointments = ({ item }) => (
    <ScheduleCard
      onpressScheuledCard={() =>
        props.navigation.navigate('CustomerAppoinmentBarber', { appointmentDetails: item })
      }
      barberName={item?.barberDetails?.FirstName + ' ' + item?.barberDetails?.LastName}
      cuttingName={item?.hairStyle}
      scheduledTime={moment(item.dateMoment.toDate()).format('dddd, DD MMMM, hh:mm a')}
      additionalNotes={item?.notes}
      timeLeft={getDaysLeft(item.dateMoment)}
      appointmentImage={item.appointmentImage}
      onpressMessage={() => createRoom(item)}
    />
  );
  const onDateTimePick = (date) => {
    if (pickerMode == 0) {
      console.log('From pressed', date);
      setFrom(moment(date).format('hh:mm a ddd, MMM, YYYY'));
      setFromMoment(date)
    } else {
      console.log('To pressed', date);
      setTo(moment(date).format('hh:mm a ddd, MMM, YYYY'));
      setToMoment(date)
    }
    setDatePickerVisible(false);
  };
  const onToPress = () => {
    setPickerMode(1);
    setDatePickerVisible(true);
  };
  const onFromPress = () => {
    setPickerMode(0);
    setDatePickerVisible(true);
  };
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() => (
        <Header
          leadingIcon={'menu'}
          midLogo
          onPressLeadingIcon={() => props.navigation.openDrawer()}
        />
      )}>
      <View style={styles.mainViewContainer}>
        <WelcomeBarberText
          date={dateTimeString}
          appointments={appointments.length}
        />
        {/* <HorizontalLine lineColor={{ width: width(90), marginTop: height(2) }} /> */}
        {/* {workBreak ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: height(2),
            }}>
            <Text style={styles.whiteText}>
              You are on break
              {user.breakTime && <Text style={styles.white50}> ({moment(user.breakTime.fromMoment).format('h:mm a')} - {moment(user.breakTime.toMoment).format('h:mm a')})</Text>}
            </Text>
            <Text style={styles.whiteText}>Time left: {timeLeft}</Text>
            <Button
              onPress={() => setresumeModalVisible(true)}
              title={'Resume work right now'}
            />
          </View>
        ) : (
          <Button
            containerStyle={styles.breakBtn}
            onPress={() => setModalVisible(true)}
            title={'Take a break'}
          />
        )} */}
        {/* <HorizontalLine lineColor={{ width: width(90) }} /> */}
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Todays Appointments</Text>
          <HighlightedText
            text={'View All'}
            containerStyle={styles.yellowText}
            onPress={() => props.navigation.navigate('TodaysAppointmentBarber')}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appointments}
          keyExtractor={(item) => item.id}
          renderItem={renderAppointments}
        />
      </View>
      <InputModal
        isVisible={modalVisible}
        breakLoading={breakLoading}
        onClose={() => setModalVisible(false)}
        modalTitle={'Take a break'}
        firstLabel={'From'}
        secondLabel={'To'}
        firstValue={from}
        secondValue={to}
        buttonLine
        firstButtonTitle={'Take a break'}
        secondButtonTitle={'Cancel'}
        onpressFirstButton={() => takeBreak()}
        onpressSecondButton={() => setModalVisible(false)}
        onFromPress={onFromPress}
        onToPress={onToPress}
        fromError={fromError}
        toError={toError}
      />
      <CustomModal
        isVisible={resumeModalVisible}
        onClose={() => setresumeModalVisible(false)}
        buttonLine
        firstButtonTitle={'Resume'}
        secondButtonTitle={'No'}
        onpressFirstButton={() => resumeWork()}
        onpressSecondButton={() => setresumeModalVisible(false)}
        iconName={'closecircle'}
        description={'Do you really want to resume the work?'}
      />
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="datetime"
        onConfirm={onDateTimePick}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ScreenWrapper>
  );
}
