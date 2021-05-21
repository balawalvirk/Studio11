import React, { useState } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import AppColors from '../../utills/AppColors';
import Thumbnail from '../../components/Thumbnail';
import InputField from '../../components/InputField';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import HorizontalLine from '../../components/HorizontalLine';
import HighlightedText from '../../components/HighlightedText';
export default function SelectDelete(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const ThumbnailList = [
    {
      id: '1',
      videoTitle: 'Alias quia nostrum.',
      views: '412',
      likes: '4.1k',
      comments: '345',
      thumbnailImage: require('../../assets/Videos/1.png')
    },
    {
      id: '2',
      videoTitle: 'Ipsa ratione accusamus labore',
      views: '706',
      likes: '4.1k',
      comments: '4.1k',
      thumbnailImage: require('../../assets/Videos/2.png')
    },
    {
      id: '3',
      videoTitle: 'Sequi explicabo iusto reiciendis',
      views: '791',
      likes: '4.1k',
      comments: '4.1k',
      thumbnailImage: require('../../assets/Videos/3.png')
    },
    {
      id: '4',
      videoTitle: 'lusto occaecati omnis culpa nihil',
      views: '939',
      likes: '4.1k',
      comments: '4.1k',
      thumbnailImage: require('../../assets/Videos/4.png')
    },

  ];
  const [record, setrecord] = useState(ThumbnailList)
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Select & Delete'} leadingIcon={'x'}
        onPressLeadingIcon={() => props.navigation.goBack()}
        renderIconRight={() => <View ><TouchableOpacity 
        onPress={() => props.navigation.goBack()}>
          <Image source={require('../../assets/images/binIcon.png')}
            style={{ width: width(5), height: width(5) }} resizeMode='contain' /></TouchableOpacity>
        </View>}
         />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
    
        <FlatList
          contentContainerStyle={{ paddingVertical: width(8) }}
          data={record}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <Thumbnail reactions editable checkicon
                cardstyle={{ marginVertical: width(2), width: width(90) }}
                thumbnailImage={item.thumbnailImage}
                onPress={() => props.navigation.navigate('EditUploadedVideo')}
                videoTitle={item.videoTitle}
                views={item.views}
                likes={item.likes}
                comments={item.comments}
                onPress={() => {
                  let arr = [...record]
                  let findIndex = arr.findIndex((data) => data.id == item.id)
                  arr[findIndex].isSelected = !arr[findIndex].isSelected
                  setrecord(arr)
                }}
                checkicon
                iconName={item.isSelected ? 'check-box-outline' : 'checkbox-blank-outline'} />
            );
          }}
        />
      </View>
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView} >
          <Text style={styles.modalTitle}>Filter by Date</Text>
          <InputField containerStyles={{width:'100%'}} label={'From'} placeholder={'April 23, 2021'} />
          <InputField containerStyles={{width:'100%'}}  label={'To'} placeholder={'April 23, 2021'} />
          <HorizontalLine lineColor={{backgroundColor:AppColors.white09,marginTop:0,marginVertical:height(2),width:width(60)}} />
          <Text style={styles.modalTitle}>Sort</Text>
          <InputField containerStyles={{width:'100%'}} label={'Time'} placeholder={'Latest - Oldest'} />
          <InputField containerStyles={{width:'100%'}}  label={'Name'} placeholder={'A - Z'} />
          <HorizontalLine lineColor={{backgroundColor:AppColors.white09,marginTop:0,marginVertical:height(2),width:width(60)}} />
          <HighlightedText text={'Clear All'} />
          <HorizontalLine lineColor={{backgroundColor:AppColors.white09,marginTop:height(2),marginVertical:height(2),width:width(60)}} />
          <View style={styles.buttonRow}>
            <Button title={'Apply'} onPress={() => setModalVisible(false)} />
            <Button planButton textStyle={{ color: AppColors.white }}
              containerStyle={{
                backgroundColor: AppColors.transparent,
                borderColor: AppColors.primaryGold, borderWidth: width(0.15)
              }}
              title={'Cancel'} onPress={() => setModalVisible(false)} />
          </View>

        </View>
      </Modal>
    </ScreenWrapper>
  );
};