import React from 'react';
import { Text, View, Image, FlatList } from 'react-native';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import HairStyle from '../../components/HairStyle';
import Icon from 'react-native-vector-icons/dist/Entypo';
import HorizontalLine from '../../components/HorizontalLine';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Button from '../../components/Button';
import Thumbnail from '../../components/Thumbnail';
export default function ProfileBarber(props) {
  const user = useSelector((state) => state.Auth.user);

  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Profile'} leadingIcon={'menu'}
        renderIconRight={() => <MaterialCommunityIcons name="pencil"
          onPress={() => props.navigation.navigate('EditProfileBarber')}
          style={{ fontSize: width(5), color: AppColors.primaryGold }}
        />}
        onPressLeadingIcon={() => props.navigation.openDrawer()} />
    } transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.ProfileDetail}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.stylerTitle}>Dorris Ortiz</Text>
              <Text style={styles.whiteText}>Email:  <Text style={styles.white50}>dorris@gmail.com</Text></Text>
              <Text style={styles.whiteText}>Haircuts:  <Text style={styles.white50}>456</Text></Text>
              <Text style={styles.whiteText}>Earnings:  <Text style={styles.white50}>$364</Text></Text>
              <Text style={styles.whiteText}>Reviews:  <Text style={styles.white50}>467</Text></Text>
              <Text style={styles.whiteText}>Ratings:  <Text style={styles.white50}>4.5</Text></Text>

            </View>
          </View>
          <Image style={styles.imageSection} source={require('../../assets/images/cuttings/1.png')} />
        </View>
        <HorizontalLine />
        <Button title='Manage Shop Items'
          onPress={() => props.navigation.navigate('ManageShopItems')}
          gradientContainerStyle={{ borderRadius: width(2.5), paddingVertical: height(1.5) }} />
        <HorizontalLine lineColor={{ marginTop: 0 }} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Edit Video Uploads</Text>
          <HighlightedText text={'View all'}
            onPress={() => props.navigation.navigate('EditVideoUploads')}
          />
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: width(8) }}
          data={user?.Videos ?? []}
          keyExtractor={item => item.Id}
          renderItem={({ item }) => {
            console.log(item.thumbnailImage)
            return (
              <Thumbnail
                thumbnailImage={{ uri: item.videoThumb }}
                editable
                onPress={() => props.navigation.navigate('EditUploadedVideo', { item })}
                videoTitle={item.videoTitle}
                views={'412'} />
            );
          }}
        />
        <Button title='Upload a Video'
          onPress={() => props.navigation.navigate('UploadVideo')}
          gradientContainerStyle={{ borderRadius: width(2.5), paddingVertical: height(1.5) }} />
        <HorizontalLine lineColor={{ marginTop: 0 }} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Hair Styles</Text>
          <HighlightedText text={'Manage'} onPress={() => props.navigation.navigate('ManageHairStyles')} />
        </View>
        <FlatList
          numColumns={'2'}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          showsHorizontalScrollIndicator={false}
          data={user?.Cuttings ?? []}
          keyExtractor={item => item.Id}
          renderItem={({ item }) => {
            return (
              <HairStyle
                containerStyle={{ width: width(40), height: width(40) }}
                cuttingImage={{ uri: item.CuttingImage }} cuttingTitle={item.CuttingTitle} />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};