import React, { useState, useCallback, useEffect } from 'react';
import {
  GiftedChat, Send, Bubble, Time, Image, InputToolbar,
  LeftAction, ChatInput, SendButton
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
export default function Chat(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [messages, setmessages] = useState([]);

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
    console.log(message)
    setmessages(prev => GiftedChat.append(prev, message))
  }
  return (

    <ScreenWrapper headerUnScrollable={() => <Header headerTitle={'Dorris Ortiz'} leadingIcon={'arrow-left'}
      onPressLeadingIcon={() => props.navigation.goBack()} />}>
      <GiftedChat
        // minComposerHeight={2}
        renderAvatarOnTop
        renderSend={(props) =>
          <Send
            {...props}
          >
            <Icon style={{ fontSize: width(10), color: AppColors.primaryGold, alignSelf: 'center' }}
              name='arrow-circle-up' />
          </Send>
        }
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
        renderInputToolbar={props => <InputToolbar containerStyle={{
          backgroundColor: AppColors.transparent,
          justifyContent: "center",
          borderWidth: width(0.15),
          padding: width(1),
          borderColor: AppColors.primaryGold,
        }} {...props} />}

        // *********************************

        // minInputToolbarHeight={70}
        // renderInputToolbar={(props)=> (
        //     <View style={{ backgroundColor: AppColors.transparent, height: 200 }}>
        //         <View style={{backgroundColor:'red'}}>
        //             <LeftAction {...props} />
        //             <ChatInput {...props} />
        //             <SendButton {...props} />
        //         </View>
        //         <View></View>
        //     </View>
        // )}

        // *******************************

        textInputStyle={{ color: 'white' }}
      // minInputToolbarHeight={80}
      />
    </ScreenWrapper>
  );
};
