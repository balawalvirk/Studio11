import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { height } from 'react-native-dimension';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import StylerCard from '../../components/StylerCard';
import { stylersData } from '../../dummyData';
import { getBarberFromCut } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function HairStylesBarber(props) {
  const { cutType } = props.route.params
  const [barbers, setBarbers] = useState([])
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const barberList = await getBarberFromCut(cutType)
      console.log(barberList)
      setBarbers(barberList)
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderBarber = ({ item }) =>
    <StylerCard
      onPress={() => props.navigation.navigate('BarberProfile', { barberId: item.id })}
      stylerName={item.FirstName + ' ' + item.LastName}
      Haircuts={item.HairCutCount}
      ratings={item.Rating.toFixed(1)}
      price={'$45'}
      styleImage={{ uri: item?.Image?.imageUrl }}
    />

  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} headerTitle={cutType} />
      <View style={[styles.mainViewContainer]}>
        <Text style={styles.heading}>Barbers</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          data={barbers}
          renderItem={renderBarber}
          keyExtractor={item => item.id}
        />
      </View>
    </ScreenWrapper>
  );
};
