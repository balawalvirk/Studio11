import React, { useState } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/customModal';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
export default function Suggestion(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true)
    setTimeout(() => {
      props.navigation.navigate('Dashboard');
    }, 5000)
  }
  return (
    <ScreenWrapper scrollEnabled transclucent statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Give a Suggestion'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <Image style={styles.suggestionImage} source={require('../../assets/images/suggestion.png')} />
        <HorizontalLine />
        <View style={styles.starRow}>
          <Icon style={styles.suggestionIcon} name='star' />
          <Icon style={styles.suggestionIcon} name='star' />
          <Icon style={styles.suggestionIcon} name='star' />
          <Icon style={styles.suggestionIcon} name='star' />
          <Icon style={styles.suggestionIcon} name='star-o' />
        </View>
        <HorizontalLine />
        <View style={styles.longInputField}>
          <Text style={styles.suggestionLabel}>Give us your suggestion</Text>
          <TextInput style={styles.longInputStyle}
            multiline numberOfLines={4}
            placeholderTextColor={AppColors.white}
            placeholder={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero.'}
          />
        </View>
        <Button title={'Submit'} onPress={() => openModal()} />
      </View>
      <CustomModal isVisible={modalVisible} onClose={() => setModalVisible(false)}
        modalImage modalImagePath={require('../../assets/images/bulb.png')}
        description={'Thank you so much for giving us a suggestion!'} />
    </ScreenWrapper>
  );
};
