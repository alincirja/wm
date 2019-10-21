import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";
import "firebase/firestore";

firebase.initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
});

const isInitialized = () => new Promise(resolve => firebase.auth().onAuthStateChanged(resolve));
const storage = firebase.storage();
const database = firebase.database();
const firestore = firebase.firestore();
export {
    isInitialized,
    storage,
    database,
    firestore,
    firebase as default
}