import React from 'react';
import { View, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import Modal from 'react-native-modal'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { width } from 'react-native-dimension';
export default ShareModal = ({
    isVisible,
    closeModal,
    onGalleryPress,
    onCameraPress
}) => {
    const CircleButton = ({ icon, backgroundColor, title, onPress }) =>
        <View style={styles.circleContainer}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.7}
                style={[styles.circleBtn, { backgroundColor: backgroundColor }]}>
                {icon}
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
        </View>
    return (
        <Modal
            backdropOpacity={0.25}
            animationIn={'slideInUp'}
            isVisible={isVisible}
            style={styles.modalContainer}
            onBackButtonPress={closeModal}
            onBackdropPress={closeModal}>
            <View style={styles.container}>
                <View style={styles.flexRow}>
                    <CircleButton
                        icon={<FontAwesome name={'picture-o'} size={width(5.5)} color={AppColors.white} />}
                        backgroundColor={AppColors.lightRed}
                        title={'Gallery'}
                        onPress={onGalleryPress}
                    />
                    <CircleButton
                        icon={<FontAwesome name={'camera'} size={width(5.5)} color={AppColors.white} />}
                        backgroundColor={AppColors.lightOrange}
                        title={'Camera'}
                        onPress={onCameraPress}
                    />
                    <CircleButton
                        icon={<FontAwesome name={'video-camera'} size={width(5.5)} color={AppColors.white} />}
                        backgroundColor={AppColors.lightGreen}
                        title={'Video'}
                    />
                </View>
            </View>
        </Modal>
    );
};

