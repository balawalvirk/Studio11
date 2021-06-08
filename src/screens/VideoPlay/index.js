import React, { useState } from 'react';
import { View, FlatList, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import PostReview from '../../components/PostReview';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { CommentList } from '../../dummyData';
import Video from 'react-native-video';
export default function VideoPlay(props) {
  const [liked, setLiked] = useState(false);
  const [videoPlay, setvideoPlay] = useState(false);


  return (
    <ScreenWrapper headerUnScrollable={() =>
      <Header headerTitle={'Video Uploads'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        {videoPlay ?
          <Video
            resizeMode="contain"
            controls
            source={require('../../assets/Videos/1.mp4')}   // Can be a URL or a local file.
            // paused
            style={styles.bgImage}
          />
          :
          <TouchableOpacity onPress={() => setvideoPlay(true)}>
            <ImageBackground
              style={styles.bgImage}
              source={require('../../assets/Videos/1.png')}
              resizeMode='stretch'>
              <Icon name='controller-play' style={styles.playButton} />
            </ImageBackground>
          </TouchableOpacity>}
        <ScrollView
          style={styles.ScrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <Text style={styles.whiteText}>Alias quia nostrum.</Text>
              <View style={{ flexDirection: 'row' }}>
                <Ionicons name='eye' style={styles.viewIcon} />
                <Text style={styles.white50}>412</Text>
              </View>
            </View>
            <View style={styles.rightSection}>
              <Icon name={liked ? "heart" : "heart-outlined"} onPress={() => setLiked(!liked)} style={styles.likeIcon} />
              <Text style={styles.white50}>4.1k</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.leftSection}>
              <Text style={styles.whiteText}>Published by:</Text>
              <Text style={styles.white50}>Barber Name here</Text>
            </View>
            <View style={styles.rightSection}>
              <Button title="View Barber Profile" containerStyle={{ width: width(45) }}
                onPress={() => props.navigation.navigate('BarberProfile')} />
            </View>
          </View>
          <HorizontalLine lineColor={styles.Centerline} />
          <View style={styles.bringCenter}><Text style={styles.whiteText}>Video Description</Text>
            <Text style={styles.white50}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.</Text>
          </View>
          <HorizontalLine lineColor={styles.Centerline} />
          <PostReview containerStyle={styles.bringCenter} label={'Write a comment:'} />
          <HorizontalLine lineColor={styles.Centerline} />
          <View style={{ flexDirection: 'row', marginLeft: width(5) }}>
            <MaterialIcons style={styles.commentIcon} name='comment' />
            <Text style={styles.whiteText}>Comments (239)</Text>
          </View>
          <HorizontalLine lineColor={{ width: width(100) }} />
          <FlatList
            data={CommentList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View >
                  <View style={styles.row}>
                    <Text style={styles.whiteText}>{item.commentTitle}</Text>
                    <Text style={styles.white50}>{item.commentTime}</Text>
                  </View>
                  <Text style={styles.comment}>{item.comment}</Text>
                  <HorizontalLine lineColor={{ width: width(100) }} />
                </View>
              );
            }}
          />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};