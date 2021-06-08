import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import HairStyle from '../../components/HairStyle';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import CameraModel from '../../components/CameraModal';
import MediaModal from '../../components/MediaModal';
import { addToArray, getData, uploadImage } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';
import uuid from 'react-native-uuid';
export default function ManageHairStyles(props) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.Auth.user)
  const [modalVisible, setModalVisible] = useState(false);
  const [CameraModelView, setCameraModelView] = useState(false);
  const [imageStatus, setimageStatus] = useState(false);
  const [waiting, setwaiting] = useState(false);
  const [capturedImage, setcapturedImage] = useState('');
  const [cuttingTitle, setcuttingTitle] = useState('');
  const [cuttingDetails, setcuttingDetails] = useState('');
  const [imageName, setimageName] = useState('');
  const [options, setOptions] = useState(['Long Cut', 'Short Cut'])
  const [selected, setSelected] = useState(options[0])
  const [detailsError, setDetailsError] = useState('')
  const [listArray, setListArray] = useState('')

  useEffect(() => {
    const arr = user?.Cuttings
    let temp = []
    arr.map(item => {
      temp.push({
        ...item,
        isSelected: false
      })
    })
    setListArray(temp)
  }, [])
  const Adddata = () => {
    if (!capturedImage) {
      alert('Please add image.')
      return
    }
    if (cuttingDetails == '') {
      setDetailsError('Please enter details.')
      return
    }
    setwaiting(true)
    uploadImage(capturedImage, 'CUTTINGS/' + imageName)
      .then(async (result) => {
        await addToArray('Users', auth().currentUser.uid, "Cuttings", [
          {
            Id: uuid.v4(),
            CuttingTitle: cuttingTitle == '' ? selected : cuttingTitle,
            CuttingDetails: cuttingDetails,
            CuttingImage: result,
            imageRef: 'CUTTINGS/' + imageName
          }
        ])
        dispatch(login({
          ...user,
          Cuttings: [...user.Cuttings, {
            Id: uuid.v4(),
            CuttingTitle: cuttingTitle == '' ? selected : cuttingTitle,
            CuttingDetails: cuttingDetails,
            CuttingImage: result,
            imageRef: 'CUTTINGS/' + imageName
          }]
        }))
        setListArray([...user.Cuttings, {
          Id: uuid.v4(),
          CuttingTitle: cuttingTitle == '' ? selected : cuttingTitle,
          CuttingDetails: cuttingDetails,
          CuttingImage: result,
          imageRef: 'CUTTINGS/' + imageName
        }])
        setModalVisible(false)
        setwaiting(false)
        setimageStatus(false)
        setcapturedImage('')
        setcuttingTitle('')
        setcuttingDetails('')
      })
      .catch(error => {
        console.error("Error is =============>: ", error);
      });

  };
  const onCancel = () => {
    setModalVisible(false);
    setimageStatus(false);
    setcapturedImage('');
    setcuttingTitle('');
    setcuttingDetails('')
  }

  const renderItem = ({ item, index }) => {
    return (
      <HairStyle
        containerStyle={{ width: width(40), height: width(40) }}
        cuttingImage={{ uri: item.CuttingImage }}
        cuttingTitle={item.CuttingTitle}
      />
    );
  }
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header
        leadingIcon={'arrow-left'}
        onPressLeadingIcon={() => props.navigation.goBack()}
        headerTitle={'Manage Hairstyles'}
        renderIconRight={() =>
          <View>
            <TouchableOpacity onPress={() => props.navigation.navigate('DeleteHairStyles')}>
              <Image source={require('../../assets/images/binIcon.png')}
                style={styles.icon} resizeMode='contain' />
            </TouchableOpacity>
          </View>}
      />
      <View style={styles.mainViewContainer}>
        <Button
          onPress={() => setModalVisible(true)}
          containerStyle={{ borderRadius: width(4), paddingVertical: height(2), marginTop: height(3) }}
          title={'Add new'} />
        <HorizontalLine lineColor={{ alignSelf: 'center', marginBottom: height(1) }} />
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          contentContainerStyle={{ paddingHorizontal: width(6), paddingBottom: height(10) }}
          numColumns={2}
          data={listArray}
          keyExtractor={item => item.Id}
          renderItem={renderItem}
        />
      </View>
      <MediaModal
        image={!imageStatus}
        capturedImage={{ uri: capturedImage }}
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        multiline numoflines={5}
        onPressUploadImage={() => setCameraModelView(true)}
        firstValue={cuttingTitle} secondValue={cuttingDetails}
        waiting={waiting}
        options={options}
        buttonLine firstButtonTitle='Add' secondButtonTitle={'Cancel'}
        onpressFirstButton={() => Adddata()}
        onpressSecondButton={() => onCancel()}
        onchangefirst={(cuttingTitle) => { setcuttingTitle(cuttingTitle); }}
        onchangesecond={(cuttingDetails) => setcuttingDetails(cuttingDetails)}
        selected={selected}
        setSelected={setSelected}
        detailsError={detailsError}
      />
      <CameraModel isVisible={CameraModelView} onClose={() => setCameraModelView(false)}
        iconName={"photo-camera"}
        labelName={'Take Photo'}
        imageFromCamera={
          () => ImagePicker.openCamera({
          }).then(image => {
            setcapturedImage(image.path);
            setimageName(image.path.split('/').pop());
            setCameraModelView(false);
            setimageStatus(true)
          })
        }
        imageFromGallery={() => ImagePicker.openPicker({
        }).then((image) => {
          setcapturedImage(image.path);
          setimageName(image.path.split('/').pop());
          setCameraModelView(false);
          setimageStatus(true)
        })}
      />
    </ScreenWrapper>
  );
};
