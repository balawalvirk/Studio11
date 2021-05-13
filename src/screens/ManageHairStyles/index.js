import React, { useState } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import HairStyle from '../../components/HairStyle';
import Foundation from 'react-native-vector-icons/Foundation';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppColors from '../../utills/AppColors';
import { height, width } from 'react-native-dimension';
import Button from '../../components/Button';
import InputModal from '../../components/inputModal';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function ManageHairStyles(props) {
  const cuttingImages = [
    {
      id: '1',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b1.png'),
    },
    {
      id: '2',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b2.png'),
    },
    {
      id: '3',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '4',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '5',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b5.png'),
    },
    {
      id: '6',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b6.png'),
    },
    {
      id: '7',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b1.png'),
    },
    {
      id: '8',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b2.png'),
    },
    {
      id: '9',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '10',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '11',
      title: 'Crew Cut',
      image: require('../../assets/images/barbers/b5.png'),
    },
    {
      id: '12',
      title: 'Undercut',
      image: require('../../assets/images/barbers/b6.png'),
    },
  ];
  const user = useSelector((state) => state.Auth.user);
  const [modalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch();
  return (
    <ScreenWrapper transclucent statusBarColor={AppColors.transparent}>
      <Header leadingIcon={'arrow-left'} onPressLeadingIcon={() => props.navigation.goBack()} headerTitle={'Manage HairStyles'}
        renderIconRight={() => <View ><TouchableOpacity onPress={()=>props.navigation.navigate('DeleteHairStyles')}>
          <Image source={require('../../assets/images/binIcon.png')}
            style={{ width: width(5), height: width(5) }} resizeMode='contain' /></TouchableOpacity>
        </View>}
      />
      <View style={styles.mainViewContainer}>
        <Button
          onPress={() => setModalVisible(true)}
          containerStyle={{ borderRadius: width(4), paddingVertical: height(2), marginTop: height(3) }}
          title={'Add new'} />
        <HorizontalLine lineColor={{alignSelf:'center',marginBottom:height(1)}} />
        <FlatList
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          contentContainerStyle={{ paddingHorizontal: width(6), paddingBottom: height(10) }}
          numColumns={2}
          data={cuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle containerStyle={{ width: width(40), height: width(40) }} cuttingImage={item.image} cuttingTitle={item.title}
             />);
          }}
        />
      </View>
      <InputModal image isVisible={modalVisible} onClose={() => setModalVisible(false)} multiline numoflines={5}
        modalTitle={'Add New Hairstyle'} firstLabel={'Name'} secondLabel={'Details'}
        firstValue={'Undercut'} secondValue={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.'}
        buttonLine firstButtonTitle={'Add'} secondButtonTitle={'Cancel'}
        onpressFirstButton={() => setModalVisible(false)} onpressSecondButton={() => setModalVisible(false)}
      />
    </ScreenWrapper>
  );
};
