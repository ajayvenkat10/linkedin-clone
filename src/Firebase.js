import * as firebase from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAb6yPna9HriyqpgFmHu_wIUtq2BFxVy5c",
    authDomain: "linkedin-clone-5d8cc.firebaseapp.com",
    projectId: "linkedin-clone-5d8cc",
    storageBucket: "linkedin-clone-5d8cc.appspot.com",
    messagingSenderId: "553453131002",
    appId: "1:553453131002:web:7d78e48f271eeef4da2543"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const authentication = getAuth(firebaseApp);

export { db, authentication };