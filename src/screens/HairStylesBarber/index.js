import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import StylerCard from '../../components/StylerCard';
import { height, width } from 'react-native-dimension';
export default function HairStylesBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
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
    }
  ];
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} headerTitle={'Crew Cut'} />
      <View style={[styles.mainViewContainer]}>
        <Text style={styles.heading}>Barbers</Text>
        <FlatList showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: height(2) }}
          contentContainerStyle={{ }}
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
