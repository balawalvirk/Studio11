import React, { useState } from 'react';
import { FlatList, Image, Text, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import Header from '../../components/Header';
import { TouchableOpacity } from 'react-native-gesture-handler';

import HighlightedText from '../../components/HighlightedText';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import ScreenWrapper from '../../components/ScreenWrapper';
import Thumbnail from '../../components/Thumbnail';
import AppColors from '../../utills/AppColors';
import styles from './styles';
import ModalDropdown from 'react-native-modal-dropdown'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo'
import { AlphaSortTypes, SortTypes } from '../../utills/Enums';
export default function EditVideoUploads(props) {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const videos = useSelector((state) => state.Barber.videos);
  const [searchedVideos, setSearchedVideos] = useState([])
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [fromDateErr, setFromDateErr] = useState('')
  const [toDateErr, setToDateErr] = useState('')
  const [fromDB, setFromDB] = useState(null)
  const [toDB, setToDB] = useState(null)
  const [pickerMode, setPickerMode] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [selectedPrice, setSelectedPrice] = useState(SortTypes.LOW_TO_HIGH)
  const priceSort = [SortTypes.LOW_TO_HIGH, SortTypes.HIGH_TO_LOW]
  const alphaSort = [AlphaSortTypes.A_Z, AlphaSortTypes.Z_A]
  const [selectedAlpha, setSelectedAlpha] = useState('A - Z')


  const search = (val) => {
    const newData = videos.filter(item => {
      const itemData = `${item.VideoTitle.toUpperCase()} ${item.VideoTitle.toUpperCase()} ${item.VideoTitle.toUpperCase()} `;
      const textData = val.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData)
    setSearchedVideos(newData)
  }
  const renderThumbnail = ({ item }) =>
    <Thumbnail
      editable
      cardstyle={{ width: width(90) }}
      containerStyle={{ marginVertical: width(2) }}
      thumbnailImage={{ uri: item.videoThumb }}
      onPress={() =>
        props.navigation.navigate('EditUploadedVideo', { item })
      }
      videoTitle={item.VideoTitle}
      views={item.views}
    />
  const renderRightIcon = () =>
    <View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('SelectDelete')}>
        <Image
          source={require('../../assets/images/binIcon.png')}
          style={{ width: width(5), height: width(5) }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  const onDateTimePick = (date) => {
    const time = firestore.Timestamp.fromDate(date)
    if (pickerMode == 0) {
      setFromDate(moment(date).format('MMMM DD, YYYY'))
      setFromDB(time)
    } else {
      setToDate(moment(date).format('MMMM DD, YYYY'))
      setToDB(time)
    }
    setDatePickerVisible(false);
  };
  const applyFilters = async () => {
    setLoading(true)
    let vids = []
    let ref = firestore().collection('Videos')
    if (fromDate != '' && toDate != '') {
      ref = ref
        .where('timestamp', '>=', fromDB)
        .where('timestamp', '<=', toDB)
    } else if (fromDate != '') {
      ref = ref
        .where('timestamp', '>=', fromDB)
    } else if (toDate != '') {
      ref = ref
        .where('timestamp', '<=', toDB)
    }
    const snapshot = await ref.get()
    snapshot.forEach(doc => {
      vids.push(doc.data())
    })
    setSearchedVideos(vids)
    setModalVisible(false)
  }
  const renderPriceRow = (data) =>
    <View
      style={styles.priceContainer}>
      <Text style={styles.rowText}>{data}</Text>
    </View>
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Edit Video Uploads'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
          renderIconRight={renderRightIcon}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <Button
          title="Upload a video"
          onPress={() => props.navigation.navigate('UploadVideo')}
        />
        <HorizontalLine
          lineColor={{ width: width(90), marginBottom: height(2) }}
        />
        <Text style={styles.white50}>Please select a video to edit.</Text>
        <View style={styles.searchView}>
          <InputField
            searchIcon
            inputStyle={{ borderRadius: width(3) }}
            searchIconstyle={{ color: AppColors.primaryGold, fontSize: width(6) }}
            placeholder={'Search'}
            containerStyles={{ width: '80%', marginTop: height(2) }}
            onChangeText={text => search(text)}
          />
          <TouchableOpacity style={{ marginTop: height(1) }} onPress={() => setModalVisible(true)}>
            <Image
              style={styles.filterButton}
              source={require('../../assets/images/filter.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={{ paddingVertical: width(8) }}
          data={searchedVideos.length > 0 ? searchedVideos : videos}
          keyExtractor={(item) => item.Id}
          renderItem={renderThumbnail}
        />
      </View>
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Filter by Date</Text>
          <TouchableOpacity onPress={() => {
            setPickerMode(0)
            setDatePickerVisible(true)
          }}>
            <InputField
              fielderror={fromDateErr}
              containerStyles={styles.width60}
              inputStyle={{ height: height(5) }}
              label={'From'}
              labelStyle={styles.labelStyle}
              placeholder={'April 23, 2021'}
              editable={false}
              value={fromDate}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setPickerMode(1)
            setDatePickerVisible(true)
          }}>
            <InputField
              fielderror={toDateErr}
              containerStyles={styles.width60}
              inputStyle={{ height: height(5) }}
              label={'To'}
              labelStyle={styles.labelStyle}
              placeholder={'April 23, 2021'}
              value={toDate}
              editable={false}
            />
          </TouchableOpacity>
          <HorizontalLine
            lineColor={{
              backgroundColor: AppColors.white09,
              marginTop: 0,
              marginVertical: height(2),
              width: width(60),
            }}
          />
          <Text style={styles.modalTitle}>Sort</Text>
          <ModalDropdown
            renderRow={renderPriceRow}
            onSelect={(data) => setSelectedPrice(priceSort[data])}
            dropdownStyle={styles.dropDown}
            options={priceSort}>
            <View style={{ marginVertical: height(1) }}>
              <Text style={styles.label}>Price</Text>
              <View style={styles.dropContainer}>
                <Text style={styles.selectedText}>{selectedPrice}</Text>
                <Entypo
                  name={'chevron-down'}
                  size={width(4)}
                  color={AppColors.primaryGold}
                />
              </View>
            </View>
          </ModalDropdown>
          <ModalDropdown
            renderRow={renderPriceRow}
            onSelect={(index, option) => setSelectedAlpha(option)}
            dropdownStyle={styles.dropDown}
            options={alphaSort}>
            <View style={{ marginVertical: height(1) }}>
              <Text style={styles.label}>Price</Text>
              <View style={styles.dropContainer}>
                <Text style={styles.selectedText}>{selectedAlpha}</Text>
                <Entypo
                  name={'chevron-down'}
                  size={width(4)}
                  color={AppColors.primaryGold}
                />
              </View>
            </View>
          </ModalDropdown>


          <HorizontalLine
            lineColor={styles.dash}
          />
          <HighlightedText text={'Clear All'} />
          <HorizontalLine
            lineColor={{
              backgroundColor: AppColors.white09,
              marginTop: height(2),
              marginVertical: height(2),
              width: width(60),
            }}
          />
          <View style={styles.buttonRow}>
            <Button
              title={'Apply'}
              onPress={() => applyFilters()}
              containerStyle={styles.cancelBtn}
            />
            <Button
              planButton
              textStyle={{ color: AppColors.white }}
              containerStyle={styles.cancelBtn}
              title={'Cancel'}
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <DateTimePickerModal
        isVisible={datePickerVisible}
        mode="date"
        onConfirm={onDateTimePick}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ScreenWrapper>
  );
}
