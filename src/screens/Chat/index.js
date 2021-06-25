import React, { useState, useEffect } from 'react';
import {
  GiftedChat, Bubble,
} from 'react-native-gifted-chat';
import { View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors'
import InputField from '../../components/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import Img from '../../assets/images/barbers/b1.png'
import ChatHeader from '../../components/ChatHeader'
import ChatList from '../../components/ChatList'
import ShareModal from '../../components/ShareModal'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Input from '../../components/InputField'
import { useSelector } from 'react-redux';
import { setChatRoom } from '../../firebaseConfig';
import firestore from '@react-native-firebase/firestore'
import database from '@react-native-firebase/database'
import { UserTypes } from '../../utills/Enums';
export default function Chat(props) {
  const user = useSelector(state => state.Auth.user)
  const [messages, setMessages] = useState([
    {
      id: '1',
      senderId: 'xyz',
      receiverId: 'zyx',
      message: 'Hello this is a message',
      // image: 'data:image/jpeg;base64,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',

      avatarImg: Img,
      timestamp: new Date().toDateString()
    },
    {
      id: '2',
      senderId: 'zyx',
      receiverId: 'xyz',
      // image: 'data:image/jpeg;base64,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',

      message: 'Hello this is a message',
      avatarImg: '',
      timestamp: new Date().toDateString()
    },
  ]);
  const [picture, setPicture] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [messageText, setMessageText] = useState('');
  const { barberDetails } = props.route.params
  useEffect(() => {
    if (user.Type == UserTypes.CUSTOMER)
      createRoom()
  }, [])
  const createRoom = async () => {
    const roomObj = {
      barberId: barberDetails.id,
      barberDetails,
      customerId: user.id,
      customerDetails: user,
      lastMessage: '',
      barberAvatar: barberDetails.Image.imageUrl ? barberDetails.Image.imageUrl : '',
      customerAvatar: '',
      lastUpdated: database.ServerValue.TIMESTAMP
    }
    try {
      await setChatRoom(roomObj)
    } catch (error) {
      console.log(error.messageF)
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
    return
    if (messageText == '') {
      showMessage({ message: 'Cant send empty message', type: 'none' })
      return
    }
    const messageId = firestore().collection('rnd').doc().id
    let messageObj = {
      id: messageId,
      senderId: user.id,
      receiverId: user.Type == UserTypes.CUSTOMER ? barberDetails.id : 'xyz',
      message: messageText,
      avatarImg: '',
      timestamp: database.ServerValue.TIMESTAMP
    }
    sendMessage(messageObj)
    setMessages(prev => [...prev, messageObj])
    setMessageText('')
  }
  const renderFooter = () =>
    <>
      {picture && <Image source={{ uri: picture }} style={styles.previewImg} />}
      <View style={styles.footerContainer}>
        {/* <TouchableOpacity onPress={() => setShareModal(true)} style={styles.iconContainer}>
          <Ionicons name={'add-circle'} size={height(3.5)} color={AppColors.primaryGold} />
        </TouchableOpacity> */}
        <Input
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
      headerUnScrollable={() =>
        <Header
          headerTitle={barberDetails.FirstName + ' ' + barberDetails.LastName}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} />}

      footerUnScrollable={renderFooter}
      statusBarColor={AppColors.transparent}
      barStyle="dark-content"
      statusBarColor={AppColors.appColor2}>
      <View style={styles.container}>
        <ChatList
          messages={messages}
          myID={'xyz'}
        />
      </View>
      <ShareModal
        isVisible={shareModal}
        closeModal={() => setShareModal(false)}
        onGalleryPress={openPicker}
        onCameraPress={openCamera}
      />
    </ScreenWrapper>
  );
};
