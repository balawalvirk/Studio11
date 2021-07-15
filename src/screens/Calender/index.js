import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { height, width } from 'react-native-dimension';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import HorizonLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getAppointments } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';
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
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const appointments = await getAppointments(UserTypes.BARBER)
      let obj = {}
      appointments.map(item => {
        obj[moment(item.dateMoment.toDate()).format('YYYY-MM-DD')] = appointments.filter(obj => moment(obj.dateMoment.toDate()).format('YYYY-MM-DD') == moment(item.dateMoment.toDate()).format('YYYY-MM-DD'))
      })
      setItems(obj)
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderItem = (item) =>
    <TouchableOpacity
      testID={'testIDs.agenda.ITEM'}
      style={[styles.item]}
      onPress={() => {
        setiselected(isSelected => !isSelected);
      }}
    >
      <View>
        <Text style={styles.nameText}>{item?.customerDetails?.FirstName + ' ' + item?.customerDetails?.LastName}</Text>
        <Text style={{ color: AppColors.white50 }}>{moment(item?.dateMoment.toDate()).format('h:mm a')}</Text>
        <Text style={{ color: AppColors.white50 }}>{item?.notes}</Text>
      </View>
    </TouchableOpacity>

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
      // loadItemsForMonth={loadItems}
      selected={moment().format('YYYY-MM-DD')}
      // markedDates={{
      //   [moment().format('YYYY-MM-DD')]: { selected: true, marked: true },
      // }}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      markingType='custom'
      hideKnob={false}
      showClosingKnob={true}
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
      style={{ width: '100%', }}
    />
  }, [items, isSelected])
  return (
    <ScreenWrapper
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Calender'} leadingIcon={'menu'}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />}>
      <View style={styles.mainViewContainer}>
        {CustomAgenda()}
      </View>

    </ScreenWrapper>
  );
};
