import React, { useEffect, useState } from 'react';
import { Text, View, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { messages } from '../../dummyData';
import { getChatRooms } from '../../firebaseConfig';
import { useSelector } from 'react-redux';
import { UserTypes } from '../../utills/Enums';
import moment from 'moment';
export default function Messages(props) {
  const user = useSelector(state => state.Auth.user)
  const [rooms, setRooms] = useState([])
  const [info, setInfo] = useState({})
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    const sub = props.navigation.addListener('focus', () => {
      loadData()
    })
    return sub
  }, [])
  const loadData = async () => {
    try {
      const rooms = await getChatRooms()
      setRooms(rooms)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }
  }
  const renderRoom = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate('Chat', { roomId: item.roomId })}//props.navigation.navigate('Chat')
        style={{ alignItems: 'center', width: width(90) }}>
        <View style={styles.messageRow}>
          <View style={styles.messageLeftSection}>
            <Image style={styles.messageDp}
              source={{ uri: user.Type != UserTypes.CUSTOMER ? item.customerAvatar : item.barberAvatar }} />
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
    );
  }
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Messages'} />}>

      <View style={styles.mainViewContainer}>
        {!isLoading ? <FlatList
          data={rooms}
          keyExtractor={item => item.lastUpdated.toString()}
          renderItem={renderRoom}
          ListEmptyComponent={() =>
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No ongoing chat</Text>
            </View>}
        /> :
          <View style={styles.emptyContainer}>
            <ActivityIndicator color={AppColors.primaryGold} size={'large'} />
          </View>}
      </View>
    </ScreenWrapper>
  );
};
