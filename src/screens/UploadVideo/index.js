import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function UploadVideo(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Edit Uploaded Video'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.bringCenter}>
          <TouchableOpacity style={styles.uploadButton}>
            <Icon name='video-camera' style={styles.videoIcon} />
            <HighlightedText text='Add Video' />
          </TouchableOpacity>
          <InputField label='Video Title' placeholder='Alias quia nostrum.' />
          <InputField
            multiline label='Video Description'
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.' />
          <Button onPress={() => props.navigation.goBack()}
            title='Publish Video' gradientContainerStyle={{
              width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
            }} />
        </View>
      </View>
    </ScreenWrapper>
  );
};