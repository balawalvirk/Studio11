import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import HairStyle from '../../components/HairStyle';
import StylerCard from '../../components/StylerCard';
import HorizontalLine from '../../components/HorizontalLine';
import { width } from 'react-native-dimension';
import Appointments from '../Appointments';
import AppColors from '../../utills/AppColors';
import { manageCuttingImages, stylersData } from '../../dummyData';
export default function HomeScreen(props) {
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header leadingIcon={'menu'} midLogo onPressLeadingIcon={() => props.navigation.openDrawer()} />}>

      <View style={styles.mainViewContainer}>
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Appointments</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate(Appointments)} />
        </View>
        <AppointmentCard
          onpressAppointmentcard={() => props.navigation.navigate('AppointmentDetails')} barberName={'Dorris Ortiz'} cuttingName={'Crew Cut'}
          appointmentTime={'Monday, 13th March, 3:00 PM'} timeLeft={'3 days left'}
          appointmentImage={require('../../assets/images/cuttings/1.png')} />
        <HorizontalLine />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Popular Hair Styles</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate('HairStyles')} />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: width(4), }}
          showsHorizontalScrollIndicator={false}
          data={manageCuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle onPress={() => props.navigation.navigate('HairStylesBarber')} cuttingImage={item.image} cuttingTitle={item.title} />
            );
          }}
        />
        <HorizontalLine />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Our Stylers</Text>
        </View>
        <FlatList
          data={stylersData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <StylerCard onPress={() => props.navigation.navigate('BarberProfile')}
                stylerName={item.title} Haircuts={item.cuttings} ratings={item.rating}
                price={item.price} styleImage={item.styleImage}
              />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};