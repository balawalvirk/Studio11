import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import AppointmentCard from '../../components/AppointmentCard';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
export default function Appointments(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const Appointmentslist = [
    {
      id: '1',
      barberName: 'Cyrus Kihn',
      cuttingName: 'Crew Cut',
      time: 'Monday, 13th March, 3:00 PM',
      timeLeft: '10 days left',
      appointmentImage: require('../../assets/images/cuttings/9.png')
    },
    {
      id: '2',
      barberName: 'Dr. Gabrielle Maggio',
      cuttingName: 'Crew Cut',
      time: 'Monday, 13th March, 3:00 PM',
      timeLeft: '10 days left',
      appointmentImage: require('../../assets/images/cuttings/4.png')
    },
    {
      id: '3',
      barberName: 'Levi Stark',
      cuttingName: 'Crew Cut',
      time: 'Monday, 13th March, 3:00 PM',
      timeLeft: '10 days left',
      appointmentImage: require('../../assets/images/cuttings/10.png')
    }
  ];
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
    headerUnScrollable={()=>  <Header headerTitle={'Appoinments'} leadingIcon={'arrow-left'} onPressLeadingIcon={()=>props.navigation.goBack()} />}>
    
      <View style={styles.mainViewContainer}>

        <FlatList contentContainerStyle={{paddingBottom:height(15)}}
          data={Appointmentslist}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View style={{alignItems:'center'}}>
              <AppointmentCard barberName={item.barberName} cuttingName={item.cuttingName}
                appointmentTime={item.time} timeLeft={item.timeLeft} onpressAppointmentcard={()=>props.navigation.navigate('AppointmentDetails')}
                appointmentImage={item.appointmentImage} style={{verticalmargin:5}} />
                <HorizontalLine lineColor={styles.transparent} />
                </View>
            );
          }}
        />

      </View>
    </ScreenWrapper>
  );
};
