import React, { useState, useCallback, useEffect } from 'react';
import {
  GiftedChat, Send, Bubble, Time, Image, InputToolbar,
  LeftAction, ChatInput, SendButton,
} from 'react-native-gifted-chat';
import { Text, View, ActivityIndicator } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors'
import { TextInput } from 'react-native-gesture-handler';
import InputField from '../../components/InputField';
// onSend({ text: text.trim() }, true);
export default function Chat(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [messages, setmessages] = useState([]);
  const [text, setText] = useState()
  useEffect(() => {
    setmessages([
      {
        _id: 1,
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',
        // createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const renderBubble = props =>
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          padding: width(1),
          backgroundColor: AppColors.primaryGold,
        },
        left: {
          backgroundColor: AppColors.cardColor,
        }
      }}
      textProps={{
        style: {
          color: props.position === 'left' ? '#fff' : '#fff',
        },
      }}
      textStyle={{
        left: {
          color: '#fff',
        }
      }}
    />
  const renderChatLoading = props =>
    <View style={styles.loaderContainer}>
      <ActivityIndicator color={AppColors.primaryGold} size={"large"} />
    </View>
  const onSend = message => {
    setText('')
    setmessages(prev => GiftedChat.append(prev, message))
  }
  return (

    <ScreenWrapper headerUnScrollable={() => <Header headerTitle={'Dorris Ortiz'} leadingIcon={'arrow-left'}
      onPressLeadingIcon={() => props.navigation.goBack()} />}>
      <GiftedChat
        renderAvatarOnTop
        // renderSend={(props) =>
        //   <Send
        //     {...props}
        //   >
        //     <Icon style={{ fontSize: width(10), color: AppColors.primaryGold, alignSelf: 'center' }}
        //       name='arrow-circle-up' />
        //   </Send>
        // }
        isLoadingEarlier={true}
        messages={messages}
        renderBubble={renderBubble}
        renderLoading={renderChatLoading}
        onSend={messages => onSend(messages)}
        user={{
          _id: 123,
          name: "Studio11",
          avatar: require('../../assets/images/cuttings/1.png'),
        }}
        renderUsernameOnMessage={false}
        renderInputToolbar={props => {

          return <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginLeft: width(5),
            alignItems: 'center',
            bottom: height(4),
            width: width(90),
            marginBottom: height(5),
          }}>
            <InputField value={text} onChangeText={setText} containerStyles={{}} />
            <Icon
              onPress={() => { if (text.trim()) props.onSend([{ text: text.trim() }], true) }}
              style={{
                marginLeft: width(1), marginTop: height(2),
                fontSize: width(10), color: AppColors.primaryGold
              }}
              name='arrow-circle-up' />
          </View>
        }
          // <InputToolbar
          //   containerStyle={{
          //     borderTopWidth: width(0.25), borderColor: AppColors.primaryGold, borderTopColor: AppColors.primaryGold,
          //     borderWidth: width(0.25), borderRadius: width(5),
          //     backgroundColor: AppColors.transparent, marginHorizontal: width(5)
          //   }}
          //   {...props} />
        }
        textInputStyle={{ color: AppColors.white }}
        alwaysShowSend={true}
      />
    </ScreenWrapper>
  );
};
