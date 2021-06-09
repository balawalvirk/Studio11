import React, {useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import Header from '../../components/Header';
import {height, width} from 'react-native-dimension';
import AppColors from '../../utills/AppColors';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import {ItemImageList} from '../../dummyData';
import HorizontalLine from '../../components/HorizontalLine';
import NewItemImage from '../../components/NewItemImage';
import CameraModel from '../../components/CameraModal';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-crop-picker';
import {addToArray, getData, uploadImage} from '../../firebaseConfig';
import {login} from '../../Redux/Actions/Auth';
import uuid from 'react-native-uuid';
export default function PublishNewItem(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const [CameraModelView, setCameraModelView] = useState(false);
  const [imageStatus, setimageStatus] = useState(false);
  const [waiting, setwaiting] = useState(false);
  const [itemImage, setitemImage] = useState('');
  const [itemName, setitemName] = useState('');
  const [itemImageName, setitemImageName] = useState('');
  const [itemPrice, setitemPrice] = useState('');
  const [itemDetail, setitemDetail] = useState('');
  const [imageArray, setImageArray] = useState([]);

  const [itemNameError, setItemNameError] = useState('');
  const [descrError, setDescError] = useState('');
  const [priceError, setPriceError] = useState('');

  const Adddata = async () => {
    if (itemName == '') {
      setItemNameError('Please enter item name!');
      return;
    }
    setItemNameError('');
    if (itemPrice == '') {
      setPriceError('Please enter item price!');
      return;
    }
    setPriceError('');
    if (itemDetail == '') {
      setDescError('Please enter item description!');
      return;
    }
    setDescError('');
    if (imageArray.length == 0) {
      alert('Please select item images!');
      return;
    }
    setwaiting(true);
    let urls = [];
    for (let i = 0; i < imageArray.length; i++) {
      const imageUri = imageArray[i].uri;
      const name = imageArray[i].name;
      const imageRef = 'SHOPITEMS/' + auth().currentUser.uid + '/' + name;
      const result = await uploadImage(imageUri, imageRef);
      urls.push({
        imageUri: result,
        imageRef: imageRef,
      });
    }
    const newItem = {
      id: uuid.v4(),
      name: itemName,
      price: itemPrice,
      description: itemDetail,
      images: urls,
      rating: 0,
      ratingCount: 0,
    };
    addToArray('Users', auth().currentUser.uid, 'Items', [newItem])
      .then(() => {
        if (user.Items) {
          dispatch(
            login({
              ...user,
              Items: [...user.Items, newItem],
            }),
          );
        } else {
          dispatch(
            login({
              ...user,
              Items: [newItem],
            }),
          );
        }
        setwaiting(false);
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error.message);
        setwaiting(false);
      });
  };
  const renderImage = ({item, index}) => (
    <NewItemImage
      disabled={true}
      imageAddress={{uri: item.uri}}
      onPress={() =>
        setImageArray(imageArray.filter((obj) => obj.uri != item.uri))
      }
      containerStyle={{marginRight: width(2)}}
    />
  );
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Publish New Item'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}
      footerUnScrollable={() =>
        waiting ? null : (
          <View style={styles.footer}>
            <Button
              title="Publish New Item"
              onPress={() => Adddata()}
              containerStyle={styles.btn}
            />
          </View>
        )
      }
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.bringCenter}>
          {waiting ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={AppColors.primaryGold} />
            </View>
          ) : (
            <>
              <InputField
                fielderror={itemNameError}
                label="Item Name"
                placeholder="esse corporis"
                value={itemName}
                onChangeText={(itemName) => setitemName(itemName)}
                inputStyle={{borderRadius: width(4)}}
              />
              <InputField
                label="Item Price"
                placeholder="$130"
                value={itemPrice}
                onChangeText={(itemPrice) => setitemPrice(itemPrice)}
                inputStyle={{borderRadius: width(4)}}
              />
              <HorizontalLine lineColor={{marginTop: 0}} />

              {imageArray.length > 0 && (
                <FlatList
                  contentContainerStyle={{alignItems: 'center'}}
                  style={styles.flatlist}
                  horizontal
                  data={imageArray}
                  renderItem={renderImage}
                  keyExtractor={(item) => item.name}
                />
              )}
              <Button
                onPress={() => setCameraModelView(true)}
                title="Upload images"
                containerStyle={styles.btn}
              />
              <HorizontalLine
                lineColor={{marginTop: 0, marginBottom: height(1.5)}}
              />
              <InputField
                inputStyle={{height: 'auto'}}
                fielderror={descrError}
                value={itemDetail}
                onChangeText={(itemDetail) => setitemDetail(itemDetail)}
                numoflines={15}
                placeholder="Description..."
                multiline
                label="Item Description"
              />
            </>
          )}
        </View>
      </View>
      <CameraModel
        isVisible={CameraModelView}
        onClose={() => setCameraModelView(false)}
        iconName={'photo-camera'}
        labelName={'Take Photo'}
        imageFromCamera={() =>
          ImagePicker.openCamera({}).then((image) => {
            setImageArray([
              ...imageArray,
              {name: image.path.split('/').pop(), uri: image.path},
            ]);
            setCameraModelView(false);
          })
        }
        imageFromGallery={() =>
          ImagePicker.openPicker({}).then((image) => {
            setImageArray([
              ...imageArray,
              {name: image.path.split('/').pop(), uri: image.path},
            ]);
            setCameraModelView(false);
          })
        }
      />
    </ScreenWrapper>
  );
}
