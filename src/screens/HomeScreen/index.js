import React, { useEffect, useState } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { FlatList as FlatListGesture } from 'react-native-gesture-handler'
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import HairStyle from '../../components/HairStyle';
import StylerCard from '../../components/StylerCard';
import HorizontalLine from '../../components/HorizontalLine';
import { height, width } from 'react-native-dimension';
import Appointments from '../Appointments';
import AppColors from '../../utills/AppColors';
import { manageCuttingImages, stylersData } from '../../dummyData';
import { getAllOfCollection, getBarbers, getPopularCuts } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import moment from 'moment';
export default function HomeScreen(props) {
  const [barbers, setBarbers] = useState([]);
  const [popularStyles, setPopularStyles] = useState([]);
  const appointments = useSelector((state) => state.Customer.appointments);
  const lastIndex = appointments.length - 1
  useEffect(() => {
    loadData();
    console.log(appointments)
  }, []);
  const loadData = async () => {
    const barberList = await getBarbers();
    const hairStyles = await getPopularCuts()
    setPopularStyles(hairStyles)
    setBarbers(barberList);
  };
  const renderStylers = ({ item }) =>
    <StylerCard
      onPress={() => props.navigation.navigate('BarberProfile', {
        barberId: item.id,
      })}
      stylerName={item.FirstName + ' ' + item.LastName}
      Haircuts={item.HairCutCount + ' Haircuts'}
      ratings={item?.Rating?.toFixed(1) + ' (' + item.RatingCount + ' reviews)'}
      price={'$50'}
      styleImage={
        item?.Image?.imageUrl
          ? { uri: item?.Image?.imageUrl }
          : require('../../assets/images/1.png')
      }
    />
  const renderHairStyle = ({ item }) =>
    <HairStyle
      containerStyle={styles.hairContainer}
      onPress={() => props.navigation.navigate('HairStylesBarber', { cutType: item.CuttingTitle })}
      cuttingImage={{ uri: item?.CuttingImage }}
      cuttingTitle={item?.CuttingTitle}
    />
  const getDaysLeft = (dateMoment) => {
    const apptDate = dateMoment.toDate()
    const duration = moment.duration(moment(apptDate).diff(moment())).asDays().toFixed(0)
    const daysLeft = duration + ' days left'
    if (duration < 0) {
      return false
    }
    if (duration == 0) {
      return 'Today'
    }
    return daysLeft
  }
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      headerUnScrollable={() => (
        <Header
          leadingIcon={'menu'}
          midLogo
          onPressLeadingIcon={() => props.navigation.openDrawer()}
        />
      )}
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        {appointments.length > 0 &&
          <>
            <View style={[styles.textRow, { marginTop: height(1.5) }]}>
              <Text style={styles.whiteText}>Appointments</Text>
              <HighlightedText
                text={'View all'}
                onPress={() => props.navigation.navigate(Appointments)}
              />
            </View>
            <AppointmentCard
              onpressAppointmentcard={() => props.navigation.navigate('AppointmentDetails', { appointmentDetails: appointments[lastIndex] })}
              barberName={appointments[lastIndex].barberDetails.FirstName + '' + appointments[lastIndex].barberDetails.LastName}
              cuttingName={appointments[lastIndex].hairStyle}
              appointmentTime={appointments[lastIndex].date}
              timeLeft={getDaysLeft(appointments[lastIndex].dateMoment)}
              appointmentImage={{ uri: appointments[lastIndex]?.barberDetails?.Image?.imageUrl }}
            />
            <View style={styles.dash} />
          </>
        }
        {popularStyles.length > 0 &&
          <>
            <View style={styles.textRow}>
              <Text style={styles.whiteText}>Popular Hair Styles</Text>
              <HighlightedText
                text={'View all'}
                onPress={() => props.navigation.navigate('HairStyles')}
              />
            </View>
            <FlatList
              horizontal={true}

              contentContainerStyle={styles.flatlist}
              showsHorizontalScrollIndicator={false}
              data={popularStyles}
              keyExtractor={(item) => item.Id}
              renderItem={renderHairStyle}
            />
          </>}
        <View style={styles.dash} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Our Barbers</Text>
        </View>
        <FlatList
          data={barbers}
          keyExtractor={(item) => item.id}
          renderItem={renderStylers}
        />
      </View>
    </ScreenWrapper>
  );
}
