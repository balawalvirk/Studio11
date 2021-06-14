// import * as firebase from "react-native-firebase";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';
import { HairCuts, UserTypes } from './utills/Enums';
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
  let docRef = await firestore().collection(collection).doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef.update({
      [array]: firebase.firestore.FieldValue.arrayRemove(
        docData.data()[array][index],
      ),
    });
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
    // const newRating = (rating + reviewObj.rating) / (ratingCount + 1);
    const newRating = ((rating * ratingCount) + reviewObj.rating) / (ratingCount + 1);
    console.log('rating: ', rating);
    console.log('ratingCount: ', ratingCount);
    console.log('newRating: ', newRating);
    await saveData('ShopItems', product.id, {
      rating: newRating,
      ratingCount: firestore.FieldValue.increment(1),
    });
    console.log(reviewObj);
    return {
      rating: newRating,
      ratingCount: ratingCount + 1,
    }
  } catch (error) {
    console.log(error.message);
  }
}

export default firebase;
