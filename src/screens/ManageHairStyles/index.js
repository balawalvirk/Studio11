import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button';
import CameraModel from '../../components/CameraModal';
import HairStyle from '../../components/HairStyle';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import MediaModal from '../../components/MediaModal';
import ScreenWrapper from '../../components/ScreenWrapper';
import { addToArray, addToArrayUpdate, saveData, uploadImage } from '../../firebaseConfig';
import { setCuttings } from '../../Redux/Actions/Barber';
import AppColors from '../../utills/AppColors';
import { login } from '../../Redux/Actions/Auth'
import styles from './styles';
export default function ManageHairStyles(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Auth.user);
  const cuttings = useSelector((state) => state.Barber.cuttings);
  const [modalVisible, setModalVisible] = useState(false);
  const [CameraModelView, setCameraModelView] = useState(false);
  const [imageStatus, setimageStatus] = useState(false);
  const [waiting, setwaiting] = useState(false);
  const [capturedImage, setcapturedImage] = useState('');
  const [cuttingTitle, setcuttingTitle] = useState('');
  const [cuttingDetails, setcuttingDetails] = useState('');
  const [imageName, setimageName] = useState('');
  const [options, setOptions] = useState(['Long Cut', 'Short Cut']);
  const [selected, setSelected] = useState(options[0]);
  const [detailsError, setDetailsError] = useState('');
  const [listArray, setListArray] = useState(cuttings);

  const Adddata = async () => {
    if (!capturedImage) {
      alert('Please add image.');
      return;
    }
    if (cuttingDetails == '') {
      setDetailsError('Please enter details.');
      return;
    }
    if (cuttingTitle == '') {
      let isAdded = false
      cuttings.map(item => {
        if (item.CuttingTitle == selected) {
          isAdded = true
        }
      })
      if (isAdded) {
        alert('This cut is already added in your hair styles.')
        return
      }
    }
    try {
      setwaiting(true);
      const imageUrl = await uploadImage(
        capturedImage,
        'CUTTINGS/' + imageName,
      );
      const hairStyleId = firestore().collection('rnd').doc().id;
      const hairStyle = {
        Id: hairStyleId,
        UserId: auth().currentUser.uid,
        CuttingTitle: cuttingTitle == '' ? selected : cuttingTitle,
        CuttingDetails: cuttingDetails,
        CuttingImage: imageUrl,
        imageRef: 'CUTTINGS/' + imageName,
      };
      await saveData('Users', auth().currentUser.uid, { HairCutCount: firestore.FieldValue.increment(1) })
      await saveData('Cuttings', hairStyleId, hairStyle);
      if (cuttingTitle == '') {
        saveStyleUser(selected)
      } else {
        saveStyleUser(cuttingTitle)
      }
      dispatch(setCuttings([...cuttings, hairStyle]));
      setListArray([...cuttings, hairStyle]);
      setwaiting(false);
      onCancel()
      setModalVisible(false);
    } catch (error) {
      console.log(error.message);
      setModalVisible(false);
    }
  };
  const saveStyleUser = async (styleType) => {
    try {
      const cuts = user?.stylesAvailable
      if (cuts) {
        if (!cuts.includes(styleType)) {
          await addToArrayUpdate('Users', auth().currentUser.uid, 'stylesAvailable', styleType)
          dispatch(login({
            ...user,
            stylesAvailable: [...user.stylesAvailable, styleType]
          }))
        }
      } else {
        await saveData('Users', auth().currentUser.uid, { stylesAvailable: [styleType] })
        dispatch(login({
          ...user,
          stylesAvailable: [styleType]
        }))
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const onCancel = () => {
    setModalVisible(false);
    setimageStatus(false);
    setcapturedImage('');
    setcuttingTitle('');
    setcuttingDetails('');
  };

  const renderItem = ({ item, index }) => {
    return (
      <HairStyle
        containerStyle={{ width: width(40), height: width(40) }}
        cuttingImage={{ uri: item.CuttingImage }}
        cuttingTitle={item.CuttingTitle}
      />
    );
  };
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()}
        headerTitle={'Manage Hairstyles'}
        renderIconRight={() => (
          <View>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('DeleteHairStyles')}>
              <Image
                source={require('../../assets/images/binIcon.png')}
                style={styles.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.mainViewContainer}>
        <Button onPress={() => {
          console.log(user.stylesAvailable)
          setModalVisible(true)
        }} title={'Add new'} />
        <HorizontalLine
          lineColor={{ alignSelf: 'center', marginBottom: height(1) }}
        />
        <FlatList
          columnWrapperStyle={{
            justifyContent: 'space-between',
            paddingVertical: height(2),
          }}
          contentContainerStyle={{
            paddingHorizontal: width(6),
            paddingBottom: height(10),
          }}
          numColumns={2}
          data={cuttings}
          keyExtractor={(item) => item.Id}
          renderItem={renderItem}
        />
      </View>
      <MediaModal
        image={!imageStatus}
        capturedImage={{ uri: capturedImage }}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        multiline
        numoflines={5}
        onPressUploadImage={() => setCameraModelView(true)}
        firstValue={cuttingTitle}
        secondValue={cuttingDetails}
        waiting={waiting}
        options={options}
        buttonLine
        firstButtonTitle="Add"
        secondButtonTitle={'Cancel'}
        onpressFirstButton={() => Adddata()}
        onpressSecondButton={() => onCancel()}
        onchangefirst={(cuttingTitle) => {
          setcuttingTitle(cuttingTitle);
        }}
        onchangesecond={(cuttingDetails) => setcuttingDetails(cuttingDetails)}
        selected={selected}
        setSelected={setSelected}
        detailsError={detailsError}
      />
      <CameraModel
        isVisible={CameraModelView}
        onClose={() => setCameraModelView(false)}
        iconName={'photo-camera'}
        labelName={'Take Photo'}
        imageFromCamera={() =>
          ImagePicker.openCamera({
            compressImageQuality: 0.5,
            mediaType: 'photo'
          }).then((image) => {
            setcapturedImage(image.path);
            setimageName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true);
          })
        }
        imageFromGallery={() =>
          ImagePicker.openPicker({
            compressImageQuality: 0.5,
            mediaType: 'photo'
          }).then((image) => {
            setcapturedImage(image.path);
            setimageName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true);
          })
        }
      />
    </ScreenWrapper>
  );
}
