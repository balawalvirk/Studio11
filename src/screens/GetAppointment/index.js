import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import { height, width } from 'react-native-dimension'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment'
import Entypo from 'react-native-vector-icons/Entypo'
import ModalDropdown from 'react-native-modal-dropdown';
import { checkBarberAvailablity, getAppointments, setAppointment } from '../../firebaseConfig';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { AppointmentStatus } from '../../utills/Enums';
import { useDispatch, useSelector } from 'react-redux';
import { setAppointments } from '../../Redux/Actions/Customer';
export default function GetAppointment(props) {
  const { hairStyles, barberDetails } = props.route.params
  const dispatch = useDispatch()
  const user = useSelector(state => state.Auth.user)
  const [showPicker, setShowPicker] = useState(false)
  const [notes, setNotes] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [selectedCut, setSelectedCut] = useState(hairStyles[0].CuttingTitle)

  const [date, setDate] = useState('')
  const [dateMoment, setDateMoment] = useState('')
  useEffect(() => {
  }, [])
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
      isAvailable = await checkBarberAvailablity(barberDetails.id, dateMoment)
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
        const updatedAppointment = await getAppointments()
        dispatch(setAppointments(updatedAppointment))
        props.navigation.goBack()
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
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header
        headerTitle={'Get an appointment'}
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
      }>
      <View style={styles.mainViewContainer}>
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
    </ScreenWrapper>
  );
};
