import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import HorizonLine from '../../components/HorizontalLine';
import { height } from 'react-native-dimension';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import ScheduledAppointmentCard from '../../components/ScheduledAppointmentCard';
export default function Calender_1(props) {
  const user = useSelector((state) => state.Auth.user);
  const [CurrentMonth, setCurrentMonth] = useState('');
  const dispatch = useDispatch();
  const appointments = [
    {
      id: 1,
      cardTitle: 'Carter Keebler',
      isSelected: false,
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText: '07 PM'
    },
    {
      id: 2,
      cardTitle: 'Miguel Beatty',
      isSelected: false,
      appointmentTime: '2:01 AM',
      appointmentDetails: 'ipsam quia autem autem quae numquam quia aut non ex',
      timeText: '03 AM'
    },
    {
      id: 3,
      cardTitle: 'Chauncey Weber',
      appointmentTime: '9:44 AM',
      isSelected: false,
      appointmentDetails: 'et cumque voluptas veniam dolorem aliquam magni qui consequatur sed',
      timeText: '02 AM'
    },
    {
      id: 4,
      cardTitle: 'Lyla Nienow',
      appointmentTime: '10:15 PM',
      appointmentDetails: 'sunt optio qui nam sit nulla accusantium quaerat soluta sunt',
      timeText:'04 AM'
    },
    {
      id: 5,
      cardTitle: 'Kaci Klocko',
      appointmentTime: '7:56 PM',
      appointmentDetails: 'nemo dolores tenetur architecto omnis voluptas natus laudantium vero voluptatibus',
      timeText:'05 AM'
    },
    {
      id: 6,
      cardTitle: 'Oswaldo Ryan',
      appointmentTime: '3:15 AM',
      appointmentDetails: 'mollitia nemo esse placeat natus expedita possimus cumque quisquam voluptatem',
      timeText:'02 PM'
    },
    {
      id: 7,
      cardTitle: 'Annabelle Okuneva',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'04 AM'
    },
    {
      id: 8,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'12 AM'
    },
    {
      id: 9,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'05 PM'
    },
    {
      id: 10,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'06 PM'
    },
    {
      id: 11,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'04 AM'
    },

  ];
  const appointmentsNext = [
    {
      id: 1,
      cardTitle: 'Lyla Nienow',
      appointmentTime: '10:15 PM',
      appointmentDetails: 'sunt optio qui nam sit nulla accusantium quaerat soluta sunt',
      timeText:'04 AM'
    },
    {
      id: 2,
      cardTitle: 'Kaci Klocko',
      appointmentTime: '7:56 PM',
      appointmentDetails: 'nemo dolores tenetur architecto omnis voluptas natus laudantium vero voluptatibus',
      timeText:'05 AM'
    },
    {
      id: 3,
      cardTitle: 'Oswaldo Ryan',
      appointmentTime: '3:15 AM',
      appointmentDetails: 'mollitia nemo esse placeat natus expedita possimus cumque quisquam voluptatem',
      timeText:'02 PM'
    },
    {
      id: 4,
      cardTitle: 'Annabelle Okuneva',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'04 AM'
    },
    {
      id: 5,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText:'04 AM'
    },

  ];
  const [record, setrecord] = useState(appointments)
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={CurrentMonth} leadingIcon={'menu'}
        actionIcon={'search'} onPressActionIcon={() => props.navigation.navigate('SearchAppointment')}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />
      <View style={styles.mainViewContainer}>
        <CalendarStrip
          style={{ height: height(10), width: '90%' }}
          calendarHeaderStyle={{ color: 'white' }}
          calendarColor={AppColors.headerColor}
          dateNumberStyle={{ color: 'white' }}
          dateNameStyle={{ color: 'white' }}
          highlightDateNumberContainerStyle={styles.highlightedDay}
          highlightDateNumberStyle={{color:AppColors.white}}
          highlightDateNameStyle={{ color: 'white' }}
          scrollable={'true'}
          iconStyle={{display:'none'}}
          minDate={moment()}
          onDateSelected={(date) => console.log(date)}
        />
        <HorizonLine lineColor={{ backgroundColor: AppColors.transparent }} />
        <FlatList
        contentContainerStyle={{paddingBottom:height(28)}}
          data={record}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => {
            return (
              <ScheduledAppointmentCard
                timeText={item.timeText}
                cardTitle={item.cardTitle}
                appointmentTime={item.appointmentTime}
                appointmentDetails={item.appointmentDetails}
                onPress={() => {
                  let arr = [...record]
                  let findIndex = arr.findIndex((data) => data.id == item.id)
                  arr[findIndex].isSelected = !arr[findIndex].isSelected
                  setrecord(arr)
                }}
                iconName={item.isSelected ? 'check-box-outline' : 'checkbox-blank-outline'}
              />
            );
          }}
        />

      </View>

    </ScreenWrapper>
  );
};
