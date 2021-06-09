import React, {useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import {height, width} from 'react-native-dimension';
import Appointments from '../Appointments';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import InputModal from '../../components/inputModal';
import CustomModal from '../../components/customModal';
import WelcomeBarberText from '../../components/WelcomeBarberText';
import ScheduleCard from '../../components/ScheduleCard';
import moment from 'moment';
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
  const [resumeModalVisible, setresumeModalVisible] = useState(false);
  const [workBreak, setworkBreak] = useState(false);
  const takeBreak = () => {
    setModalVisible(false), setworkBreak(true);
  };
  const resumeWork = () => {
    setresumeModalVisible(false), setworkBreak(false);
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
        <HorizontalLine lineColor={{width: width(90), marginTop: height(2)}} />
        {workBreak ? (
          <View
            style={{
              alignItems: 'center',
              marginTop: height(2),
            }}>
            <Text style={styles.whiteText}>
              You are on break
              <Text style={styles.white50}>(2:00 PM — 7:00 PM)</Text>
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
        <HorizontalLine lineColor={{width: width(90)}} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Today's Schedule (9 AM - 10 AM)</Text>
          <HighlightedText
            text={'View all for today'}
            containerStyle={styles.yellowText}
            onPress={() => props.navigation.navigate('TodaysAppointmentBarber')}
          />
        </View>

        <FlatList
          // contentContainerStyle={{ paddingHorizontal: width(4), }}
          showsVerticalScrollIndicator={false}
          data={scheduledAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
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
          }}
        />
      </View>
      <InputModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalTitle={'Take a break'}
        firstLabel={'From'}
        secondLabel={'To'}
        firstValue={'6:00 PM'}
        secondValue={'7:00 PM'}
        buttonLine
        firstButtonTitle={'Take a break'}
        secondButtonTitle={'Cancel'}
        onpressFirstButton={() => takeBreak()}
        onpressSecondButton={() => setModalVisible(false)}
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
    </ScreenWrapper>
  );
}
