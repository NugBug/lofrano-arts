import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: process.env.FIREBASE_ENV,
  authDomain: "lofrano-arts.firebaseapp.com",
  databaseURL: "https://lofrano-arts.firebaseio.com",
  projectId: "lofrano-arts",
  storageBucket: "lofrano-arts.appspot.com",
  messagingSenderId: "527780553285",
  appId: "1:527780553285:web:128da2773130f28771f92c",
  measurementId: "G-ZQ1HH7TC08"
}

firebase.initializeApp(config);