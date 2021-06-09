import React, { useState } from 'react';
import { View, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import HighlightedText from '../../components/HighlightedText';
import CameraModel from '../../components/CameraModal';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth'
import { addToArray, getData, uploadImage } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import uuid from 'react-native-uuid';
export default function UploadVideo(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user)
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
  const [titleError, setTitleError] = useState('')
  const [descError, setDescError] = useState('')
  const publishVideo = async () => {
    if (!capturedVideo) {
      alert('Please select video.')
      return
    }
    if (!capturedThumbnail) {
      alert('Please select thumbnail.')
      return
    }
    if (videoTitle == '') {
      setTitleError('Please enter title.')
      return
    }
    if (videoDetails == '') {
      setDescError('Please enter description.')
      return
    }
    setwaiting(true)
    let thumbnailURL = null
    uploadImage(capturedThumbnail, 'VIDEO_THUMBS/' + thumbnailName).then(result => {
      console.log(result);
      thumbnailURL = result
    })
    uploadImage(capturedVideo, 'VIDEOS/' + videoName)
      .then(async (result) => {
        await addToArray('Users', auth().currentUser.uid, "Videos", [
          {
            Id: uuid.v4(),
            VideoTitle: videoTitle,
            VideoDetails: videoDetails,
            VideoLink: result,
            videoThumb: thumbnailURL,
            videoRef: 'VIDEOS/' + videoName,
            thumbRef: 'VIDEO_THUMBS/' + thumbnailName
          }
        ])
        dispatch(login({
          ...user,
          Videos: [...user.Videos ?? [], {
            VideoLink: result,
            VideoTitle: videoTitle,
            VideoDetails: videoDetails,
            videoThumb: thumbnailURL,
            videoRef: 'VIDEOS/' + videoName,
            thumbRef: 'VIDEO_THUMBS/' + thumbnailName
          }]
        }))
        setCameraModelView(false)
        setwaiting(false)
        setimageStatus(false)
        setcapturedVideo('')
        setvideoTitle('')
        setvideoDetails('')
        props.navigation.goBack()
      })
      .catch(error => {
        console.error("Error is =============>: ", error);
      });

  };
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Edit Uploaded Video'}
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>

        <View style={styles.bringCenter}>
          {waiting ? <ActivityIndicator size="large" color={AppColors.primaryGold} /> :
            <>
              <View style={styles.flexRow}>
                {imageStatus ?
                  <TouchableOpacity onPress={() => setCameraModelView(true)}>
                    <Image style={styles.uploadButton} source={{ uri: capturedVideo }} />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.uploadButton} onPress={() => setCameraModelView(true)}>
                    <Icon name='video-camera' style={styles.videoIcon} />
                    <HighlightedText text='Add Video' disabled={true} />
                  </TouchableOpacity>
                }
                {thumnailStatus ? <TouchableOpacity style={styles.uploadButton} onPress={() => setThumbnailModelView(true)}>
                  <Image name='camera' style={styles.uploadButton} resizeMode={'cover'} source={{ uri: capturedThumbnail }} />
                </TouchableOpacity> :
                  <TouchableOpacity style={styles.uploadButton} onPress={() => setThumbnailModelView(true)}>
                    <Icon name='camera' style={styles.videoIcon} />
                    <HighlightedText text='Add Thumbnail' disabled={true} />
                  </TouchableOpacity>}
              </View>

              <InputField
                label='Video Title'
                placeholder='Title'
                value={videoTitle}
                onChangeText={(videoTitle) => setvideoTitle(videoTitle)}
                fielderror={titleError}
              />
              <InputField
                multiline label='Video Description'
                fielderror={descError}
                numoflines={12}
                value={videoDetails}
                onChangeText={(videoDetails) => setvideoDetails(videoDetails)}
                placeholder='Description' />
              <Button
                onPress={() => publishVideo()}
                title='Publish Video' gradientContainerStyle={{
                  width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
                }} />
            </>}
        </View>
      </View>
      <CameraModel isVisible={CameraModelView} onClose={() => setCameraModelView(false)}
        iconName={"videocam"} labelName={'Take Video'}
        imageFromCamera={
          () => ImagePicker.openCamera({
            mediaType: 'video',
          }).then(image => {
            setcapturedVideo(image.path);
            setvideoName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true)
          })
        }
        imageFromGallery={() => ImagePicker.openPicker({
          mediaType: 'video',
        }).then((image) => {
          setcapturedVideo(image.path);
          setvideoName(image.path.split('/').pop());
          setCameraModelView(false);
          setimageStatus(true)
        })}
      />
      <CameraModel isVisible={ThumbnailModelView} onClose={() => setThumbnailModelView(false)}
        iconName={"camera"} labelName={'Add Thumbnail'}
        imageFromCamera={
          () => ImagePicker.openCamera({
          }).then(image => {
            setcapturedThumbnail(image.path);
            setThumbnailName(image.path.split('/').pop());
            setThumbnailModelView(false);
            setThumnailStatus(true)
          })
        }
        imageFromGallery={() => ImagePicker.openPicker({
        }).then((image) => {
          setcapturedVideo(image.path);
          setvideoName(image.path.split('/').pop());
          setThumbnailModelView(false);
          setimageStatus(true)
        })}
      />
    </ScreenWrapper>
  );
};