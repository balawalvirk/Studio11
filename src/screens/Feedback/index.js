import React, { useState } from 'react';
import { Text, View, Image, TextInput } from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import HorizontalLine from '../../components/HorizontalLine';
import { useDispatch, useSelector } from 'react-redux';
import ScreenWrapper from '../../components/ScreenWrapper';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomModal from '../../components/customModal';
import AppColors from '../../utills/AppColors';
import Button from '../../components/Button';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
export default function Feedback(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [rating, setRating] = useState(3);
	const [feedback, setFeedback] = useState('');
	const openModal = () => {
		setModalVisible(true);
		setTimeout(() => {
			props.navigation.navigate('Dashboard');
		}, 3000);
	};
	const submitFeedback = async () => {
		await firestore().collection('Feedback').add({
			uid: auth().currentUser.uid,
			rating,
			feedback,
		});
		openModal();
	};
	return (
		<ScreenWrapper
			scrollEnabled
			transclucent
			statusBarColor={AppColors.transparent}
			headerUnScrollable={() => (
				<Header
					headerTitle={'Give us a feedback'}
					leadingIcon={'arrow-left'}
					onPressLeadingIcon={props.navigation.goBack}
				/>
			)}
		>
			<View style={styles.mainViewContainer}>
				<Image
					style={styles.feedbackImage}
					source={require('../../assets/images/feedback.png')}
				/>
				<HorizontalLine />
				<StarRating
					fullStarColor={AppColors.yellow}
					disabled={false}
					maxStars={5}
					rating={rating}
					selectedStar={setRating}
					containerStyle={styles.ratingContainer}
				/>
				<HorizontalLine />
				<View style={styles.longInputField}>
					<Text style={styles.feedbackLabel}>Type your feedback</Text>
					<TextInput
						style={styles.longInputStyle}
						multiline
						value={feedback}
						onChangeText={setFeedback}
						numberOfLines={4}
						placeholderTextColor={AppColors.gray}
						placeholder={'Write feedback here'}
					/>
				</View>
				<Button title={'Submit'} onPress={submitFeedback} />
			</View>
			<CustomModal
				isVisible={modalVisible}
				onClose={() => setModalVisible(false)}
				modalImage
				modalImagePath={require('../../assets/images/like.png')}
				description={'Thank you so much for giving us a Feedback!'}
			/>
		</ScreenWrapper>
	);
}
