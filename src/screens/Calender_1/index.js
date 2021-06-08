import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import HorizonLine from '../../components/HorizontalLine';
import { height, width } from 'react-native-dimension';
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar } from 'react-native-calendars';
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
      timeText: '04 AM'
    },
    {
      id: 5,
      cardTitle: 'Kaci Klocko',
      appointmentTime: '7:56 PM',
      appointmentDetails: 'nemo dolores tenetur architecto omnis voluptas natus laudantium vero voluptatibus',
      timeText: '05 AM'
    },
    {
      id: 6,
      cardTitle: 'Oswaldo Ryan',
      appointmentTime: '3:15 AM',
      appointmentDetails: 'mollitia nemo esse placeat natus expedita possimus cumque quisquam voluptatem',
      timeText: '02 PM'
    },
    {
      id: 7,
      cardTitle: 'Annabelle Okuneva',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText: '04 AM'
    },
    {
      id: 8,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText: '12 AM'
    },
    {
      id: 9,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText: '05 PM'
    },
    {
      id: 10,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText: '06 PM'
    },
    {
      id: 11,
      cardTitle: 'Carter Keebler',
      appointmentTime: '8:19 PM',
      appointmentDetails: 'dolorem dolores ut velit earum esse ab explicabo voluptatum molestias',
      timeText: '04 AM'
    },

  ];
  const [record, setrecord] = useState(appointments)
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={CurrentMonth} leadingIcon={'menu'}
        actionIcon={'search'} onPressActionIcon={() => props.navigation.navigate('SearchAppointment')}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />
      <View style={styles.mainViewContainer}>
        {/* <CalendarStrip
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
        /> */}
        <Calendar
          style={{ width: width(90) }}
          // Initially visible month. Default = Date()
          current={'2021-03-01'}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={'2021-05-10'}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={'2021-05-30'}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => { console.log('selected day', day) }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => { console.log('selected day', day) }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={'yyyy MM'}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => { console.log('month changed', month) }}
          // Hide month navigation arrows. Default = false
          hideArrows={true}
          // Replace default arrows with custom ones (direction can be 'left' or 'right')
          renderArrow={(direction) => (<Arrow />)}
          // Do not show days of other months in month page. Default = false
          hideExtraDays={true}
          // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
          // day from another month that is visible in calendar page. Default = false
          disableMonthChange={true}
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          onPressArrowLeft={subtractMonth => subtractMonth()}
          // Handler which gets executed when press arrow icon right. It receive a callback can go next month
          onPressArrowRight={addMonth => addMonth()}
          // Disable left arrow. Default = false
          disableArrowLeft={true}
          // Disable right arrow. Default = false
          disableArrowRight={true}
          // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
          disableAllTouchEventsForDisabledDays={true}
          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {/*Return JSX*/ }}
          // Enable the option to swipe between months. Default = false
          enableSwipeMonths={true}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: 'monospace',
            textMonthFontFamily: 'monospace',
            textDayHeaderFontFamily: 'monospace',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
            'stylesheet.calendar.header': {
              week: {
                marginTop: 50,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }
            }
          }}
        />
      </View>

    </ScreenWrapper>
  );
};
