import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDusUKnmeVE61obp4u4pYVUnrhcHhE_DXg",
  authDomain: "market-1c239.firebaseapp.com",
  projectId: "market-1c239",
  storageBucket: "market-1c239.appspot.com",
  messagingSenderId: "654524097235",
  appId: "1:654524097235:web:f11b1cb682732411f1aa26",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
