import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { manageCuttingImages } from '../../dummyData';
export default function HairStyles(props) {
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} headerTitle={'Hair Styles'} />
      <View style={styles.mainViewContainer}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          contentContainerStyle={{
            paddingHorizontal: width(6)
          }}
          numColumns={2}
          data={manageCuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle onPress={() => props.navigation.navigate('HairStylesBarber')} containerStyle={{ width: width(40), height: width(40) }} cuttingImage={item.image} cuttingTitle={item.title} />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
