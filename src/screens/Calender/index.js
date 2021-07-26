import moment from 'moment';
import React, { useRef, useEffect, useState } from 'react';
import { FlatList, SectionList, Text, TouchableOpacity, View } from 'react-native';
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
import MonthPicker from 'react-native-month-year-picker';
import { useCallback } from 'react';

export default function Calender(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch()
  const horizontalRef = useRef(null)
  const [weekArray, setWeekArray] = useState([])
  const [appointments, setAppointments] = useState([])
  const [show, setShow] = useState(false)
  const [pickerDate, setPickerDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState({
    dayNumber: moment().format('DD'),
    dayName: moment().format('dd'),
    month: moment().format('MMMM'),
    year: moment().format('YYYY')
  })

  useEffect(() => {
    loadData(selectedDate.dayNumber + '-' + selectedDate.month + '-' + selectedDate.year)
    getDates(selectedDate.dayNumber + '-' + selectedDate.month + '-' + selectedDate.year)
  }, [selectedDate])
  const loadData = async (date) => {
    try {
      const appts = await getAppointments(UserTypes.BARBER, date)
      let headers = []
      appts.map(item => {
        headers.push(moment(item.dateMoment.toDate()).format('h A'))
      })
      headers = [...new Set(headers)]
      let sectionListData = []
      headers.map(item => {
        let data = []
        appts.map(appt => {
          if (moment(appt.dateMoment.toDate()).format('h A') == moment(item, 'h A').format('h A')) {
            data.push(appt)
          }
        })
        sectionListData.push({
          title: item,
          data
        })
      })
      setAppointments(sectionListData)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getDates = (date) => {
    const startOfMonth = Number(moment(date, 'DD-MMMM-YYYY').startOf('month').format('DD'));
    const endOfMonth = Number(moment(date, 'DD-MMMM-YYYY').endOf('month').format('DD'));
    const month = moment(date, 'DD-MMMM-YYYY').get('month') + 1;
    const year = moment(date, 'DD-MMMM-YYYY').get('year')
    console.log("I'm month", month)
    console.log("I'm year", year)
    console.log("Star&End of Month: ", startOfMonth, endOfMonth)
    let pastArray = []
    for (let i = startOfMonth; i <= endOfMonth; i++) {
      const dateObj = {
        dayName: moment(i + '/' + month + '/' + year, "DD/MM/YYYY").format('dd'),
        dayNumber: i,
      }
      pastArray.push(dateObj)
    }
    let newArray = pastArray.sort((a, b) => a.dayNumber > b.dayNumber)
    const index = newArray.findIndex(item => (item.dayNumber == selectedDate?.dayNumber && item.dayName == selectedDate?.dayName))
    setWeekArray(newArray)
    setTimeout(() => {
      if (index > -1)
        horizontalRef.current.scrollToIndex({ index })
    }, 800)
  }
  const renderWeekRow = ({ item }) =>
    <TouchableOpacity style={styles.weekRow} onPress={() => setSelectedDate({ ...selectedDate, ...item })}>
      <Text style={styles.month}>{item?.dayName}</Text>
      <View style={(item.dayNumber == selectedDate?.dayNumber && item.dayName == selectedDate?.dayName) ? styles.selected : styles.unselected}>
        <Text style={styles.day}>{item?.dayNumber}</Text>
      </View>
    </TouchableOpacity>
  const renderSectionHeader = ({ section }) =>
    <View style={styles.header}>
      <Text style={styles.title}>{section.title}</Text>
    </View>

  const renderItem = ({ item, index, section }) =>
    <View style={styles.item}>
      <Text style={styles.nameText}>{item?.customerDetails?.FirstName + ' ' + item?.customerDetails?.LastName}</Text>
      <Text style={styles.dateText}>{moment(item?.dateMoment?.toDate()).format('h:mm a DD-MMMM-YYYY')} </Text>
      <Text style={styles.description}>{item?.notes == '' ? 'No other details' : item?.notes}</Text>
    </View>
  const showPicker = useCallback((value) => setShow(value), []);
  const onValueChange = useCallback(
    (event, newDate) => {
      console.log(moment(newDate).format('MMMM'))
      showPicker(false)
      setSelectedDate({
        dayNumber: moment(newDate).format('DD'),
        dayName: moment(newDate).format('dd'),
        month: moment(newDate).format('MMMM'),
        year: moment(newDate).format('YYYY')
      })
      setPickerDate(newDate)
    },
    [pickerDate, showPicker],
  );
  const renderEmpty = () =>
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No appointments on {selectedDate.dayNumber + '/' + selectedDate.month + '/' + selectedDate.year}</Text>
    </View>
  return (
    <ScreenWrapper
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header
        headerTitle={selectedDate.month + ' ' + selectedDate.year}
        isCalendar
        leadingIcon={'menu'}
        onDatePress={() => showPicker(true)}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />}>
      <View style={styles.mainViewContainer}>
        <FlatList
          ref={horizontalRef}
          contentContainerStyle={styles.flatlist}
          horizontal
          data={weekArray}
          renderItem={renderWeekRow}
          keyExtractor={item => item.dayNumber + item.dayName}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(data, index) => {
            return {
              index: index,
              length: height(6),
              offset: index * height(6),
            }
          }}
        />
        <SectionList
          sections={appointments}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListEmptyComponent={renderEmpty}
        />
      </View>
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={pickerDate}
          minimumDate={new Date(2000, 5)}
          maximumDate={new Date(2025, 5)}
        />
      )}
    </ScreenWrapper>
  );
};
