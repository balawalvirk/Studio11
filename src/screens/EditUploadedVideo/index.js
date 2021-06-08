import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Video from 'react-native-video';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/Entypo';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
export default function EditUploadedVideo(props) {
  const { item } = props.route.params;
  const [videoPlay, setvideoPlay] = useState(false);
  const [isLoading, setLoading] = useState(true)
  const [poster, setPoster] = useState('https://cms.qz.com/wp-content/uploads/2016/09/loading.gif?quality=75&strip=all&w=1600&h=900')

  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user)
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Edit Uploaded Video'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <TouchableOpacity onPress={() => setvideoPlay(true)}>
          <Video
            onLoad={() => setPoster(null)}
            resizeMode="contain"
            controls
            posterResizeMode={'cover'}
            poster={poster}
            source={{ uri: item.VideoLink }}   // Can be a URL or a local file.
            style={styles.bgImage}
          />
        </TouchableOpacity>
        <View style={styles.bringCenter}>
          <InputField label='Video Title' placeholder='Alias quia nostrum.'
            defaultValue={item.VideoTitle} />
          <InputField defaultValue={item.VideoDetails}
            multiline label='Video Description'
            placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.' />
          <Button onPress={() => props.navigation.goBack()}
            title='Save Video' gradientContainerStyle={{
              width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
            }} />
        </View>
      </View>
    </ScreenWrapper>
  );
};