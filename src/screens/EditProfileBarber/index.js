import React, { useState } from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import ScreenWrapper from '../../components/ScreenWrapper';
import HighlightedText from '../../components/HighlightedText';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import AppColors from '../../utills/AppColors';
import { useDispatch, useSelector } from 'react-redux';
import { height, width } from 'react-native-dimension';
import ImagePicker from 'react-native-image-crop-picker';
import CameraModel from '../../components/CameraModal';
import auth from '@react-native-firebase/auth';
import { saveData, uploadImage } from '../../firebaseConfig';
import { login } from '../../Redux/Actions/Auth';

export default function EditProfileBarber(props) {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const [cameraModal, setCameraModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [fname, setFname] = useState(user?.FirstName);
  const [fnameError, setFnameError] = useState('');
  const [lname, setLname] = useState(user?.LastName);
  const [lnameError, setLnameError] = useState('');
  const [email, setEmail] = useState(user?.Email);
  const [imageSelected, setImageSelected] = useState(false);
  const [imageUri, setImageUri] = useState(user?.Image?.imageUrl ?? null);
  const [imageRef, setImageRef] = useState(user?.Image?.imageRef ?? null);

  const cameraPicker = () => {
    ImagePicker.openCamera({}).then((image) => {
      setImageUri(image.path);
      setImageRef(
        'PROFILE/' + auth().currentUser.uid + '/' + image.path.split('/').pop(),
      );
      setImageSelected(true);
      setCameraModal(false);
    });
  };
  const galleryPicker = () => {
    ImagePicker.openPicker({}).then((image) => {
      setImageUri(image.path);
      setImageRef(
        'PROFILE/' + auth().currentUser.uid + '/' + image.path.split('/').pop(),
      );
      setImageSelected(true);
      setCameraModal(false);
    });
  };
  const updateProfile = async () => {
    if (fname == '') {
      setFnameError('Please enter first name.');
      return;
    }
    setFnameError('');
    if (lname == '') {
      setLnameError('Please enter last name.');
      return;
    }
    setLnameError('');
    setLoading(true);
    let userObj = null;
    if (imageSelected) {
      const url = await uploadImage(imageUri, imageRef);
      userObj = {
        FirstName: fname,
        LastName: lname,
        Image: {
          imageUrl: url,
          imageRef: imageRef,
        },
      };
    } else {
      userObj = {
        FirstName: fname,
        LastName: lname,
      };
    }
    try {
      await saveData('Users', auth().currentUser.uid, userObj);
      dispatch(
        login({
          ...user,
          ...userObj,
        }),
      );
      setLoading(false);
      props.navigation.goBack();
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  return (
    <ScreenWrapper
      scrollEnabled
      transclucent
      statusBarColor={AppColors.transparent}
      headerUnScrollable={() => (
        <Header
          headerTitle={'Edit Profile'}
          leadingIcon={'arrow-left'}
          onPressLeadingIcon={() => props.navigation.goBack()}
        />
      )}>
      <View style={styles.mainViewContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={
              imageUri
                ? { uri: imageUri }
                : require('../../assets/images/cuttings/1.png')
            }
            resizeMode={'cover'}
          />
        </View>
        <HighlightedText
          containerStyle={styles.text}
          text={'Change Profile Picture'}
          onPress={() => setCameraModal(true)}
        />
        <HorizontalLine />
        <View style={styles.inputRow}>
          <InputField
            label={'First Name'}
            fielderror={fnameError}
            placeholder={'Micheal'}
            containerStyles={{ width: '45%' }}
            value={fname}
            onChangeText={(text) => setFname(text)}
          />
          <InputField
            label={'Last Name'}
            fielderror={lnameError}
            placeholder={'Fox'}
            containerStyles={{ width: '45%' }}
            value={lname}
            onChangeText={(text) => setLname(text)}
          />
        </View>
        <InputField
          label={'Email'}
          placeholder={'micheal397@gmail.com'}
          value={email}
          editable={false}
        />
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          title={'Update'}
          onPress={() => updateProfile()}
          gradientContainerStyle={{
            borderRadius: width(2.5),
            paddingVertical: height(1.25),
          }}
        />
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
