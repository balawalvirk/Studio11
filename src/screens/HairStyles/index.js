import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
export default function HairStyles(props) {
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
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '4',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '5',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b5.png'),
    },
    {
      id: '6',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b6.png'),
    },
    {
      id: '7',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b1.png'),
    },
    {
      id: '8',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b2.png'),
    },
    {
      id: '9',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '10',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '11',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b5.png'),
    },
    {
      id: '12',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b6.png'),
    },
  ];
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()}  headerTitle={'Hair Styles'} />
      <View style={styles.mainViewContainer}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between',paddingVertical:height(2) }}
          contentContainerStyle={{ paddingHorizontal: width(6),
            paddingBottom: height(10) }}
          numColumns={2}
          data={cuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle onPress={()=>props.navigation.navigate('HairStylesBarber')}  containerStyle={{width:width(40),height:width(40)}} cuttingImage={item.image} cuttingTitle={item.title} />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
