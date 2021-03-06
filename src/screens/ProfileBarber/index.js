import React, { useState } from 'react';
import { Text, View, Image, FlatList, Linking } from 'react-native';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/Button';
import Thumbnail from '../../components/Thumbnail';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStripeExpressAccount } from '../../utills/Api';
import { login } from '../../Redux/Actions/Auth'
export default function ProfileBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const videos = useSelector((state) => state.Barber.videos);
  const cuttings = useSelector((state) => state.Barber.cuttings);
  const dispatch = useDispatch()
  const [stripeLoading, setStripeLoading] = useState(false)
  const onCreateStripeAccount = async () => {
    try {
      setStripeLoading(true)
      const response = await createStripeExpressAccount(user?.id)
      console.log(response)
      if (response?.success) {
        dispatch(login({
          ...user,
          expressAccount: response?.expressAccount
        }))
        Linking.openURL(`${response?.link?.url}`)
      } else {
        console.log(response.message + 'asd')
      }
    } catch (error) {
      console.log(error.message)
    }
    setStripeLoading(false)
  }
  const renderVideoThumbnail = ({ item }) =>
    <Thumbnail
      thumbnailImage={{ uri: item.videoThumb }}
      editable
      onPress={() =>
        props.navigation.navigate('EditUploadedVideo', { item })
      }
      videoTitle={item.videoTitle}
      views={item.views}
    />
  const renderCuttings = ({ item }) =>
    <HairStyle
      disabled
      containerStyle={{ width: width(40), height: width(40) }}
      cuttingImage={{ uri: item.CuttingImage }}
      cuttingTitle={item.CuttingTitle}
    />
  const renderOrderIcon = () =>
    <TouchableOpacity
      onPress={() => props.navigation.navigate('TrackOrder')}
      style={styles.icon}>
      <Feather
        name="box"
        style={styles.renderedIcons}
      />
    </TouchableOpacity>
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Profile'}
          leadingIcon={'menu'}
          renderTrackOrder={renderOrderIcon}
          renderIconRight={() => (
            <View style={styles.icon}>
              <MaterialCommunityIcons
                name="pencil"
                onPress={() => props.navigation.navigate('EditProfileBarber')}
                style={styles.renderedIcons}
              />
            </View>
          )}
          onPressLeadingIcon={() => props.navigation.openDrawer()}
        />
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.ProfileDetail}>
          <View style={styles.textSection}>
            <View>
              <Text style={styles.stylerTitle}>
                {user.FirstName + ' ' + user.LastName}
              </Text>
              <Text style={styles.whiteText}>
                Email: <Text style={styles.white50}>{user?.Email}</Text>
              </Text>
              <Text style={styles.whiteText}>
                Haircuts: <Text style={styles.white50}>{user.HairCutCount}</Text>
              </Text>
              <Text style={styles.whiteText}>
                Earnings: <Text style={styles.white50}>$364</Text>
              </Text>
              <Text style={styles.whiteText}>
                Reviews: <Text style={styles.white50}>{user?.RatingCount}</Text>
              </Text>
              <Text style={styles.whiteText}>
                Ratings: <Text style={styles.white50}>{user?.Rating?.toFixed(1)}</Text>
              </Text>
            </View>
          </View>
          <Image
            style={styles.imageSection}
            source={
              user.Image
                ? { uri: user?.Image?.imageUrl }
                : require('../../assets/images/cuttings/1.png')
            }
          />
        </View>

        <Button
          isLoading={stripeLoading}
          containerStyle={styles.btn}
          title={user?.expressAccount ? "Update Stripe Account" : "Create Stripe Account"}
          onPress={onCreateStripeAccount}
        />
        <HorizontalLine />
        <Button
          containerStyle={styles.btn}
          title="Manage Shop Items"
          onPress={() => props.navigation.navigate('ManageShopItems')}
        />
        <HorizontalLine lineColor={{ marginTop: 0 }} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Edit Video Uploads</Text>
          <HighlightedText
            text={'View all'}
            onPress={() => props.navigation.navigate('EditVideoUploads')}
          />
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: width(8) }}
          data={videos}
          keyExtractor={(item) => item.Id}
          renderItem={renderVideoThumbnail}
        />
        <Button
          title="Upload a Video"
          onPress={() => props.navigation.navigate('UploadVideo')}
          containerStyle={styles.btn}
        />
        <HorizontalLine lineColor={{ marginTop: 0 }} />
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Hair Styles</Text>
          <HighlightedText
            text={'Manage'}
            onPress={() => props.navigation.navigate('ManageHairStyles')}
          />
        </View>
        <FlatList
          numColumns={'2'}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingVertical: height(2),
          }}
          showsHorizontalScrollIndicator={false}
          data={cuttings}
          keyExtractor={(item) => item.Id}
          renderItem={renderCuttings}
        />
      </View>
    </ScreenWrapper>
  );
}
