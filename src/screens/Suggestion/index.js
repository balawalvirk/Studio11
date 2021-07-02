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
import Input from '../../components/InputField'
import { height } from 'react-native-dimension';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import { useSelector } from 'react-redux';
import { saveData } from '../../firebaseConfig';
export default function Suggestion(props) {
  const user = useSelector(state => state.Auth.user)
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [suggestionText, setSuggestion] = useState('');
  const onSubmitPress = async () => {
    try {
      setLoading(true)
      const suggestionId = firestore().collection('rnd').doc().id
      const suggestion = {
        id: suggestionId,
        customerId: user.id,
        time: moment().valueOf(),
        suggestion: suggestionText,
      }
      console.log(suggestion)
      await saveData('Suggestions', user.id, suggestion)
      setModalVisible(true)
      setLoading(false)
      setTimeout(() => {
        props.navigation.navigate('Dashboard');
        setModalVisible(false)
      }, 2000)
    } catch (error) {
      setLoading(false)
      console.log(error.message)
    }

  }
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}>
      <Header headerTitle={'Give a Suggestion'} leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} />
      <View style={styles.mainViewContainer}>
        <Image style={styles.suggestionImage} source={require('../../assets/images/suggestion.png')} />
        <View style={styles.longInputField}>
          <Text style={styles.suggestionLabel}>Give us your suggestion</Text>

          <Input
            inputStyle={{ height: height(15), }}
            containerStyles={styles.longInputStyle}
            multiline
            numberOfLines={12}
            placeholderTextColor={AppColors.white50}
            placeholder={'Suggestion'}
            value={suggestionText}
            onChangeText={text => setSuggestion(text)}
          />
        </View>
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          title={'Submit'}
          onPress={() => onSubmitPress()} />
      </View>
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalImage
        modalImagePath={require('../../assets/images/bulb.png')}
        description={'Thank you so much for giving us a suggestion!'} />
    </ScreenWrapper>
  );
};
