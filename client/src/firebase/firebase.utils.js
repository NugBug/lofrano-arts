import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyBfdUz5YyYMZdkElYp752ew7ccSwuEKV1s",
  authDomain: "lofrano-arts.firebaseapp.com",
  databaseURL: "https://lofrano-arts.firebaseio.com",
  projectId: "lofrano-arts",
  storageBucket: "lofrano-arts.appspot.com",
  messagingSenderId: "527780553285",
  appId: "1:527780553285:web:128da2773130f28771f92c",
  measurementId: "G-ZQ1HH7TC08",
};

// Create new user account document if user does not exist in Firestore
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { name, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        name,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  }

  return userRef;
};

// Get user cart
export const getUserCartRef = async (userId) => {
  const cartsRef = firestore.collection("carts").where("userId", "==", userId);
  const snapShot = await cartsRef.get();

  if (snapShot.empty) {
    const cartDocRef = firestore.collection("carts").doc();
    await cartDocRef.set({ userId, cartItems: [] });
    return cartDocRef;
  } else {
    return snapShot.docs[0].ref;
  }
};

// Create digital art colleciton in Firestore
export const addCollecitonAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();

  objectsToAdd.forEach((obj) => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

// Converts collections snapshot .docs (documents) array to an object that our front-end reducer can use
export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map((doc) => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

// Retrieve current user data
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

// Firebase initialization, configuration and export of Firebase and Firestore specific objects
firebase.initializeApp(config);

// Setup firebase storage
export const storage = firebase.storage();

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const functions = firebase.functions();
export const app = firebase.app();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
