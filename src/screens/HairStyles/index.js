import React, { useState, useEffect } from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { manageCuttingImages } from '../../dummyData';
import firestore from '@react-native-firebase/firestore'
import { getAllOfCollection } from '../../firebaseConfig'
export default function HairStyles(props) {
  const [hairStyles, setHairStyles] = useState([])
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const cuttings = await getAllOfCollection('Cuttings')
      setHairStyles(cuttings)
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderStyle = ({ item }) =>
    <HairStyle
      onPress={() => props.navigation.navigate('HairStylesBarber', { cutType: item.CuttingTitle })}
      containerStyle={styles.hairStyle}
      cuttingImage={{ uri: item?.CuttingImage }}
      cuttingTitle={item?.CuttingTitle} />

  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} headerTitle={'Hair Styles'} />
      <View style={styles.mainViewContainer}>
        <FlatList
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
          data={hairStyles}
          keyExtractor={item => item.Id}
          renderItem={renderStyle}
        />
      </View>
    </ScreenWrapper>
  );
};
