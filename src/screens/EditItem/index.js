import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {FlatList, View} from 'react-native';
import {height, width} from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/Button';
import CameraModel from '../../components/CameraModal';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import InputField from '../../components/InputField';
import NewItemImage from '../../components/NewItemImage';
import ScreenWrapper from '../../components/ScreenWrapper';
import {
  removeFromArray,
  removeFromSubArray,
  updateArray,
  uploadImage,
} from '../../firebaseConfig';
import AppColors from '../../utills/AppColors';
import styles from './styles';
export default function EditItem(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const {item, index} = props.route.params;
  const [itemName, setItemName] = useState(item?.name);
  const [imageArray, setImageArray] = useState(item?.images ?? []);
  const [moreImgs, setMoreImgs] = useState([]);
  const [cameraModal, setCameraModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState(item?.name);
  const [price, setPrice] = useState(item?.price);
  const [description, setDescription] = useState(item?.description);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const renderImage = ({item, index}) => {
    return (
      <NewItemImage
        disabled={true}
        imageAddress={{uri: item?.imageUri}}
        onPress={() => onDeleteImage(item, index)}
        containerStyle={{marginRight: width(2)}}
      />
    );
  };
  const updateItem = async () => {
    if (name == '') {
      setNameError('Please enter name');
      return;
    }
    setNameError('');
    if (price == '') {
      setPriceError('Please enter price');
      return;
    }
    setPriceError('');
    if (description == '') {
      setDescriptionError('Please enter description');
      return;
    }
    setDescriptionError('');
    setLoading(true);
    let urls = [];
    if (moreImgs.length > 0) {
      console.log(moreImgs);
      for (let i = 0; i < moreImgs.length; i++) {
        const imageUri = moreImgs[i].uri;
        const name = moreImgs[i].name;
        const imageRef = 'SHOPITEMS/' + auth().currentUser.uid + '/' + name;
        const result = await uploadImage(imageUri, imageRef);
        urls.push({
          imageUri: result,
          imageRef: imageRef,
        });
      }
    }
    const updatedItem = {
      id: item.id,
      name: name,
      price: price,
      description: description,
      images:
        user.Items[index].images.length > 0
          ? [...user.Items[index].images, ...urls]
          : [urls],
      rating: 0,
      ratingCount: 0,
    };
    await updateArray(
      'Users',
      auth().currentUser.uid,
      'Items',
      updatedItem,
      index,
    )
      .then(() => {
        dispatch(
          login({
            ...user,
            Items: [...user.Items],
          }),
        );
        setLoading(false);
        props.navigation.goBack();
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };
  const onDeleteImage = async (imageItem, indexItem) => {
    if (imageArray.length == 1) {
      alert('Cannot delete last image.');
      return;
    }
    const imageRef = imageItem.imageRef;
    console.log(imageRef);
    console.log('Users', auth().currentUser.uid, 'Items', index, indexItem);
    try {
      const ref = storage().ref(imageRef);
      await ref.delete();
      await removeFromSubArray(
        'Users',
        auth().currentUser.uid,
        'Items',
        index,
        indexItem,
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  const cameraPicker = () => {
    ImagePicker.openCamera({}).then((image) => {
      setMoreImgs([
        ...moreImgs,
        {name: image.path.split('/').pop(), uri: image.path},
      ]);
      setImageArray([...imageArray, {imageUri: image.path}]);
      setCameraModal(false);
    });
  };
  const galleryPicker = () => {
    ImagePicker.openPicker({}).then((image) => {
      setMoreImgs([
        ...moreImgs,
        {name: image.path.split('/').pop(), uri: image.path},
      ]);
      setImageArray([...imageArray, {imageUri: image.path}]);
      setCameraModal(false);
    });
  };
  return (
    <ScreenWrapper
      scrollEnabled
      headerUnScrollable={() => (
        <Header
          headerTitle={'Edit Item'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}
      footerUnScrollable={() => (
        <View style={styles.footer}>
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            title="Update item in shop"
            onPress={() => updateItem()}
            gradientContainerStyle={{
              borderRadius: width(2.5),
              paddingVertical: height(1),
            }}
          />
        </View>
      )}
      transclucent
      statusBarColor={AppColors.transparent}>
      <View style={styles.mainViewContainer}>
        <View style={styles.bringCenter}>
          <InputField
            fielderror={nameError}
            label="Item Name"
            placeholder="title"
            value={name}
            onChangeText={(text) => setName(text)}
            inputStyle={{borderRadius: width(4)}}
          />
          <InputField
            fielderror={priceError}
            label="Item Price"
            placeholder="$130"
            value={price}
            onChangeText={(text) => setPrice(text)}
            inputStyle={{borderRadius: width(4)}}
          />
          <HorizontalLine lineColor={{marginTop: 0}} />
          {imageArray?.length > 0 && (
            <FlatList
              contentContainerStyle={{alignItems: 'center'}}
              style={styles.flatlist}
              horizontal
              data={imageArray}
              renderItem={renderImage}
              keyExtractor={(item) => item.imageUri}
            />
          )}
          <Button
            disabled={isLoading}
            onPress={() => setCameraModal(true)}
            title="Upload more images"
            gradientContainerStyle={{
              borderRadius: width(2.5),
              paddingVertical: height(1),
            }}
          />
          <HorizontalLine lineColor={{marginTop: 0}} />
          <InputField
            fielderror={descriptionError}
            multiline
            label="Item Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
            numoflines={10}
            placeholder="Description"
            inputStyle={{borderRadius: width(4)}}
          />
        </View>
      </View>
      <CameraModel
        isVisible={cameraModal}
        onClose={() => setCameraModal(false)}
        iconName={'photo-camera'}
        labelName={'Take Photo'}
        imageFromCamera={cameraPicker}
        imageFromGallery={galleryPicker}
      />
    </ScreenWrapper>
  );
}
