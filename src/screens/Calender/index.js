import React, { useState } from 'react';
import { View, FlatList, Text,TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import HorizonLine from '../../components/HorizontalLine';
import { height, width } from 'react-native-dimension';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import moment from 'moment';
import ScheduledAppointmentCard from '../../components/ScheduledAppointmentCard';
import ScheduleCard from '../../components/ScheduleCard';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';
export default function Calender(props) {
  const user = useSelector((state) => state.Auth.user);
  const [items, setItems] = useState({});
  const dispatch = useDispatch();
  const scheduledAppointments = [
    {
      id: '1',
      barberName: 'Michael Fox',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Sunday, 07 March, 06:16 AM',
      Notes: 'Delectus voluptas qui est delectus recusandae eveniet assumenda fuga earum.',
      appointmentImage: require('../../assets/images/1.png'),
      timeLeft: '3 days left',
    },
    {
      id: '2',
      barberName: 'Tomas Ernser',
      cuttingName: 'Crew Cut',
      scheduledTime: 'Saturday, 09 January, 10:42 AM',
      Notes: 'Iste eos dolores.',
      appointmentImage: require('../../assets/images/2.png'),
      timeLeft: '3 days left',
    }
  ];
  const  loadItems=(day)=> {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
         items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
           items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
     setItems( newItems
      );
    }, 1000);
  }
 const renderItem=(item) =>{
    return (
      <TouchableOpacity
        testID={'testIDs.agenda.ITEM'}
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );}
    
 const renderEmptyDate=() =>{
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

 const rowHasChanged=(r1, r2)=> {
    return r1.name !== r2.name;
  }

 const timeToString = (time) =>{
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Calender'} leadingIcon={'menu'}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />}>
      <View style={styles.mainViewContainer}>
        {/* <CalendarStrip
          style={{ height: height(10), width: '90%' }}
          calendarHeaderStyle={{ color: AppColors.white }}
          calendarColor={AppColors.headerColor}
          dateNumberStyle={{ color: AppColors.white }}
          dateNameStyle={{ color: AppColors.white }}
          highlightDateNumberContainerStyle={styles.highlightedDay}
          highlightDateNumberStyle={{ color: AppColors.white }}
          highlightDateNameStyle={{ color: AppColors.white }}
          scrollable={'true'}
          iconStyle={{ display: 'none' }}
          minDate={moment()}
          onDateSelected={(date) => console.log(date)} /> */}
        {/* <Calendar
          enableSwipeMonths={true}
          headerStyle={{
            backgroundColor: AppColors.textColor,
            alignSelf: 'center',
            width: width(90)
          }}
          markingType={'simple'}

          theme={{
            calendarBackground: AppColors.cardColor,
            textSectionTitleColor: AppColors.primaryGold,
            textSectionTitleDisabledColor: AppColors.white50,
            selectedDayBackgroundColor: AppColors.primaryGold,
            selectedDayTextColor: AppColors.black,
            todayTextColor: AppColors.primaryGold,
            dayTextColor: AppColors.white,
            textDisabledColor: AppColors.white50,
            dotColor: 'red',
            selectedDotColor: '#ffffff',
            arrowColor: AppColors.white50,
            disabledArrowColor: AppColors.white09,
            monthTextColor: AppColors.white,
            indicatorColor: AppColors.white50,
          }}
          style={{
            width: width(90)
          }}
          onDayPress={(day) => { console.log('selected day', day) }}
        /> */}
       <Agenda
        testID={'testIDs.agenda.CONTAINER'}
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2017-05-16'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#43515c'},
        //    '2017-05-09': {textColor: '#43515c'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        // hideExtraDays={false}

        style={{width:'100%'}}
      />
    
        {/* <HorizonLine lineColor={{ width: width(90) }} />
        <View style={styles.headingContainer}>
          <Text style={styles.whiteText}>
            Friday, 30 May, 2021  ({scheduledAppointments.length})
          </Text>
        </View> */}
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={scheduledAppointments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <ScheduleCard
                scheuledCardStyle={{ width: width(90) }}
                // onpressScheuledCard={() => props.navigation.navigate('CustomerAppoinmentBarber')}
                barberName={item.barberName}
                cuttingName={item.cuttingName}
                scheduledTime={item.scheduledTime}
                additionalNotes={item.Notes}
                timeLeft={item.timeLeft}
                appointmentImage={item.appointmentImage}
              // onpressMessage={() => props.navigation.navigate('Chat')}
              />
            );
          }}
        /> */}
      </View>

    </ScreenWrapper>
  );
};
