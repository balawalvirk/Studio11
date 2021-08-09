import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { height } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from 'react-redux';
import Img from '../../assets/images/barbers/b1.png';
import ChatList from '../../components/ChatList';
import Header from '../../components/Header';
import Input from '../../components/InputField';
import ScreenWrapper from '../../components/ScreenWrapper';
import ShareModal from '../../components/ShareModal';
import { getChatRoomById, getRoomChatList, sendMessage } from '../../firebaseConfig';
import { sendMessageNotificaiton } from '../../utills/Api';
import AppColors from '../../utills/AppColors';
import { UserTypes } from '../../utills/Enums';
import styles from './styles';
export default function Chat(props) {
  const user = useSelector(state => state.Auth.user)
  const listRef = useRef(null)
  const [messages, setMessages] = useState([]);
  const [picture, setPicture] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [roomObj, setRoomObj] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [userType, setUserType] = useState(false) // false == Customer    true == Barber
  const { roomId } = props.route.params
  useEffect(() => {
    if (user.Type == UserTypes.CUSTOMER) {
      setUserType(false)
    } else {
      setUserType(true)
    }
    loadData()
  }, [])
  const loadData = async () => {
    try {
      const room = await getChatRoomById(roomId)
      const chatList = await getRoomChatList(roomId)
      setMessages(chatList)
      setRoomObj(room)
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  const openCamera = () => {
    setShareModal(false)
    ImagePicker.openCamera({
      mediaType: 'photo',
      compressImageQuality: 0.2,
    }).then((image) => {
      setPicture(image.path)
    });
  };
  const openPicker = () => {
    setShareModal(false)
    ImagePicker.openPicker({
      mediaType: 'photo',
      compressImageQuality: 0.2,
    }).then((image) => {
      setPicture(image.path)

    });
  };
  const onSendPress = async () => {
    if (messageText == '') {
      alert('Cant send empty message')
      return
    }
    try {
      const messageId = firestore().collection('rnd').doc().id
      let messageObj = {}
      if (!userType) {
        messageObj = {
          id: messageId,
          senderId: user.id,
          receiverId: roomObj?.barberDetails?.id,
          message: messageText,
          avatarImg: '',
          timestamp: moment().toISOString()
        }
      } else {
        messageObj = {
          id: messageId,
          senderId: user.id,
          receiverId: roomObj?.customerDetails?.id,
          message: messageText,
          avatarImg: roomObj?.barberDetails?.Image?.imageUrl ?? '',
          timestamp: moment().toISOString()
        }
      }
      setMessages(prev => [...prev, messageObj])
      await sendMessage(messageObj, roomId)
      setMessageText('')
      const title = `${user?.FirstName} sent you a message`
      const body = messageText
      console.log('===>', messageObj?.receiverId, title, body)
      sendMessageNotificaiton(messageObj?.receiverId, title, body, roomId)
      setTimeout(() => listRef.current.scrollToEnd(), 600)
    } catch (error) {
      console.log(error.message, 'SEND NOTIF')
    }
  }
  const renderFooter = () =>
    <>
      {picture && <Image source={{ uri: picture }} style={styles.previewImg} />}
      <View style={styles.footerContainer}>
        <Input
          onFocus={() => setTimeout(() => listRef.current.scrollToEnd(), 600)}
          containerStyles={styles.searchInput}
          inputStyle={{ height: height(5.5) }}
          placeholder={'Write a message...'}
          onChangeText={text => setMessageText(text)}
          value={messageText}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={onSendPress}>
          <FontAwesome5 name={'arrow-circle-up'} size={height(3.5)} color={AppColors.primaryGold} />
        </TouchableOpacity>
      </View>
    </>
  return (
    <ScreenWrapper
      headerUnScrollable={() => {
        if (!isLoading) {
          return (
            <Header
              headerTitle={
                !userType ?
                  roomObj?.barberDetails?.FirstName + ' ' + roomObj?.barberDetails?.LastName :
                  roomObj?.customerDetails?.FirstName + ' ' + roomObj?.customerDetails?.LastName
              }
              leadingIcon={'arrow-left'}
              onPressLeadingIcon={() => props.navigation.goBack()} />
          )
        } else {
          return null
        }
      }}
      footerUnScrollable={renderFooter}
      transclucent
    // scrollEnabled
    >
      <View style={styles.container}>
        {isLoading ?
          <View style={styles.loadContainer}>
            <ActivityIndicator size={'large'} color={AppColors.primaryGold} />
          </View>
          : <ChatList
            ref={listRef}
            messages={messages}
            myID={user.id}
          />}
      </View>
    </ScreenWrapper>
  );
};
