
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAJUZUkaYbWXMng8ElLwbPuI1vC4w7u-aQ",
  authDomain: "profileeditingapp.firebaseapp.com",
  projectId: "profileeditingapp",
  storageBucket: "profileeditingapp.appspot.com",
  messagingSenderId: "260689171318",
  appId: "1:260689171318:web:d052b7fd4b07cbe4726057"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const storage = getStorage(app);

export { db, storage };