import React, {useEffect, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import AppointmentCard from '../../components/AppointmentCard';
import HairStyle from '../../components/HairStyle';
import StylerCard from '../../components/StylerCard';
import HorizontalLine from '../../components/HorizontalLine';
import {height, width} from 'react-native-dimension';
import Appointments from '../Appointments';
import AppColors from '../../utills/AppColors';
import {manageCuttingImages, stylersData} from '../../dummyData';
import {getBarbers} from '../../firebaseConfig';
export default function HomeScreen(props) {
  const [barbers, setBarbers] = useState([]);
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    const barberList = await getBarbers();
    console.log(barberList.length);
    setBarbers(barberList);
  };
  const renderStylers = ({item}) => {
    return (
      <StylerCard
        onPress={() => props.navigation.navigate('BarberProfile')}
        stylerName={item.FirstName + ' ' + item.LastName}
        Haircuts={item.HairCutCount + ' Haircuts'}
        ratings={item.Rating + ' (' + item.RatingCount + ') reviews'}
        price={'$50'}
        styleImage={
          item?.Image?.imageUrl
            ? {uri: item?.Image?.imageUrl}
            : require('../../assets/images/1.png')
        }
      />
    );
  };
  const renderHairStyle = ({item}) => {
    return (
      <HairStyle
        containerStyle={styles.hairContainer}
        onPress={() => props.navigation.navigate('HairStylesBarber')}
        cuttingImage={item.image}
        cuttingTitle={item.title}
      />
    );
  };
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
        <View style={[styles.textRow, {marginTop: height(1.5)}]}>
          <Text style={styles.whiteText}>Appointments</Text>
          <HighlightedText
            text={'View all'}
            onPress={() => props.navigation.navigate(Appointments)}
          />
        </View>
        <AppointmentCard
          onpressAppointmentcard={() =>
            props.navigation.navigate('AppointmentDetails')
          }
          barberName={'Dorris Ortiz'}
          cuttingName={'Crew Cut'}
          appointmentTime={'Monday, 13th March, 3:00 PM'}
          timeLeft={'3 days left'}
          appointmentImage={require('../../assets/images/cuttings/1.png')}
        />
        <View style={styles.dash} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Popular Hair Styles</Text>
          <HighlightedText
            text={'View all'}
            onPress={() => props.navigation.navigate('HairStyles')}
          />
        </View>
        <FlatList
          horizontal={true}
          contentContainerStyle={{paddingHorizontal: width(4)}}
          showsHorizontalScrollIndicator={false}
          data={manageCuttingImages}
          keyExtractor={(item) => item.id}
          renderItem={renderHairStyle}
        />
        <View style={styles.dash} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Our Stylers</Text>
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
