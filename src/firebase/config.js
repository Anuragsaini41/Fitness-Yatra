import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore'; // Firestore add करें

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: 'https://fitness-yatra-auth-default-rtdb.firebaseio.com', // यह लाइन सबसे महत्वपूर्ण है
  projectId: 'fitness-yatra-auth', // यहां अपने प्रोजेक्ट का ID डालें
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// सुनिश्चित करें कि हम Firebase को केवल एक बार प्रारंभ करें
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app); // Firestore initialize करें

export { app, auth, database, database as db, firestore };
