import moment from 'moment';
import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import styles from './styles';
export default React.forwardRef(({
    messages = [],
    myID
}, ref) => {
    const renderMessage = ({ item }) => {
        const isMyMessage = item.senderId == myID
        console.log(isMyMessage && item.avatarImg != '')
        return (
            <View style={[styles.flexRow, { alignSelf: isMyMessage ? 'flex-end' : 'flex-start' }]}>
                {(!isMyMessage && item.avatarImg != '') && <Image source={{ uri: item.avatarImg }} style={styles.avatarImg} />}
                <View style={isMyMessage ? styles.myMssgContainer : styles.mssgContainer}>
                    {item.image && item.image != '' && <Image source={{ uri: item.image }} resizeMode={'cover'} style={styles.mssgImage} />}
                    <View style={styles.textContainer}>
                        <Text style={styles.mssgText}>{item.message}</Text>
                        <Text style={styles.mssgTimeText}>{moment(item.timestamp).format('hh:mm a')}</Text>
                    </View>
                </View>
                {(isMyMessage && item.avatarImg != '') && <Image source={{ uri: item.avatarImg }} style={styles.avatarImg} />}
            </View>
        )
    }
    return (
        <View style={styles.mainContainer}>
            <FlatList
                onLayout={() => ref.current.scrollToEnd()}
                ref={ref}
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                data={messages}
                renderItem={renderMessage}
                keyExtractor={item => item.id}
            />
        </View>
    );
})
