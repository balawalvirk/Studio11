import React, { useCallback, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import HorizonLine from '../../components/HorizontalLine';
import { height, width } from 'react-native-dimension';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment';
import ScheduledAppointmentCard from '../../components/ScheduledAppointmentCard';
import ScheduleCard from '../../components/ScheduleCard';
import { counterEvent } from 'react-native/Libraries/Performance/Systrace';
import HighlightedText from '../../components/HighlightedText';
export default function Calender(props) {
  const user = useSelector((state) => state.Auth.user);
  const [items, setItems] = useState({});
  const [isSelected, setiselected] = useState(false);
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
  const loadItems = (day) => {
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
      setItems(newItems
      );
    }, 1000);
  }
  const renderItem = (item) => {
    return (
      <TouchableOpacity
        testID={'testIDs.agenda.ITEM'}
        style={[styles.item]}
        onPress={() => {
          setiselected(isSelected => !isSelected);
        }}
      >
        <View>
          <HighlightedText text='Carter Keebler' />
          <Text style={{ color: AppColors.white50 }}>9:19 PM</Text>
          <Text style={{ color: AppColors.white50 }}>{item.name}</Text>
        </View>

        <Icon style={styles.checkIcon}
          name={isSelected ? 'check-box-outline' : 'checkbox-blank-outline'}
        />


      </TouchableOpacity>
    );
  }

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
  var CustomAgenda = useCallback(() => {
    return <Agenda
      testID={'testIDs.agenda.CONTAINER'}
      items={items}
      loadItemsForMonth={loadItems}
      selected={'2021-05-25'}
      // pastScrollRange={1}
      // minDate={moment()}
      // futureScrollRange={1}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      markingType='custom'
      theme={{
        calendarBackground: AppColors.headerColor, //
        agendaKnobColor: AppColors.primaryGold, //agenda knob color where we can drag calender
        agendaTodayColor: AppColors.primaryGold, //agenda today date and day color
        agendaDayNumColor: AppColors.white, //agenda date color in list
        agendaDayTextColor: AppColors.white,  //agenda day text color i.e list day color e.g mon, tu
        selectedDayBackgroundColor: AppColors.primaryGold, // selected day date color bg in calender
        selectedDayTextColor: AppColors.black,    //selected day date color in calender
        dayTextColor: AppColors.white,
        monthTextColor: AppColors.white,
        arrowColor: AppColors.white50,
        todayTextColor: AppColors.primaryGold,    //today date color in calender
        textSectionTitleColor: AppColors.primaryGold,  //days name in calender color
        dotColor: AppColors.transparent,
        selectedDotColor: AppColors.transparent,
        backgroundColor: AppColors.textColor,

      }}
      style={{ width: '100%' }}
    />
  }, [items, isSelected])
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Calender'} leadingIcon={'menu'}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />}>
      <View style={styles.mainViewContainer}>
        <View style={{ width: '100%', height: '100%' }}>
          {CustomAgenda()}
        </View>
        <HorizonLine lineColor={{ width: width(90) }} />
        <View style={styles.headingContainer}>
          <Text style={styles.whiteText}>
            Friday, 30 May, 2021  ({scheduledAppointments.length})
          </Text>
        </View>
        <FlatList
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
        />
      </View>

    </ScreenWrapper>
  );
};
