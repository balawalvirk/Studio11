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
export default function ProfileBarber(props) {
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
      title: 'Low Fade',
      image: require('../../assets/images/barbers/b3.png'),
    },
    {
      id: '4',
      title: 'Mid Fade',
      image: require('../../assets/images/barbers/b4.png'),
    },
    {
      id: '5',
      title: 'High Fade',
      image: require('../../assets/images/barbers/b5.png'),
    },
    {
      id: '6',
      title: 'Side Part',
      image: require('../../assets/images/barbers/b6.png'),
    },
  ];
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const reviewList = [
    {
      id: '1',
      ReviewerName: 'Jared',
      ratings: '4.9',
      Review: 'Mollitia labore autem sed rem magnam labore. Excepturi cum quasi quidem illo qui quidem id. Dolorum facere natus at minus earum autem rerum. Cumque quia eum et.',
      reviewerImage: require('../../assets/images/reviewers/r1.png')
    },
    {
      id: '2',
      ReviewerName: 'Elwyn',
      ratings: '3.7',
      Review: 'Doloribus et et ea commodi. Porro blanditiis sit eaque. Et quam quod sed est magnam a et tempore.',
      reviewerImage: require('../../assets/images/reviewers/r2.png')
    },
    {
      id: '3',
      ReviewerName: 'Ivory',
      ratings: '3.5',
      Review: 'Mollitia labore autem sed rem magnam labore. Excepturi cum quasi quidem illo qui quidem id. Dolorum facere natus at minus earum autem rerum. Cumque quia eum et.',
      reviewerImage: require('../../assets/images/reviewers/r3.png')
    },
  ];
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  return (
    <ScreenWrapper scrollEnabled headerUnScrollable={() =>
      <Header headerTitle={'Profile'} leadingIcon={'menu'}
        renderIconRight={() => <MaterialCommunityIcons name="pencil" 
        onPress={()=>props.navigation.navigate('EditProfileBarber')}
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
        <View style={styles.textRow}>
          <Text style={styles.whiteText}>Hair Styles</Text>
          <HighlightedText text={'Manage'} onPress={() => props.navigation.navigate('ManageHairStyles')} />
        </View>
        <FlatList
          // contentContainerStyle={{ paddingHorizontal: width(8)}}
          numColumns={'2'}
          // style={{ paddingHorizontal: width(6) }}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingVertical: height(2) }}
          showsHorizontalScrollIndicator={false}
          data={cuttingImages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <HairStyle containerStyle={{ width: width(40), height: width(40) }}
                cuttingImage={item.image} cuttingTitle={item.title} />
            );
          }}
        />
      </View>
    </ScreenWrapper>
  );
};