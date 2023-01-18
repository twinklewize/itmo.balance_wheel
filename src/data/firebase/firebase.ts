import {firebaseConfig} from "./config";
import firebase from 'firebase/compat/app';
import "firebase/compat/firestore"

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore(firebaseApp)
export default firebase;
