import React, { useState, useEffect } from 'react';
import {
  GiftedChat, Bubble,
} from 'react-native-gifted-chat';
import { View, ActivityIndicator } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors'
import InputField from '../../components/InputField';
export default function Chat(props) {
  const [messages, setmessages] = useState([]);
  const [text, setText] = useState()
  useEffect(() => {
    setmessages([
      {
        _id: 1,
        text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy.',
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
        }
        textInputStyle={{ color: AppColors.white }}
        alwaysShowSend={true}
      />
    </ScreenWrapper>
  );
};
