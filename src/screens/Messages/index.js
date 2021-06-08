import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import { messages } from '../../dummyData';
export default function Messages(props) {

  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}
      headerUnScrollable={() => <Header headerTitle={'Messages'} />}>

      <View style={styles.mainViewContainer}>

        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Chat')}
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
                <HorizontalLine lineWidth={styles.HorizontalLine100} />
              </TouchableOpacity>
            );
          }}
        />

      </View>
    </ScreenWrapper>
  );
};
