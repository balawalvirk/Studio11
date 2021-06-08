import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import StylerCard from '../../components/StylerCard';
import { height } from 'react-native-dimension';
import { stylersData } from '../../dummyData';
export default function HairStylesBarber(props) {
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} headerTitle={'Crew Cut'} />
      <View style={[styles.mainViewContainer]}>
        <Text style={styles.heading}>Barbers</Text>
        <FlatList showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: height(2) }}
          contentContainerStyle={{}}
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
