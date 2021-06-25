import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { width } from 'react-native-dimension';
import { NavigationContainer, DrawerActions, useNavigation } from '@react-navigation/native';
import AppColors from '../../utills/AppColors';
export default function ChatListBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const messages = [
    {
      id: '1',
      title: "Zack O'Hara",
      message: "tenetur earum et esse",
      time: '3:36 AM',
      dp: require('../../assets/images/barbersChat/c1.png'),
    },
    {
      id: '2',
      title: "Ara Turner",
      message: "provident rerum natus ipsa",
      time: '5:14 AM',
      dp: require('../../assets/images/barbersChat/c2.png'),
    },
    {
      id: '3',
      title: "Ms. Talon Rogahn",
      message: "necessitatibus vel necessitatibus asperiores",
      time: '1:24 PM',
      dp: require('../../assets/images/barbersChat/c3.png'),
    },
    {
      id: '4',
      title: "Pansy McGlynn",
      message: 'nihil voluptates sint vel',
      time: '6:22 AM',
      dp: require('../../assets/images/barbersChat/c4.png'),
    },
    {
      id: '5',
      title: 'Dr. Junius Harvey',
      message: 'nihil saepe quis fuga',
      time: '6:52 PM',
      dp: require('../../assets/images/barbersChat/c5.png'),
    },
  ];
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header leadingIcon={'menu'}
        // onPressLeadingIcon={() => props.navigation.dispatch(DrawerActions.openDrawer())}
        onPressLeadingIcon={() => navigation.openDrawer()}
        headerTitle={'Messages'} />}>

      <View style={styles.mainViewContainer}>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                // onPress={() => props.navigation.navigate('Chat')}
                style={{ alignItems: 'center', width: width(90) }}>
                <View style={styles.messageRow}>
                  <View style={styles.messageLeftSection}>
                    <Image style={styles.messageDp}
                      source={item.dp} />
                    <View style={styles.messageDetails}>
                      <Text style={styles.userTitle}>{item.title}</Text>
                      <Text style={styles.messageText}>{item.message}</Text>
                    </View>
                  </View>
                  <View style={styles.messageTime}>
                    <Text style={styles.messageTimeText}>{item.time}</Text>
                  </View>
                </View>
                <HorizontalLine lineColor={styles.HorizontalLine100} />
              </TouchableOpacity>
            );
          }}
        />

      </View>
    </ScreenWrapper>
  );
};
