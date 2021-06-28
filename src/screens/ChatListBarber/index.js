import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { width } from 'react-native-dimension';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { getChatRoomsForBarber } from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';
export default function ChatListBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [rooms, setRooms] = useState([])
  useEffect(() => {
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const rooms = await getChatRoomsForBarber()
      setRooms(rooms)
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderItem = ({ item }) =>
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Chat', { roomId: item.roomId })}//props.navigation.navigate('Chat')
      style={{ alignItems: 'center', width: width(90) }}>
      <View style={styles.messageRow}>
        <View style={styles.messageLeftSection}>
          <Image style={styles.messageDp}
            source={user.Type != UserTypes.CUSTOMER ? (item.customerAvatar == '' ? require('../../assets/images/1.png') : { uri: item.customerAvatar }) : { uri: item.barberAvatar }} />
          <View style={styles.messageDetails}>
            <Text style={styles.userTitle}>{user.Type != UserTypes.CUSTOMER ? item.customerDetails.FirstName + ' ' + item.customerDetails.LastName : item.barberDetails.FirstName}</Text>
            {item.lastMessage != '' && <Text style={styles.messageText}>{item.lastMessage}</Text>}
          </View>
        </View>
        <View style={styles.messageTime}>
          <Text style={styles.messageTimeText}>{moment(item.lastUpdated).format('hh:mm a')}</Text>
        </View>
      </View>
      <HorizontalLine lineWidth={styles.HorizontalLine100} />
    </TouchableOpacity>

  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header leadingIcon={'menu'}
        // onPressLeadingIcon={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        onPressLeadingIcon={() => navigation.openDrawer()}
        headerTitle={'Messages'} />}>

      <View style={styles.mainViewContainer}>

        <FlatList
          data={rooms}
          keyExtractor={item => item.roomId}
          renderItem={renderItem}
        />

      </View>
    </ScreenWrapper>
  );
};
