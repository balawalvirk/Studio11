import auth from '@react-native-firebase/auth';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
import { saveData } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function BarberHomeScreen(props) {
  const scheduledAppointments = [
    {
      id: '1',
      barberName: 'Michael Fox',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 07 March, 06:16 AM',
      Notes:
        'Delectus voluptas qui est delectus recusandae eveniet assumenda fuga earum.',
      appointmentImage: require('../../assets/images/appointments/a1.png'),
      timeLeft: '3 days left',
    },
    {
      id: '2',
      barberName: 'Tomas Ernser',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Saturday, 09 January, 10:42 AM',
      Notes: 'Iste eos dolores.',
      appointmentImage: require('../../assets/images/appointments/a2.png'),
      timeLeft: '3 days left',
    },
    {
      id: '3',
      barberName: 'Carole Quigley',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 28 March, 09:59 PM',
      Notes: 'Consequatur assumenda earum fuga et quos aperiam quos.',
      appointmentImage: require('../../assets/images/appointments/a3.png'),
      timeLeft: '3 days left',
    },
  ];
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [breakLoading, setBreakLoading] = useState(false);
  const [resumeModalVisible, setresumeModalVisible] = useState(false);
  const [workBreak, setworkBreak] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [from, setFrom] = useState(moment().format('hh:mm a'));
  const [to, setTo] = useState(moment().format('hh:mm a'));
  const [fromMoment, setFromMoment] = useState('');
  const [toMoment, setToMoment] = useState('');
  const [pickerMode, setPickerMode] = useState(0); //0 => from   1=> To
  useEffect(() => {
    setInterval(() => checkBreakStatus(), 5000)
  }, []);
  const checkBreakStatus = async () => {
    try {
      if (user.breakTime) {
        const fromTime = user?.breakTime?.fromMoment
        const toTime = user?.breakTime?.toMoment
        console.log(fromTime, toTime)
        const duration = moment.duration(moment(toTime).diff(fromTime)).asSeconds()
        if (moment().isSameOrAfter(fromTime) && moment().isSameOrBefore(toTime)) {
          setworkBreak(true)
        } else {
          setworkBreak(false)
        }
      } else {
        console.log('NO BREAK OBJ')
      }
    } catch (error) {
      console.log(error.message)
    }
  };
  const takeBreak = async () => {
    try {
      setBreakLoading(true);
      const breakObj = {
        from,
        to,
        toMoment: moment(toMoment).valueOf(),
        fromMoment
      };
      await saveData('Users', auth().currentUser.uid, { breakTime: breakObj });
      dispatch(login({
        ...user,
        breakTime: breakObj
      }))
      setBreakLoading(false);
    } catch (error) {
      console.log(error.message);
      setBreakLoading(false);
    }
    setModalVisible(false);
    setworkBreak(true);
  };
  const resumeWork = () => {
    setresumeModalVisible(false), setworkBreak(false);
  };
  const renderAppointments = ({ item }) => (
    <ScheduleCard
      onpressScheuledCard={() =>
        props.navigation.navigate('CustomerAppoinmentBarber')
      }
      barberName={item.barberName}
      cuttingName={item.cuttingName}
      scheduledTime={item.scheduledTime}
      additionalNotes={item.Notes}
      timeLeft={item.timeLeft}
      appointmentImage={item.appointmentImage}
      onpressMessage={() => props.navigation.navigate('Chat')}
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
          date={moment().format('dddd, DD MMMM, hh:mm a')}
          appointments={'6'}
        />
        <HorizontalLine lineColor={{ width: width(90), marginTop: height(2) }} />
        {workBreak ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: height(2),
            }}>
            <Text style={styles.whiteText}>
              You are on break
              <Text style={styles.white50}> ({moment(user.breakTime.fromMoment).format('h:mm a')} - {moment(user.breakTime.toMoment).format('h:mm a')})</Text>
            </Text>
            <Text style={styles.whiteText}>Time left: 00:18:34</Text>
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
        )}
        <HorizontalLine lineColor={{ width: width(90) }} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Today's Schedule (9 AM - 10 AM)</Text>
          <HighlightedText
            text={'View all for today'}
            containerStyle={styles.yellowText}
            onPress={() => props.navigation.navigate('TodaysAppointmentBarber')}
          />
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={scheduledAppointments}
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
