import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField'
import PostReview from '../../components/PostReview';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CommentList } from '../../dummyData';
import auth from '@react-native-firebase/auth'
import Video from 'react-native-video';
import { addVideoView, getVideoComments, likeVideo, saveComment, unlikeVideo } from '../../firebaseConfig';
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'
export default function VideoPlay(props) {
  const { videoInfo, barberDetails } = props.route.params
  const user = useSelector(state => state.Auth.user)
  const [loadingPoster, setLoadingPoster] = useState('https://cms.qz.com/wp-content/uploads/2016/09/loading.gif?quality=75&strip=all&w=1600&h=900');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [videoPlay, setvideoPlay] = useState(false);
  const [comment, setComment] = useState('');
  const [commentErr, setCommentErr] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);

  let listenerRef = () => { };
  useEffect(() => {
    likeListener()
    getComments()
    return () => listenerRef()
  }, [])
  const likeListener = async () => {
    listenerRef = firestore()
      .collection('Videos')
      .doc(videoInfo.Id)
      .onSnapshot(doc => {
        const vid = doc.data()
        const customerId = auth().currentUser.uid
        setLikeCount(vid.likeCount)
        setLiked(vid.likedBy.includes(customerId))
        setCommentCount(vid.commentCount)
      },
        error => console.log(error.message))
  }
  const onLikePress = async () => {
    try {
      const customerId = auth().currentUser.uid
      if (liked) {
        unlikeVideo(videoInfo, customerId)
      } else {
        likeVideo(videoInfo, customerId)
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const getComments = async () => {
    try {
      const cmnts = await getVideoComments(videoInfo)
      setCommentList(cmnts)
    } catch (error) {
      console.log(error.message)
    }
  }
  const renderComments = ({ item }) =>
    <View style={styles.commentContainer}>
      <View style={styles.row}>
        <Text style={styles.whiteText}>{item.commenterName}</Text>
        <Text style={styles.white50}>{moment(item.time).format('MMMM D, YYYY hh:mm a')}</Text>
      </View>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  const postComment = async () => {
    if (comment == '') {
      setCommentErr('Please enter a comment.')
      return
    }
    setCommentErr('')
    setCommentLoading(true)
    try {
      const commentObj = await saveComment(videoInfo, comment, user.FirstName + ' ' + user?.LastName, auth().currentUser.uid)
      if (commentObj) {
        setCommentList([...commentList, commentObj])
      }
      setComment('')
      setCommentLoading(false)
    } catch (error) {
      console.log(error.message)
      setCommentLoading(false)
    }
  }
  const addView = async () => {
    try {
      await addVideoView(videoInfo)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <ScreenWrapper
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() =>
        <Header headerTitle={'Video Uploads'} leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()} />
      }>
      <View style={styles.mainViewContainer}>
        {videoPlay ?
          <Video
            resizeMode="contain"
            controls
            source={{ uri: videoInfo?.VideoLink }}
            style={styles.bgImage}
            poster={loadingPoster}
            posterResizeMode={'cover'}
            onLoad={() => addView()}
          />
          :
          <TouchableOpacity onPress={() => setvideoPlay(true)}>
            <ImageBackground
              style={styles.bgImage}
              source={{ uri: videoInfo?.videoThumb }}
              resizeMode='contain'>
              <Icon name='controller-play' style={styles.playButton} />
            </ImageBackground>
          </TouchableOpacity>}
        <ScrollView
          style={styles.ScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <Text style={styles.whiteText}>{videoInfo?.VideoTitle}</Text>
              <View style={styles.viewContainer}>
                <Ionicons name='eye' style={styles.viewIcon} />
                <Text style={styles.white50}>{videoInfo?.views}</Text>
              </View>
            </View>
            <View style={styles.likeContainer}>
              <TouchableOpacity onPress={() => onLikePress()}>
                <Icon name={liked ? "heart" : "heart-outlined"} style={styles.likeIcon} />
              </TouchableOpacity>
              <Text style={styles.white50}>{likeCount}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <Text style={styles.whiteText}>Published by:</Text>
              <Text style={styles.white50}>{barberDetails?.FirstName} {barberDetails?.LastName}</Text>
            </View>
            <View style={styles.rightSection}>
              <Button
                title="View Barber Profile"
                containerStyle={styles.btnContainer}
                textStyle={styles.font35}
                onPress={() => props.navigation.navigate('BarberProfile', { barberId: videoInfo?.UserId })} />
            </View>
          </View>
          <HorizontalLine lineColor={styles.Centerline} />
          <View style={styles.bringCenter}><Text style={styles.whiteText}>Video Description</Text>
            <Text style={styles.white50}>{videoInfo?.VideoDetails}</Text>
          </View>
          <HorizontalLine lineColor={styles.Centerline} />
          <View style={styles.flexRow}>
            <InputField
              value={comment}
              onChangeText={text => setComment(text)}
              fielderror={commentErr}
              label={'Write a comment'}
              labelStyle={{ color: AppColors.primaryGold }}
              containerStyles={{ width: width(65) }}
            />
            <Button
              isLoading={commentLoading}
              title="Post"
              containerStyle={styles.postBtn}
              textStyle={styles.font35}
              onPress={() => postComment()} />
          </View>
          <HorizontalLine lineColor={[styles.Centerline, { marginBottom: 0 }]} />
          <View style={styles.commentCountContainer}>
            <MaterialIcons style={styles.commentIcon} name='comment' />
            <Text style={styles.whiteText}>Comments ({commentCount})</Text>
          </View>
          <HorizontalLine lineColor={{ width: width(100) }} />
          <FlatList
            data={commentList}
            keyExtractor={item => item.id}
            renderItem={renderComments}
            ItemSeparatorComponent={() => <HorizontalLine lineColor={{ width: width(100) }} />}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};