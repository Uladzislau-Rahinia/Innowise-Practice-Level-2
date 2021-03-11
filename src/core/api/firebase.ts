import firebase from 'firebase';

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_AUTH_DOMAIN,
  REACT_APP_DATABASE_URL,
  REACT_APP_PROJECT_ID,
  REACT_APP_STORAGE_BUCKET,
  REACT_APP_MESSAGING_SENDER_ID,
  REACT_APP_APP_ID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_APP_ID,
  databaseURL: REACT_APP_DATABASE_URL,
};
// // Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// firebase.analytics();
const database = firebaseApp.database();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

// if (window.location.hostname === "localhost") {
//   // Point to the RTDB emulator running on localhost.
//   database.useEmulator("localhost", 9000);
//   auth.useEmulator("localhost", 9099);
// }

export { database, auth, storage };
