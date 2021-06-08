import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import { useDispatch, useSelector } from 'react-redux';
import AppColors from '../../utills/AppColors';
import Thumbnail from '../../components/Thumbnail';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ThumbnailList } from '../../dummyData'
import storage from '@react-native-firebase/storage'
import { removeFromArray, updateArray } from '../../firebaseConfig';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/app'
import { login } from '../../Redux/Actions/Auth';
export default function SelectDelete(props) {
  const user = useSelector((state) => state.Auth.user)
  const dispatch = useDispatch()
  const [record, setrecord] = useState([])
  const [isLoading, setLoading] = useState(false)
  useEffect(() => {
    const arr = user?.Videos
    let temp = []
    arr.map(item => {
      temp.push({
        ...item,
        isSelected: false
      })
    })
    setrecord(temp)
  }, [])

  const onDeleteItems = async () => {
    setLoading(true)
    let temp = [...record]
    let newArr = []
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].isSelected) {
        const thumbRef = storage().ref(temp[i].thumbRef)
        const videoRef = storage().ref(temp[i].videoRef)
        try {
          await thumbRef.delete()
          await videoRef.delete()
          await removeFromArray('Users', auth().currentUser.uid, 'Videos', i)
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
      Videos: newArr
    }))
    setrecord(newArr)
    setLoading(false)
  }
  const renderItem = ({ item }) => {
    return (
      <Thumbnail reactions editable checkicon
        cardstyle={{ width: width(90) }}
        containerStyle={{ marginVertical: width(2), }}
        thumbnailImage={{ uri: item.videoThumb }}
        videoTitle={item.VideoTitle}
        views={'431'}
        likes={'230'}
        comments={'400'}
        onPress={() => {
          let arr = [...record]
          let findIndex = arr.findIndex((data) => data.Id == item.Id)
          arr[findIndex].isSelected = !arr[findIndex].isSelected
          setrecord(arr)
        }}
        checkicon
        iconName={item.isSelected ? 'check-box-outline' : 'checkbox-blank-outline'} />
    );
  }
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header
        headerTitle={'Select & Delete'}
        leadingIcon={'x'}
        onPressLeadingIcon={() => props.navigation.goBack()}
        renderIconRight={() => <View ><TouchableOpacity
          onPress={() => onDeleteItems()}>
          <Image source={require('../../assets/images/binIcon.png')}
            style={{ width: width(5), height: width(5) }} resizeMode='contain' /></TouchableOpacity>
        </View>}
      />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        {isLoading ?
          <View style={styles.loaderContainer}>
            <ActivityIndicator size={'large'} color={AppColors.primaryGold} />
          </View>
          : <FlatList
            contentContainerStyle={{ paddingVertical: width(8) }}
            data={record}
            keyExtractor={item => item.Id}
            renderItem={renderItem}
          />}
      </View>
    </ScreenWrapper>
  );
};