import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Video from 'react-native-video';
import Header from '../../components/Header';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/Entypo';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {saveData} from '../../firebaseConfig';
import auth from '@react-native-firebase/auth';
export default function EditUploadedVideo(props) {
  const {item} = props.route.params;
  const [videoPlay, setvideoPlay] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [poster, setPoster] = useState(
    'https://cms.qz.com/wp-content/uploads/2016/09/loading.gif?quality=75&strip=all&w=1600&h=900',
  );
  const dispatch = useDispatch();
  const [title, setTitle] = useState(item.VideoTitle);
  const [description, setDescription] = useState(item.VideoDetails);
  const [titleErr, setTitleErr] = useState('');
  const [descriptionErr, setDescriptionErr] = useState('');
  const [onSaveLoading, setOnSaveLoading] = useState(false);

  const user = useSelector((state) => state.Auth.user);

  const updateVideo = async () => {
    if (title == '') {
      setTitleErr('Video title cannot be empty.');
      return;
    }
    setTitleErr('');
    if (description == '') {
      setDescriptionErr('Video description cannot be empty.');
      return;
    }
    setDescriptionErr('');
    setOnSaveLoading(true);
    try {
      const updatedVideo = {
        ...item,
        VideoTitle: title,
        VideoDetails: description,
      };
      await saveData('Videos', item.Id, updatedVideo);
      setOnSaveLoading(false);
      props.navigation.goBack();
    } catch (error) {
      console.log(error.message);
      setOnSaveLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Edit Uploaded Video'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <TouchableOpacity onPress={() => setvideoPlay(true)}>
          <Video
            onLoad={() => setPoster(null)}
            resizeMode="contain"
            controls
            posterResizeMode={'cover'}
            poster={poster}
            source={{uri: item.VideoLink}} // Can be a URL or a local file.
            style={styles.bgImage}
          />
        </TouchableOpacity>
        <View style={styles.bringCenter}>
          <InputField
            value={title}
            onChangeText={(text) => setTitle(text)}
            fielderror={titleErr}
            label="Video Title"
            placeholder="Alias quia nostrum."
            defaultValue={item.VideoTitle}
          />
          <InputField
            value={description}
            fielderror={descriptionErr}
            onChangeText={(text) => setDescription(text)}
            multiline
            numoflines={12}
            label="Video Description"
            placeholder="Description"
            inputStyle={{height: 'auto'}}
          />
          <Button
            isLoading={onSaveLoading}
            disabled={onSaveLoading}
            onPress={() => updateVideo()}
            title="Save Video"
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
