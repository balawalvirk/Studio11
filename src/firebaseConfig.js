// import * as firebase from "react-native-firebase";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { AppointmentStatus, HairCuts, OrderStatus, UserTypes } from './utills/Enums';
import moment from 'moment';
export async function addToArray(collection, doc, array, value) {
  let docRef = await firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayUnion(...value),
    });
  } else {
    saveData(collection, doc, { [array]: value });
  }
}
export async function addToArrayUpdate(collection, doc, array, value) {
  let docRef = firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.set({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    }, { merge: true });
  } else {
    docRef.set({
      [array]: [value],
    }, { merge: true });
  }
}
export const removeFromArray = async (collection, doc, array, index) => {
  let docRef = firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
  }
};
export const removeFromArrayInObj = async (collection, doc, object, array, index) => {
  let docRef = firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists) {
    docRef.update({
      [object]: {
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[object][array][index],
        ),
      }
    });
  }
};
export const removeValueFromArray = async (collection, doc, array, value) => {
  try {
    let docRef = firestore().collection(collection).doc(doc);
    let docData = await docRef.get();
    if (docData.exists) {
      docRef.update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          value
        ),
      });
    }
  } catch (error) {
    console.log(error.message)
  }
};
export const removeUserCut = async (collection, doc, array, string) => {
  let docRef = firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        string
      ),
    });
  }
};

export const removeFromSubArray = async (
  collection,
  doc,
  array,
  index,
  lowerIndex,
) => {
  try {
    let docRef = firestore().collection(collection).doc(doc);
    let docData = await docRef.get();
    if (docData.exists && docData.data()[array][index] != undefined) {
      let images = docData.data()[array][index].images;
      images.splice(lowerIndex, 1);
      let items = docData.data()[array];
      items[index].images = images;
      docRef
        .update({
          [array]: items,
        })
        .catch((error) => console.log(error.message));
    }
  } catch (err) {
    console.log('Error deleting from sub array');
  }
};
export async function updateArray(collection, doc, array, value, index) {
  let docRef = await firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef
      .update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index],
        ),
      })
      .then(async () => {
        let docRef1 = await firestore().collection(collection).doc(doc);
        let docData1 = await docRef1.get();
        if (docData1.exists && docData1.data()[array] != undefined) {
          docRef1.update({
            [array]: firebase.firestore.FieldValue.arrayUnion(value),
          });
        }
      });
  }
}
export async function signUp(userObj, pass) {
  try {
    const response = await auth().createUserWithEmailAndPassword(
      userObj.email,
      pass,
    );
    const user = response.user;
    await saveData('Users', user.uid, {
      ...userObj,
      id: user.uid,
    });
    let currentUser = auth().currentUser;
    await currentUser.sendEmailVerification();
    console.log('Email sent');
    return { user: user, success: true };
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('asdasdasd', error.message);
      return {
        success: false,
        message: 'That email address is already in use!',
        user: {},
      };
    } else if (error.code === 'auth/invalid-email') {
      console.log(error.message);
      return { success: false, message: 'That email address is invalid!' };
    } else {
      console.log('Else Error', error.message);
      return {
        success: false,
        message: error.code.split('/')[1].replace('-', ' '),
      };
    }
  }
}
export function getData(collection, doc, objectKey) {
  // check if data exists on the given path
  if (objectKey === undefined) {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists) {
          return doc.data();
        } else {
          return false;
        }
      });
  } else {
    return firestore()
      .collection(collection)
      .doc(doc)
      .get()
      .then(function (doc) {
        if (doc.exists && doc.data()[objectKey] != undefined) {
          return doc.data()[objectKey];
        } else {
          return false;
        }
      });
  }
}

export async function uploadImage(uri, path) {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const ref = storage().ref(path);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => { },
        (err) => {
          reject(err);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url);
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore().collection(collection).get();
  querySnapshot.forEach(function (doc) {
    if (doc.exists) {
      //console.log(doc.data());
      data.push(doc.data());
    } else {
      console.log('No document found!');
    }
  });
  return data;
}
export async function saveData(collection, doc, jsonObject) {
  await firestore()
    .collection(collection)
    .doc(doc)
    .set(jsonObject, { merge: true })
    .catch(function (error) {
      console.log('Error writing document: ', error);
    });
  //console.log("Document successfully written!");
}
export async function getItemsById() {
  try {
    let items = [];
    const snapshot = await firestore()
      .collection('ShopItems')
      .where('userId', '==', auth().currentUser.uid)
      .get();
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  } catch (error) {
    console.log(error.message);
  }
}
export async function getVideosById(barberId = null) {
  try {
    let items = [];
    let snapshot;
    if (!barberId) {
      snapshot = await firestore()
        .collection('Videos')
        .where('UserId', '==', auth().currentUser.uid)
        .get();
    } else {
      snapshot = await firestore()
        .collection('Videos')
        .where('UserId', '==', barberId)
        .get();
    }
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  } catch (error) {
    console.log(error.message);
  }
}
export async function getCuttingsById(barberId = null) {
  try {
    let items = [];
    let snapshot;
    if (!barberId) {
      snapshot = await firestore()
        .collection('Cuttings')
        .where('UserId', '==', auth().currentUser.uid)
        .get();
    } else {
      snapshot = await firestore()
        .collection('Cuttings')
        .where('UserId', '==', barberId)
        .get();
    }
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });
    return items;
  } catch (error) {
    console.log(error.message);
  }
}
export async function getBarbers() {
  try {
    let barbers = [];
    const snapshot = await firestore()
      .collection('Users')
      .where('Type', '==', UserTypes.BARBER)
      .get();
    snapshot.forEach((doc) => {
      if (doc.data().stylesAvailable && doc.data().stylesAvailable.length > 0)
        barbers.push(doc.data());
    });
    return barbers;
  } catch (error) {
    console.log(error.message);
  }
}
export async function getPopularCuts() {
  try {
    let cuts = [];
    const snapshot = await firestore()
      .collection('Cuttings')
      .where('CuttingTitle', 'in', [HairCuts.LONG_CUT, HairCuts.SHORT_CUT])
      .get();
    snapshot.forEach((doc) => {
      cuts.push(doc.data());
    });
    return cuts;
  } catch (error) {
    console.log(error.message);
  }
}
export async function getBarberFromCut(cutType) {
  try {
    let barbers = [];
    const snapshot = await firestore()
      .collection('Users')
      .where('Type', '==', UserTypes.BARBER)
      .where('stylesAvailable', 'array-contains', cutType)
      .get();
    snapshot.forEach((doc) => {
      barbers.push(doc.data());
    });
    return barbers;
  } catch (error) {
    console.log(error.message);
  }
}
export async function postProductReview(
  reviewText,
  starCount,
  reviewerName,
  reviewerId,
  reviewImg,
  product,
) {
  try {
    const reviewObj = {
      reviewerName: reviewerName,
      reviewerName: reviewerName,
      description: reviewText,
      rating: starCount,
      reviewerId: reviewerId,
    };
    const imgId = firestore().collection('rnd').doc().id;
    const reviewId = firestore().collection('rnd').doc().id;
    const url = await uploadImage(reviewImg, 'PRODUCT_REVIEWS/' + imgId);
    reviewObj.image = url;
    reviewObj.id = reviewId;
    await firestore()
      .collection('ShopItems')
      .doc(product.id)
      .collection('Reviews')
      .doc(reviewId)
      .set(reviewObj);
    const newProduct = await firestore()
      .collection('ShopItems')
      .doc(product.id)
      .get();

    let rating = newProduct.data().rating;
    let ratingCount = newProduct.data().ratingCount;
    const newRating = ((rating * ratingCount) + reviewObj.rating) / (ratingCount + 1);
    await saveData('ShopItems', product.id, {
      rating: newRating,
      ratingCount: firestore.FieldValue.increment(1),
    });
    return {
      rating: newRating,
      ratingCount: ratingCount + 1,
    }
  } catch (error) {
    console.log(error.message);
  }
}
export async function postBarberReview(reviewText, starCount, reviewerName, reviewerId, reviewImg, barberId) {
  try {
    const imgId = firestore().collection('rnd').doc().id;
    const url = await uploadImage(reviewImg, 'BARBER_REVIEWS/' + imgId);
    const reviewId = firestore().collection('rnd').doc().id;
    const reviewObj = {
      id: reviewId,
      reviewerName: reviewerName,
      reviewerName: reviewerName,
      description: reviewText,
      rating: starCount,
      reviewerId: reviewerId,
      image: url,
    };
    await firestore()
      .collection('Users')
      .doc(barberId)
      .collection('Reviews')
      .doc(reviewId)
      .set(reviewObj);
    const uptoDateBarber = await firestore()
      .collection('Users')
      .doc(barberId)
      .get();
    let rating = uptoDateBarber.data().Rating;
    let ratingCount = uptoDateBarber.data().RatingCount;
    const newRating = ((rating * ratingCount) + reviewObj.rating) / (ratingCount + 1);
    await saveData('Users', barberId, {
      Rating: newRating,
      RatingCount: firestore.FieldValue.increment(1),
    });
    return {
      rating: newRating,
      ratingCount: ratingCount + 1,
    }
  } catch (error) {
    console.log(error.message)
  }
}
export async function getReviewsBarber(barberId) {
  try {
    let reviews = [];
    const snapshot = await firestore()
      .collection('Users')
      .doc(barberId)
      .collection('Reviews')
      .get();
    snapshot.forEach((doc) => {
      reviews.push(doc.data());
    });
    return reviews;
  } catch (error) {
    console.log(error.message);
  }
}
export async function unlikeVideo(videoInfo, userId) {
  const videoRef = firestore()
    .collection('Videos')
    .doc(videoInfo.Id)
  try {
    await removeValueFromArray('Videos', videoInfo.Id, 'likedBy', userId)
    await videoRef.set({ likeCount: firestore.FieldValue.increment(-1) }, { merge: true })
  } catch (error) {
    console.log(error.message);
  }
}
export async function likeVideo(videoInfo, userId) {
  const videoRef = firestore()
    .collection('Videos')
    .doc(videoInfo.Id)
  try {
    await addToArrayUpdate('Videos', videoInfo.Id, 'likedBy', userId)
    await videoRef.set({ likeCount: firestore.FieldValue.increment(1) }, { merge: true })
  } catch (error) {
    console.log(error.message);
  }
}

export async function saveComment(videoInfo, comment, username, uid) {
  const commentId = firestore().collection('rnd').doc().id
  const commentObj = {
    id: commentId,
    comment: comment,
    time: firestore.FieldValue.serverTimestamp(),
    commenterName: username,
    commenterId: uid
  }
  try {
    await firestore()
      .collection('Videos')
      .doc(videoInfo.Id)
      .collection('Comments')
      .doc(commentId)
      .set(commentObj)
    await firestore()
      .collection('Videos')
      .doc(videoInfo.Id)
      .set({
        commentCount: firestore.FieldValue.increment(1)
      }, { merge: true })
    return commentObj
  } catch (error) {
    console.log(error.message);
    return false
  }
}
export async function getVideoComments(videoInfo) {
  try {
    let comments = [];
    const snapshot = await firestore()
      .collection('Videos')
      .doc(videoInfo.Id)
      .collection('Comments')
      .get();
    snapshot.forEach((doc) => {
      comments.push(doc.data());
    });
    return comments;
  } catch (error) {
    console.log(error.message);
  }
}
export async function addVideoView(videoInfo) {
  try {
    await firestore()
      .collection('Videos')
      .doc(videoInfo.Id)
      .set({
        views: firestore.FieldValue.increment(1)
      }, { merge: true })
  } catch (error) {
    console.log(error.message);
  }
}
export async function getNotifications(userId) {
  try {
    let notifs = [];
    const snapshot = await firestore()
      .collection('Users')
      .doc(userId)
      .collection('Notifications')
      .get();
    snapshot.forEach((doc) => {
      notifs.push(doc.data());
    });
    return notifs;
  } catch (error) {
    console.log(error.message);
  }
}
export async function endBreak(userId) {
  try {
    await firestore()
      .collection('Users')
      .doc(userId)
      .set({
        breakTime: {
          toMoment: 10000,
          fromMoment: 10000,
        }
      }, { merge: true })
  } catch (error) {
    console.log(error.message);
  }
}
export async function setAppointment(appointmentObj) {
  const userId = auth().currentUser.uid
  try {
    await saveData('Appointments', appointmentObj.id, appointmentObj)
  } catch (error) {
    console.log(error.message);
  }
}
export async function checkBarberAvailablity(barberId, selectedDate) {
  try {
    const barberDetails = await getData('Users', barberId)
    if (barberDetails.breakTime) {
      const from = barberDetails.breakTime.fromMoment
      const to = barberDetails.breakTime.toMoment
      if (selectedDate > from && selectedDate < to) {
        console.log('BREAK IN PROGRESS')
        return false
      } else {
        console.log('BARBER AVAILABLE')
        return true
      }
    } else {
      return true
    }
  } catch (error) {
    console.log(error.message);
  }
}
export async function clearCart() {
  const userId = auth().currentUser.uid
  try {
    //remove data then items
    await firestore()
      .collection('Cart')
      .doc(userId)
      .set({
        itemCount: 0,
        total: 0,
      }, { merge: true })
    const batch = firestore().batch()
    const snapshot = await firestore()
      .collection('Cart')
      .doc(userId)
      .collection('Cart')
      .get()
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref)
    })
    await batch.commit()
  } catch (error) {
    console.log(error.message);
  }
}
export async function getAppointments(type = UserTypes.CUSTOMER) {
  const userId = auth().currentUser.uid
  try {
    let aptmnts = []
    const snapshot = await firestore()
      .collection('Appointments')
      .where(type == UserTypes.CUSTOMER ? 'customerId' : 'barberId', '==', userId)
      .where('status', '==', AppointmentStatus.PLACED)
      .get()
    snapshot.forEach(doc => {
      aptmnts.push(doc.data())
    })
    return aptmnts
  } catch (error) {
    console.log(error.message);
  }
}
export async function getAppointmentsByDate(type = UserTypes.CUSTOMER, date) {
  const userId = auth().currentUser.uid
  try {
    let aptmnts = []
    const snapshot = await firestore()
      .collection('Appointments')
      .where(type == UserTypes.CUSTOMER ? 'customerId' : 'barberId', '==', userId)
      .where('status', '!=', AppointmentStatus.CANCELLED)
      .where('dateMoment', '==', date)
      .get()
    snapshot.forEach(doc => {
      aptmnts.push(doc.data())
    })
    return aptmnts
  } catch (error) {
    console.log(error.message);
  }
}
export async function getCompletedAppointments(type = UserTypes.CUSTOMER) {
  const userId = auth().currentUser.uid
  try {
    let aptmnts = []
    const snapshot = await firestore()
      .collection('Appointments')
      .where(type == UserTypes.CUSTOMER ? 'customerId' : 'barberId', '==', userId)
      .where('status', '==', AppointmentStatus.COMPLETED)
      .get()
    snapshot.forEach(doc => {
      aptmnts.push(doc.data())
    })
    return aptmnts
  } catch (error) {
    console.log(error.message);
  }
}
export async function getCancelledAppointments(type = UserTypes.CUSTOMER) {
  const userId = auth().currentUser.uid
  try {
    let aptmnts = []
    const snapshot = await firestore()
      .collection('Appointments')
      .where(type == UserTypes.CUSTOMER ? 'customerId' : 'barberId', '==', userId)
      .where('status', '==', AppointmentStatus.CANCELLED)
      .get()
    snapshot.forEach(doc => {
      aptmnts.push(doc.data())
    })
    return aptmnts
  } catch (error) {
    console.log(error.message);
  }
}
export async function setChatRoom(roomObj) {
  try {
    await database()
      .ref('ChatRooms')
      .child(roomObj.customerId + '_' + roomObj.barberId)
      .set(roomObj)
    return
  } catch (error) {
    console.log(error.message);
  }
}
export async function getChatRooms() {
  const userId = auth().currentUser.uid
  try {
    let rooms = []
    const snapshot = await database()
      .ref('ChatRooms')
      .orderByChild('customerId')
      .equalTo(userId)
      .once('value')
    snapshot.forEach(item => rooms.push(item.val()))
    return rooms
  } catch (error) {
    console.log(error.message);
  }
}
export async function getChatRoomsForBarber() {
  const userId = auth().currentUser.uid
  try {
    let rooms = []
    const snapshot = await database()
      .ref('ChatRooms')
      .orderByChild('barberId')
      .equalTo(userId)
      .once('value')
    snapshot.forEach(item => rooms.push(item.val()))
    return rooms
  } catch (error) {
    console.log(error.message);
  }
}
export async function getChatRoomById(roomId) {
  try {
    let rooms = []
    const snapshot = await database()
      .ref('ChatRooms')
      .child(roomId)
      .once('value')
    return snapshot.val()
  } catch (error) {
    console.log(error.message);
  }
}
export async function sendMessage(message, roomId) {
  try {
    await database()
      .ref('ChatLists')
      .child(roomId)
      .child(message.id)
      .set(message)
    await database()
      .ref('ChatRooms')
      .child(roomId)
      .update({
        lastUpdated: database.ServerValue.TIMESTAMP,
        lastMessage: message.message
      })

  } catch (error) {
    console.log(error.message);
  }
}
export async function getRoomChatList(roomId) {
  try {
    let messages = []
    const snapshot = await database()
      .ref('ChatLists')
      .child(roomId)
      .orderByChild('timestamp')
      .once('value')
    snapshot.forEach(item => {
      messages.push(item.val())
    })
    return messages
  } catch (error) {
    console.log(error.message);
  }
}
export async function cancelAppointment(appointment) {
  try {
    await firestore()
      .collection('Appointments')
      .doc(appointment.id)
      .set({
        status: AppointmentStatus.CANCELLED
      }, { merge: true })
  } catch (error) {
    console.log(error.message);
  }
}
export async function checkout(orderObj) {
  try {
    await firestore()
      .collection('Orders')
      .doc(orderObj.id)
      .set(orderObj, { merge: true })
  } catch (error) {
    console.log(error.message);
  }
}
export async function getCustomerOngoingOrders() {
  const userId = auth().currentUser.uid
  try {
    let orders = []
    const snapshot = await firestore()
      .collection('Orders')
      .where('customerId', '==', userId)
      .where('status', 'not-in', [OrderStatus.COMPLETED, OrderStatus.CANCELLED])
      .get()
    snapshot.forEach(doc => orders.push(doc.data()))
    return orders
  } catch (error) {
    console.log(error.message);
  }
}
export async function getCustomerPastOrders() {
  const userId = auth().currentUser.uid
  try {
    let orders = []
    const snapshot = await firestore()
      .collection('Orders')
      .where('customerId', '==', userId)
      .where('status', '==', OrderStatus.COMPLETED)
      .get()
    snapshot.forEach(doc => orders.push(doc.data()))
    return orders
  } catch (error) {
    console.log(error.message);
  }
}
export default firebase;
