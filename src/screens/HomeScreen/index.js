import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
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
export default function HomeScreen(props) {
  const cuttingImages = [
    {
      id: '1',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b1.png'),
    },
    {
      id: '2',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b2.png'),
    },
    {
      id: '3',
      title: 'Low Fade',
      image: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '4',
      title: 'Mid Fade',
      image: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '5',
      title: 'High Fade',
      image: require('../../assets/images/barbers/b5.png'),
    },
    {
      id: '6',
      title: 'Side Part',
      image: require('../../assets/images/barbers/b6.png'),
    },
  ];
  const stylersData = [
    {
      id: '1',
      title: 'Dorris Ortiz',
      cuttings: '415 Haircuts',
      rating: '4.7',
      price: '$83',
      styleImage: require('../../assets/images/cuttings/1.png'),
    },
    {
      id: '2',
      title: 'Emmy Daugherty',
      cuttings: '193 Haircuts',
      rating: '4.5',
      price: '$38',
      styleImage: require('../../assets/images/cuttings/2.png'),
    },
    {
      id: '3',
      title: 'Estefania Altenwerth',
      cuttings: '258 Haircuts',
      rating: '4.2',
      price: '$64',
      styleImage: require('../../assets/images/cuttings/3.png'),
    },
    {
      id: '4',
      title: 'Molly Wintheiser',
      cuttings: '166 Haircuts',
      rating: '4.7',
      price: '$64',
      styleImage: require('../../assets/images/cuttings/4.png'),
    },
    {
      id: '5',
      title: 'Mrs. Gabrielle Pagac',
      cuttings: '395 Haircuts',
      rating: '3.5',
      price: '$70',
      styleImage: require('../../assets/images/cuttings/5.png'),
    },
    {
      id: '6',
      title: 'Britney Mayert',
      cuttings: '411 Haircuts',
      rating: '4.5',
      price: '$77',
      styleImage: require('../../assets/images/cuttings/6.png'),
    },
    {
      id: '7',
      title: 'Ottis Hermiston',
      cuttings: '327 Haircuts',
      rating: '4.0',
      price: '$33',
      styleImage: require('../../assets/images/cuttings/7.png'),
    },
    {
      id: '8',
      title: 'Marilyne Boyer DDS',
      cuttings: '121 Haircuts',
      rating: '4.2',
      price: '$68',
      styleImage: require('../../assets/images/cuttings/8.png'),
    },

  ];
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
    headerUnScrollable={()=> <Header leadingIcon={'menu'} midLogo onPressLeadingIcon={() => props.navigation.openDrawer()} />}>
     
      <View style={styles.mainViewContainer}>
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Appointments</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate(Appointments)} />
        </View>
        <AppointmentCard
        onpressAppointmentcard={()=>props.navigation.navigate('AppointmentDetails')} barberName={'Dorris Ortiz'} cuttingName={'Crew Cut'}
          appointmentTime={'Monday, 13th March, 3:00 PM'} timeLeft={'3 days left'}
          appointmentImage={require('../../assets/images/cuttings/1.png')} />
        <HorizontalLine />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Popular Hair Styles</Text>
          <HighlightedText text={'View all'} onPress={() => props.navigation.navigate('HairStyles')} />
        </View>
        <FlatList
          horizontal={true} 
          contentContainerStyle={{paddingHorizontal: width(4), }}
          showsHorizontalScrollIndicator={false}
          data={cuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle onPress={()=>props.navigation.navigate('HairStylesBarber')} cuttingImage={item.image} cuttingTitle={item.title} />
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
              <StylerCard onPress={()=>props.navigation.navigate('BarberProfile')}
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