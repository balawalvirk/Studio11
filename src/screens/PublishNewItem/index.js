import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import { height, width } from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { ItemImageList } from '../../dummyData'
import HorizontalLine from '../../components/HorizontalLine'; import NewItemImage from '../../components/NewItemImage';
import CameraModel from '../../components/CameraModal';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import { addToArray, getData, uploadImage } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import uuid from 'react-native-uuid';
export default function PublishNewItem(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user)
  const [CameraModelView, setCameraModelView] = useState(false);
  const [imageStatus, setimageStatus] = useState(false);
  const [waiting, setwaiting] = useState(false);
  const [itemImage, setitemImage] = useState('');
  const [itemName, setitemName] = useState('');
  const [itemImageName, setitemImageName] = useState('');
  const [itemPrice, setitemPrice] = useState('');
  const [itemDetail, setitemDetail] = useState('');
  const Adddata = () => {
    setwaiting(true)
    uploadImage(itemImage, 'SHOPITEMS/' + itemImageName)
      .then(async (result) => {
        await addToArray('Users', auth().currentUser.uid, "Items", [
          {
            Id: uuid.v4(),
            ItemTitle: itemName,
            ItemPrice: itemPrice,
            ItemDetails: itemDetail,
            ItemImage: result
          }
        ])
        dispatch(login({
          ...user,
          Items: [...user.Items ?? [], {
            ItemTitle: itemName,
            ItemPrice: itemPrice,
            ItemDetails: itemDetail,
            ItemImage: result
          }]
        }))
        setCameraModelView(false)
        setwaiting(false)
        setimageStatus(false)
        setitemName('')
        setitemPrice('')
        setitemDetail('')
        props.navigation.goBack()
      })
      .catch(error => {
        console.error("Error is =============>: ", error);
      });

  };
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Publish New Item'} leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()} />}
      footerUnScrollable={() =>
        <View style={styles.footer}>
          <Button title='Publish New Item'
            disabled={!imageStatus}
            onPress={() => Adddata()}
            gradientContainerStyle={{ width: '100%', borderRadius: width(2.5), paddingVertical: height(2) }} />
        </View>}
      transclucent statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>

        <View style={styles.bringCenter}>
          {waiting ? <ActivityIndicator size="large" color={AppColors.primaryGold} /> :
            <>
              <InputField label='Item Name' placeholder='esse corporis' value={itemName}
                onChangeText={(itemName) => setitemName(itemName)}
                inputStyle={{ borderRadius: width(4) }} />
              <InputField label='Item Price' placeholder='$130' value={itemPrice}
                onChangeText={(itemPrice) => setitemPrice(itemPrice)}
                inputStyle={{ borderRadius: width(4) }} />
              <HorizontalLine lineColor={{ marginTop: 0, }} />
              {imageStatus ?
                <View style={styles.capturedImageDiv}>
                  <NewItemImage
                    imageAddress={{ uri: itemImage }}
                    onPress={() => console.log('delete item ?')}
                  /></View>
                : null}
              <Button
                onPress={() => setCameraModelView(true)}
                title='Upload images' gradientContainerStyle={{
                  width: '100%', borderRadius: width(2.5), paddingVertical: height(2)
                }} />
              <HorizontalLine lineColor={{ marginTop: 0, }} />
              <InputField value={itemDetail}
                onChangeText={(itemDetail) => setitemDetail(itemDetail)}
                multiline label='Item Description'
                placeholder='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam et mauris pharetra, varius augue sed, rhoncus sapien. Duis commodo turpis in erat convallis, non facilisis velit rhoncus. Morbi faucibus ante et ex ullamcorper, et imperdiet leo tincidunt. Nulla facilisi. Fusce tempus malesuada maximus. Nam eu eleifend metus. Nulla ac tincidunt augue, eget iaculis nunc. Fusce mi mi, sodales ac ullamcorper at, molestie eget lectus. Nullam feugiat eget tortor in scelerisque. Phasellus ultrices iaculis facilisis. Proin vel imperdiet lacus. Suspendisse vestibulum scelerisque sem at congue.'
                inputStyle={{ borderRadius: width(4) }} />
            </>}
        </View>
      </View>
      <CameraModel isVisible={CameraModelView} onClose={() => setCameraModelView(false)}
        iconName={"photo-camera"}
        labelName={'Take Photo'}
        imageFromCamera={
          () => ImagePicker.openCamera({
          }).then(image => {
            setitemImage(image.path);
            setitemImageName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true)
          })
        }
        imageFromGallery={() => ImagePicker.openPicker({
        }).then((image) => {
          setitemImage(image.path);
          setitemImageName(image.path.split('/').pop());
          setCameraModelView(false);
          setimageStatus(true)
        })}
      />
    </ScreenWrapper>
  );
};