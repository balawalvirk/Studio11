// import * as firebase from "react-native-firebase";
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage'
import auth from '@react-native-firebase/auth';
export async function addToArray(collection, doc, array, value) {
  let docRef = await firestore()
    .collection(collection)
    .doc(doc);
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
  let docRef = await firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array] != undefined) {
    docRef.set({
      [array]: firebase.firestore.FieldValue.arrayUnion(value),
    });
  }
}
export const removeFromArray = async (collection, doc, array, index) => {
  let docRef = await firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef
      .update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index],
        ),
      })
  }
}
export async function updateArray(collection, doc, array, value, index) {
  let docRef = await firestore()
    .collection(collection)
    .doc(doc);
  let docData = await docRef.get();
  if (docData.exists && docData.data()[array][index] != undefined) {
    docRef
      .update({
        [array]: firebase.firestore.FieldValue.arrayRemove(
          docData.data()[array][index],
        ),
      })
      .then(async () => {
        let docRef1 = await firestore()
          .collection(collection)
          .doc(doc);
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
    const response = await auth().createUserWithEmailAndPassword(userObj.email, pass)
    const user = response.user
    await saveData('Users', user.uid, {
      ...userObj,
      id: user.uid
    })
    let currentUser = auth().currentUser
    await currentUser.sendEmailVerification()
    console.log("Email sent")
    return { user: user, success: true }
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("asdasdasd", error.message)
      return { success: false, message: 'That email address is already in use!', user: {} }
    }
    else if (error.code === 'auth/invalid-email') {
      console.log(error.message)
      return { success: false, message: 'That email address is invalid!' }
    }
    else {
      console.log("Else Error", error.message)
      return { success: false, message: error.code.split("/")[1].replace("-", " ") }
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
    const ref =
      storage()
        .ref(path);
    const task = ref.put(blob);
    return new Promise((resolve, reject) => {
      task.on(
        'state_changed',
        () => { },
        err => {
          reject(err);
        },
        async () => {
          const url = await task.snapshot.ref.getDownloadURL();
          resolve(url)
        },
      );
    });
  } catch (err) {
    console.log('uploadImage error: ' + err.message);
  }
}
export async function getAllOfCollection(collection) {
  let data = [];
  let querySnapshot = await firestore()
    .collection(collection)
    .get();
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
      console.log("Error writing document: ", error);
    });
  //console.log("Document successfully written!");
}
export default firebase;