import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, ActivityIndicator } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { login } from '../../Redux/Actions/Auth';
import { removeFromArray } from '../../firebaseConfig';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth'

export default function DeleteHairStyles(props) {
  const user = useSelector(state => state.Auth.user)
  const [record, setrecord] = useState(user?.Cuttings ?? [])
  const [isLoading, setLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const arr = user?.Cuttings
    let temp = []
    arr.map(item => {
      temp.push({
        ...item,
        isSelected: false
      })
    })
    setrecord(temp)
  }, [])
  const onPressHairStyle = (item) => {
    let arr = [...record]
    let findIndex = arr.findIndex((data) => data.Id == item.Id)
    arr[findIndex].isSelected = !arr[findIndex].isSelected
    setrecord(arr)
  }
  const renderItem = ({ item }) => {
    return (
      <HairStyle containerStyle={styles.hairContainer}
        cuttingImage={{ uri: item?.CuttingImage }}
        cuttingTitle={item?.CuttingTitle}
        onPress={() => onPressHairStyle(item)}
        checkicon
        iconName={item?.isSelected ? 'check-box-outline' : 'checkbox-blank-outline'} />
    );
  }
  const onDeleteItem = async () => {
    setLoading(true)
    let temp = [...record]
    let newArr = []
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].isSelected) {
        const picRef = storage().ref(temp[i].imageRef)
        try {
          await picRef.delete()
          await removeFromArray('Users', auth().currentUser.uid, 'Cuttings', i)
          setLoading(false)
        } catch (error) {
          console.log(error);
          setLoading(false)
        }
        setLoading(false)
      } else {
        newArr.push(temp[i])
      }
    }
    dispatch(login({
      ...user,
      Cuttings: newArr
    }))
    setrecord(newArr)
    setLoading(false)
  }
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'x'} onPressLeadingIcon={() => props.navigation.goBack()}
        headerTitle={'Select items'}
        renderIconRight={() => <View ><TouchableOpacity
          onPress={() => onDeleteItem()}>
          <Image source={require('../../assets/images/binIcon.png')}
            style={{ width: width(5), height: width(5) }} resizeMode='contain' /></TouchableOpacity>
        </View>}
      />
      <View style={styles.mainViewContainer}>
        {!isLoading ? <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          contentContainerStyle={{ paddingHorizontal: width(6), paddingBottom: height(10) }}
          numColumns={2}
          data={record}
          keyExtractor={item => item.Id}
          renderItem={renderItem}
        /> :
          <ActivityIndicator size={'large'} color={AppColors.primaryGold} />
        }
      </View>
    </ScreenWrapper>
  );
};
