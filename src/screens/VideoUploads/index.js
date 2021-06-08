import React, { useState } from 'react';
import { View, Image, FlatList, Text } from 'react-native';
import styles from './styles';
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
import { ThumbnailList } from '../../dummyData';
export default function VideoUploads(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Video Uploads'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.searchView}>
          <InputField searchIcon inputStyle={{ borderRadius: width(3) }}
            searchIconstyle={{ color: AppColors.primaryGold, fontSize: width(6) }}
            placeholder={'Search'} containerStyles={{ width: '80%' }} />
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image style={styles.filterButton}
              source={require('../../assets/images/filter.png')} />
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{ paddingVertical: width(8) }}
          data={ThumbnailList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <Thumbnail reactions
                cardstyle={{ marginVertical: width(2), width: width(90) }}
                thumbnailImage={item.thumbnailImage}
                onPress={() => props.navigation.navigate('VideoPlay')}
                videoTitle={item.videoTitle}
                views={item.views}
                likes={item.likes}
                comments={item.comments} />
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
          <InputField containerStyles={{ width: '100%' }} label={'From'} placeholder={'April 23, 2021'} />
          <InputField containerStyles={{ width: '100%' }} label={'To'} placeholder={'April 23, 2021'} />
          <HorizontalLine lineColor={{ backgroundColor: AppColors.white09, marginTop: 0, marginVertical: height(2), width: width(60) }} />
          <Text style={styles.modalTitle}>Sort</Text>
          <InputField containerStyles={{ width: '100%' }} label={'Time'} placeholder={'Latest - Oldest'} />
          <InputField containerStyles={{ width: '100%' }} label={'Name'} placeholder={'A - Z'} />
          <HorizontalLine lineColor={{ backgroundColor: AppColors.white09, marginTop: 0, marginVertical: height(2), width: width(60) }} />
          <HighlightedText text={'Clear All'} />
          <HorizontalLine lineColor={{ backgroundColor: AppColors.white09, marginTop: height(2), marginVertical: height(2), width: width(60) }} />
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