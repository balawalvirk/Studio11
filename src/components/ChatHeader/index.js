import React from 'react';
import { ActivityIndicator, Text, Image, View } from 'react-native';
import { totalSize } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import Entypo from 'react-native-vector-icons/Entypo'
export default ChatHeader = ({
    avatar,
    name,
    isOnline,
}) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerInnerContainer}>
                <Entypo
                    name="chevron-small-left"
                    size={totalSize(3)}
                    color={AppColors.black}
                />
                <View style={styles.infoContainer}>
                    <Image
                        source={avatar}
                        resizeMode="cover"
                        style={styles.technicianImage}
                    />
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText}>{name}</Text>
                        <Text style={styles.jobText}>{isOnline ? 'Online' : 'Offline'}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

