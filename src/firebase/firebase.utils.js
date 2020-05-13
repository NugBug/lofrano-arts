import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBfdUz5YyYMZdkElYp752ew7ccSwuEKV1s",
  authDomain: "lofrano-arts.firebaseapp.com",
  databaseURL: "https://lofrano-arts.firebaseio.com",
  projectId: "lofrano-arts",
  storageBucket: "lofrano-arts.appspot.com",
  messagingSenderId: "527780553285",
  appId: "1:527780553285:web:128da2773130f28771f92c",
  measurementId: "G-ZQ1HH7TC08"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot =  await userRef.get();

  if(!snapShot.exists) {
    const { name, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        name,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user", error)
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;