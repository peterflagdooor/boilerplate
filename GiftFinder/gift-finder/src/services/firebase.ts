import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
// Configure Google provider with additional scopes if needed
export const googleProvider = new GoogleAuthProvider();
// Add scopes if needed
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');
// Set custom parameters
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
export const db = getFirestore(app);

// Initialize Analytics if supported
let analytics;
isSupported().then(supported => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export { analytics };
export default app;
