import React from 'react';
import { Text, ImageBackground, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AppColors from '../../utills/AppColors';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { width } from 'react-native-dimension';

const Thumbnail = ({
  containerStyle, onPress, thumbnailImage, videoTitle, views, cardstyle, likes, comments, reactions, editable, iconName, checkicon
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <FastImage
        style={[styles.videoThumbnail, cardstyle]}
        source={thumbnailImage}
      />
      <View style={[styles.imageContent, cardstyle]}>
        {checkicon ? <MaterialCommunityIcons name={iconName} style={styles.checkIcon} /> : null}
        {editable &&
          <View style={{ flexDirection: 'row-reverse', }}>
            <MaterialCommunityIcons name="pencil"
              onPress={onPress}
              style={styles.editIcon}
            />
          </View>}
        <View style={styles.emptyView}></View>
        <Icon name='controller-play'
          style={styles.playButton} />
        <View style={styles.videoStats}>
          <View style={styles.leftSection}>
            <Text style={styles.whiteText}>{videoTitle}</Text>
            <View style={styles.row}>
              <Ionicons name='eye' style={styles.viewIcon} />
              <Text style={styles.white50}>{views}</Text>
            </View>
          </View>
          {reactions ?
            <View style={styles.rightSection}>
              <View style={styles.row}>
                <Ionicons name='heart' style={styles.reactIcons} color={AppColors.primaryGold} />
                <Text style={styles.white50}>{likes}</Text>
              </View>
              <View style={styles.row}>
                <MaterialIcons style={styles.reactIcons} name='comment' color='white' />
                <Text style={styles.white50}>{comments}</Text>

              </View>
            </View> : null
          }
        </View>
      </View>
      {/* </ImageBackground> */}
    </TouchableOpacity>
  );
};

export default Thumbnail;
