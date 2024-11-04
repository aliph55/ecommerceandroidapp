import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAufS8AkPf3BSNqWfgBKh5cHeRUeGslvIY",
  authDomain: "react-2ea5c.firebaseapp.com",
  databaseURL: "https://react-2ea5c-default-rtdb.firebaseio.com",
  projectId: "react-2ea5c",
  storageBucket: "react-2ea5c.appspot.com",
  messagingSenderId: "165864514906",
  appId: "1:165864514906:web:d27d49f4c680fc38d37f63",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };

export default app;
