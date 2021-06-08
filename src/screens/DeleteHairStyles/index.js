import React, { useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useSelector } from 'react-redux';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function DeleteHairStyles(props) {
  const user = useSelector(state => state.Auth.user)
  const [record, setrecord] = useState(user?.Cuttings ?? [])
  const [checked, setchecked] = useState([])
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'x'} onPressLeadingIcon={() => props.navigation.goBack()}
        headerTitle={'Select items'}
        renderIconRight={() => <View ><TouchableOpacity
          onPress={() => props.navigation.goBack()}>
          <Image source={require('../../assets/images/binIcon.png')}
            style={{ width: width(5), height: width(5) }} resizeMode='contain' /></TouchableOpacity>
        </View>}
      />
      <View style={styles.mainViewContainer}>
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          contentContainerStyle={{ paddingHorizontal: width(6), paddingBottom: height(10) }}
          numColumns={2}
          data={record}
          keyExtractor={item => item.Id}
          renderItem={({ item }) => {
            return (
              <HairStyle containerStyle={{ width: width(40), height: width(40) }} cuttingImage={{ uri: item.CuttingImage }} cuttingTitle={item.CuttingTitle}
                onPress={() => {
                  let arr = [...record]
                  let findIndex = arr.findIndex((data) => data.Id == item.Id)
                  arr[findIndex].isSelected = !arr[findIndex].isSelected
                  setrecord(arr)
                  console.log('id is ========================>' + findIndex)
                }}
                checkicon
                iconName={item.isSelected ? 'check-box-outline' : 'checkbox-blank-outline'} />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
