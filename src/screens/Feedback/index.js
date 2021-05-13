import React, { useState } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/customModal';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
export default function Feedback(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 5000)
  }
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();

  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Give us a feedback'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <Image style={styles.feedbackImage} source={require('../../assets/images/feedback.png')} />
        <HorizontalLine />
        <View style={styles.starRow}>
          <Icon style={styles.feedbackIcon} name='star' />
          <Icon style={styles.feedbackIcon} name='star' />
          <Icon style={styles.feedbackIcon} name='star' />
          <Icon style={styles.feedbackIcon} name='star' />
          <Icon style={styles.feedbackIcon} name='star-o' />
        </View>
        <HorizontalLine />
        <View style={styles.longInputField}>
          <Text style={styles.feedbackLabel}>Type your feedback</Text>
          <TextInput style={styles.longInputStyle}
            multiline numberOfLines={4}
            placeholderTextColor={AppColors.white}
            placeholder={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.'}
          />
        </View>
        <Button title={'Submit'} onPress={() => openModal()} />
      </View>
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}
        modalImage modalImagePath={require('../../assets/images/like.png')}
        description={'Thank you so much for giving us a Feedback!'} />
    </ScreenWrapper>
  );
};
