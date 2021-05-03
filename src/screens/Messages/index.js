import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import Button from '../../components/Button';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
export default function Messages(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const messages = [
    {
      id: '1',
      title: 'Leonora Graham',
      message: 'libero corrupti non voluptatem',
      time: '3:36 AM',
      dp: require('../../assets/images/barbers/b1.png'),
    },
    {
      id: '2',
      title: 'Citlalli Emmerich',
      message: 'laboriosam sed deserunt maiores',
      time: '5:14 AM',
      dp: require('../../assets/images/barbers/b2.png'),
    },
    {
      id: '3',
      title: 'Willy Jacobi',
      message: 'velit rerum sequi nihil',
      time: '1:24 PM',
      dp: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '4',
      title: 'Ansley Rutherford',
      message: 'dolore saepe vel modi',
      time: '6:22 AM',
      dp: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '5',
      title: 'Cortez Bashirian',
      message: 'aliquid vero omnis vel',
      time: '6:52 PM',
      dp: require('../../assets/images/barbers/b5.png'),
    },
  ];
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
    headerUnScrollable={()=><Header headerTitle={'Messages'} />}>
      
      <View style={styles.mainViewContainer}>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity 
              onPress={()=>props.navigation.navigate('Chat')}
              style={{alignItems:'center',width:width(90)}}>
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
                <HorizontalLine lineWidth={styles.HorizontalLine100} />
           </TouchableOpacity>
            );
          }}
        />

      </View>
    </ScreenWrapper>
  );
};
