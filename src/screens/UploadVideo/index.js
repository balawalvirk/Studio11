import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState } from 'react';
import { ActivityIndicator, Image, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import CameraModel from '../../components/CameraModal';
import Header from '../../components/Header';
import HighlightedText from '../../components/HighlightedText';
import InputField from '../../components/InputField';
import ScreenWrapper from '../../components/ScreenWrapper';
import { saveData, uploadImage } from '../../firebaseConfig';
import { setVideos } from '../../Redux/Actions/Barber';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function UploadVideo(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const videos = useSelector((state) => state.Barber.videos);
  const [capturedVideo, setcapturedVideo] = useState('');
  const [videoTitle, setvideoTitle] = useState('');
  const [videoName, setvideoName] = useState('');
  const [videoDetails, setvideoDetails] = useState('');
  const [CameraModelView, setCameraModelView] = useState(false);
  const [ThumbnailModelView, setThumbnailModelView] = useState(false);
  const [imageStatus, setimageStatus] = useState(false);
  const [waiting, setwaiting] = useState(false);
  // ****************************
  const [capturedThumbnail, setcapturedThumbnail] = useState('');
  const [thumbnailName, setThumbnailName] = useState('');
  const [thumnailStatus, setThumnailStatus] = useState(false);
  // **************************************
  const [titleError, setTitleError] = useState('');
  const [descError, setDescError] = useState('');
  const publishVideo = async () => {
    try {
      if (!capturedVideo) {
        alert('Please select video.');
        return;
      }
      if (!capturedThumbnail) {
        alert('Please select thumbnail.');
        return;
      }
      if (videoTitle == '') {
        setTitleError('Please enter title.');
        return;
      }
      if (videoDetails == '') {
        setDescError('Please enter description.');
        return;
      }
      setwaiting(true);
      const thumbnailURL = await uploadImage(
        capturedThumbnail,
        'VIDEO_THUMBS/' + thumbnailName,
      );
      const videoUrl = await uploadImage(capturedVideo, 'VIDEOS/' + videoName);
      const videoId = firestore().collection('rnd').doc().id;
      const newVideo = {
        Id: videoId,
        UserId: auth().currentUser.uid,
        VideoTitle: videoTitle,
        VideoDetails: videoDetails,
        VideoLink: videoUrl,
        videoThumb: thumbnailURL,
        videoRef: 'VIDEOS/' + videoName,
        thumbRef: 'VIDEO_THUMBS/' + thumbnailName,
        views: 0,
        likeCount: 0,
        likedBy: [],
        commentCount: 0,
        timestamp: firestore.FieldValue.serverTimestamp()
      };
      await saveData('Videos', videoId, newVideo);
      dispatch(setVideos([...videos, newVideo]));
      props.navigation.goBack();
    } catch (error) {
      console.log(error);
      setwaiting(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Upload Video'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.bringCenter}>
          {waiting ? (
            <ActivityIndicator size="large" color={AppColors.primaryGold} />
          ) : (
            <>
              <View style={styles.flexRow}>
                {imageStatus ? (
                  <TouchableOpacity onPress={() => setCameraModelView(true)}>
                    <Image
                      style={styles.uploadButton}
                      source={{ uri: capturedVideo }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => setCameraModelView(true)}>
                    <Icon name="video-camera" style={styles.videoIcon} />
                    <HighlightedText text="Add Video" disabled={true} />
                  </TouchableOpacity>
                )}
                {thumnailStatus ? (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => setThumbnailModelView(true)}>
                    <Image
                      name="camera"
                      style={styles.uploadButton}
                      resizeMode={'cover'}
                      source={{ uri: capturedThumbnail }}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={() => setThumbnailModelView(true)}>
                    <Icon name="camera" style={styles.videoIcon} />
                    <HighlightedText text="Add Thumbnail" disabled={true} />
                  </TouchableOpacity>
                )}
              </View>

              <InputField
                label="Video Title"
                placeholder="Title"
                value={videoTitle}
                onChangeText={(videoTitle) => setvideoTitle(videoTitle)}
                fielderror={titleError}
              />
              <InputField
                multiline
                label="Video Description"
                fielderror={descError}
                numoflines={12}
                value={videoDetails}
                onChangeText={(videoDetails) => setvideoDetails(videoDetails)}
                placeholder="Description"
                inputStyle={{ height: 'auto' }}
              />
              <Button
                onPress={() => publishVideo()}
                title="Publish Video"
                gradientContainerStyle={{
                  width: '100%',
                  borderRadius: width(2.5),
                  paddingVertical: height(2),
                }}
              />
            </>
          )}
        </View>
      </View>
      <CameraModel
        isVisible={CameraModelView}
        onClose={() => setCameraModelView(false)}
        iconName={'videocam'}
        labelName={'Take Video'}
        imageFromCamera={() =>
          ImagePicker.openCamera({
            mediaType: 'video',
          }).then((image) => {
            setcapturedVideo(image.path);
            setvideoName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true);
          })
        }
        imageFromGallery={() =>
          ImagePicker.openPicker({
            mediaType: 'video',
          }).then((image) => {
            setcapturedVideo(image.path);
            setvideoName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true);
          })
        }
      />
      <CameraModel
        isVisible={ThumbnailModelView}
        onClose={() => setThumbnailModelView(false)}
        iconName={'camera'}
        labelName={'Add Thumbnail'}
        imageFromCamera={() =>
          ImagePicker.openCamera({}).then((image) => {
            setcapturedThumbnail(image.path);
            setThumbnailName(image.path.split('/').pop());
            setThumbnailModelView(false);
            setThumnailStatus(true);
          })
        }
        imageFromGallery={() =>
          ImagePicker.openPicker({}).then((image) => {
            setcapturedThumbnail(image.path);
            setThumbnailName(image.path.split('/').pop());
            setThumbnailModelView(false);
            setThumnailStatus(true);
          })
        }
      />
    </ScreenWrapper>
  );
}
