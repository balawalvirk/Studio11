import React from 'react';
import { ActivityIndicator, Text, Image, View, FlatList } from 'react-native';
import { totalSize } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo'
import Img from '../../assets/images/bg.jpg'
export default ChatList = ({
    messages = [],
    myID
}) => {
    const renderMessage = ({ item }) => {
        if (item.senderId == myID) {
            return (
                <View style={styles.flexRow}>
                    {item.avatarImg != '' && <Image source={item.avatarImg} style={styles.avatarImg} />}
                    <View style={styles.mssgContainer}>
                        {item.image && item.image != '' && <Image source={{ uri: item.image }} resizeMode={'cover'} style={styles.mssgImage} />}
                        <View style={styles.textContainer}>
                            <Text style={styles.mssgText}>{item.message}</Text>
                            <Text style={styles.mssgTimeText}>{item.timestamp}</Text>
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.flexRow, { alignSelf: 'flex-end', }]}>
                    <View style={styles.myMssgContainer}>
                        {item.image && item.image != '' && <Image source={{ uri: item.image }} resizeMode={'cover'} style={styles.mssgImage} />}
                        <View style={styles.textContainer}>
                            <Text style={styles.myMssgText}>{item.message}</Text>
                            <Text style={styles.myMssgTimeText}>{item.timestamp}</Text>
                        </View>
                    </View>
                    {item.avatarImg != '' && <Image source={item.avatarImg} style={styles.avatarImg} />}
                </View>
            )
        }
    }
    return (
        <FlatList
            style={styles.container}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={item => item.id}
        />
    );
};

