import React, { useState } from 'react';
import { View, Image, FlatList, Text, ImageBackground } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import Thumbnail from '../../components/Thumbnail';
import Icon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import InputField from '../../components/InputField';
import Video from 'react-native-video';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
import PostReview from '../../components/PostReview';
import { ScrollView } from 'react-native-gesture-handler';
export default function VideoPlay(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);

  const CommentList = [
    {
      id: '1',
      commentTitle: 'Nasir Zulauf',
      commentTime: 'April 30, 2021 10:52 PM',
      comment: 'Quia maxime assumenda estofficia veniam facilis et.'
    },
    {
      id: '2',
      commentTitle: 'Riboe Trebblay',
      commentTime: 'March 5, 2021 7:25 AM',
      comment: 'Quis soluta magnam.'
    },
    {
      id: '3',
      commentTitle: 'Gene Stracke',
      commentTime: 'April 5, 2021 2:05 PM',
      comment: 'Molestiae eligendi voluptatem repudiandae tempore.'
    },
    {
      id: '4',
      commentTitle: 'Keon Glover',
      commentTime: 'April 19, 2021 11:20 AM',
      comment: 'Beatae quia molestias.'
    },
    {
      id: '5',
      commentTitle: 'Wilbert Dibbert',
      commentTime: 'March 9, 2021 7:08 PM',
      comment: 'Aut ipsam neque libero sit voluptates eveniet modi ab.'
    },
    {
      id: '6',
      commentTitle: 'Carmella Kris',
      commentTime: 'April 3, 2021 2:25 AM',
      comment: 'Maiores quia rerum a distinctio laboroiosam inventore beatae inventore.'
    },
    {
      id: '7',
      commentTitle: 'Ms. Paxton Dibbert',
      commentTime: 'April 11, 2021 5:32 PM',
      comment: 'Voluptas architecto eum cupiditate.'
    },
    {
      id: '8',
      commentTitle: 'Hilario Gleason DVM',
      commentTime: 'March 2, 2021 12:11 AM',
      comment: 'Blanditis pariatur ea placeat atque.'
    },
    {
      id: '9',
      commentTitle: 'Rhianna Smitham',
      commentTime: 'April 17, 2021 4:23 PM',
      comment: 'Sapiente iure dolor sit nam corrupti dolorem.'
    },


  ];
  return (
    <ScreenWrapper headerUnScrollable={() =>
      <Header headerTitle={'Video Uploads'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        {/* <Video
          resizeMode="contain"
          controls
          source={require('../../assets/Videos/1.mp4')}   // Can be a URL or a local file.
          paused
          style={styles.bgImage}
        /> */}
        <ImageBackground
          style={styles.bgImage}
          source={require('../../assets/Videos/1.png')}
          resizeMode='stretch'>
          <Icon name='controller-play' style={styles.playButton} />
        </ImageBackground>
        <ScrollView contentContainerStyle={{
          // paddingHorizontal: width(5),
          // alignSelf: 'center'
        }}
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
              <Button title="View Barber Profile" containerStyle={{ width: '100%' }}
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
            <MaterialIcons style={styles.commentIcon} name='comment'/>
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
          {/* <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} /> */}
          {/* <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} />
          <View style={styles.row}>
            <Text style={styles.whiteText}>Nasir Zulauf</Text>
            <Text style={styles.white50}>April 30, 2021 10:52 PM</Text>
          </View>
          <Text style={styles.comment}>Quia maxime assumenda estofficia veniam facilis et.</Text>
           <HorizontalLine lineColor={{ width: width(100) }} /> */}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};