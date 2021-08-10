import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalDropdown from 'react-native-modal-dropdown';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import InputField from '../../components/InputField';
import ScreenWrapper from '../../components/ScreenWrapper';
import { checkBarberAvailablity, getAppointments, getAppointmentsById, setAppointment } from '../../firebaseConfig';
import { setAppointments } from '../../Redux/Actions/Customer';
import AppColors from '../../utills/AppColors';
import { AppointmentStatus, UserTypes } from '../../utills/Enums';
import styles from './styles';
import CustomModal from '../../components/customModal'
import { Agenda } from 'react-native-calendars';
import { FlatList } from 'react-native-gesture-handler';
import { sendAppointmentNotification } from '../../utills/Api';

export default function GetAppointment(props) {
  const { hairStyles, barberDetails } = props.route.params
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const [showPicker, setShowPicker] = useState(false)
  const [notes, setNotes] = useState('')
  const [appointments, setBarberAppointments] = useState({})
  const [appts, setAppts] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCut, setSelectedCut] = useState(hairStyles[0].CuttingTitle)
  const [isSelected, setiselected] = useState(false);

  const [date, setDate] = useState('')
  const [dateMoment, setDateMoment] = useState('')
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const res = await getAppointmentsById(barberDetails?.id)
      setAppts(sortByDate(res))
      let obj = {}
      res.map(item => {
        obj[moment(item.dateMoment.toDate()).format('YYYY-MM-DD')] = res.filter(obj => moment(obj.dateMoment.toDate()).format('YYYY-MM-DD') == moment(item.dateMoment.toDate()).format('YYYY-MM-DD'))
      })
      setBarberAppointments(obj)
    } catch (error) {
      console.log(error.message)
    }
  }
  const sortByDate = (appointmentArray) => {
    let arr = appointmentArray.filter(item => moment(item?.dateMoment?.toDate()).valueOf() > moment().valueOf())
    arr.sort((a, b) => moment(a?.dateMoment?.toDate()).valueOf() > moment(b?.dateMoment?.toDate()).valueOf())
    return arr
  }
  const handleConfirm = date => {
    setDate(moment(date).format('dddd, Do MMMM, h:mm a'))
    setDateMoment(date)
    setShowPicker(false)
  }
  const getHairStyles = () => {
    let cuts = []
    hairStyles.map(item => {
      cuts.push(item.CuttingTitle)
    })
    return cuts
  }
  const renderPriceRow = (data) =>
    <TouchableOpacity
      disabled
      activeOpacity={0.9}
      onPress={() => console.log(data)}
      style={styles.priceContainer}>
      <Text style={styles.rowText}>{data}</Text>
    </TouchableOpacity>

  const onRequestPress = async () => {
    let isAvailable = true
    if (date == '') {
      alert('Please select date and time.')
      return
    }
    setLoading(true)
    try {
      isAvailable = await checkBarberAvailablity(barberDetails.id, dateMoment.valueOf())
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    if (isAvailable) {
      try {
        const appointId = firestore().collection('rnd').doc().id
        const appointment = {
          id: appointId,
          hairStyle: selectedCut,
          date: date,
          dateMoment: dateMoment,
          timestamp: firestore.FieldValue.serverTimestamp(),
          notes: notes ?? '',
          barberId: barberDetails.id,
          barberDetails: barberDetails,
          customerId: auth().currentUser.uid,
          customerDetails: user,
          status: AppointmentStatus.PLACED,

        }
        await setAppointment(appointment)
        sendAppointmentNotification(appointment?.barberId,
          `${user?.FirstName} has requested an appointment`,
          `at: ${date}`,
          appointId
        )
        const updatedAppointment = await getAppointments()
        dispatch(setAppointments(updatedAppointment))
        setModalVisible(true)
        setTimeout(() => {
          setModalVisible(false)
          props.navigation.goBack()
        }, 1500)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log(error.message)
      }
    } else {
      alert('Barber is on break')
      setLoading(false)
    }
  }
  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  }
  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
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
  var CustomAgenda = useCallback(() => {
    return <Agenda
      testID={'testIDs.agenda.CONTAINER'}
      items={appointments}
      selected={moment().format('YYYY-MM-DD')}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      markingType='custom'
      // hideKnob={false}
      // showClosingKnob={true}
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
  }, [appointments, isSelected])
  const renderAppointment = ({ item }) =>
    <View style={styles.apptContainer}>
      {/* <Text style={{ color: 'white' }}>{moment(item?.dateMoment?.toDate()).format('dddd DD-MMM-YYYY')} at {moment(item?.dateMoment?.toDate()).format('h:mm a')}</Text> */}
      <Text style={styles.golden}>{moment(item?.dateMoment?.toDate()).format('Do')} {moment(item?.dateMoment?.toDate()).format('MMMM')}</Text>
      <Text style={styles.goldenSmall}>at</Text>
      <Text style={styles.goldenSmall}>{moment(item?.dateMoment?.toDate()).format('h:mm A')}</Text>
    </View>
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header
        headerTitle={'Get an appointment'}
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
      }>
      <View style={styles.mainViewContainer}>
        <View style={styles.calendar}>
          <Text style={styles.listTitle}>Barber's upcoming appointments</Text>
          <FlatList
            style={{ marginTop: height(1) }}
            columnWrapperStyle={{ justifyContent: 'space-evenly' }}
            numColumns={3}
            data={appts}
            renderItem={renderAppointment}
            keyExtractor={item => item.id}
          />
        </View>
        <Text style={styles.label}>Select a Hair Style</Text>
        <ModalDropdown
          renderRow={renderPriceRow}
          onSelect={(value) => setSelectedCut(hairStyles[value].CuttingTitle)}
          dropdownStyle={styles.dropDown}
          options={getHairStyles()}>
          <View style={styles.modalConatiner}>
            <Text style={styles.dropText}>{selectedCut}</Text>
            <Entypo name={'chevron-down'} size={width(5)} color={AppColors.primaryGold} />
          </View>
        </ModalDropdown>
        <TouchableOpacity activeOpacity={0.5} onPress={() => setShowPicker(true)}>
          <InputField
            inputStyle={styles.input}
            label={'Time and Date'}
            placeholder={'Monday, 13th March, 3:00 PM'}
            editable={false}
            value={date}
          />
        </TouchableOpacity>
        <InputField
          label={'Additional Notes'}
          multiline
          inputStyle={{ height: 'auto', borderRadius: width(4) }}
          numoflines={15}
          placeholder={'I would like to have coffee while my haircut.'}
          multiline numoflines={5}
          value={notes}
          onChangeText={text => setNotes(text)}
        />
        <Button
          isLoading={isLoading}
          title={'Request an appointment'}
          onPress={onRequestPress}
        />
      </View>
      <DateTimePickerModal
        minimumDate={new Date()}
        isVisible={showPicker}
        mode='datetime'
        onConfirm={handleConfirm}
        onCancel={() => setShowPicker(false)}
      />
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        iconName={'checkcircle'}
        description={'Appointment sent to barber.'}
      />
    </ScreenWrapper>
  );
};
