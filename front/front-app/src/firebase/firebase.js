import firebase from 'firebase';

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'jwt-auth-6f361.firebaseapp.com',
  projectId: 'jwt-auth-6f361',
  storageBucket: 'jwt-auth-6f361.appspot.com',
  messagingSenderId: '363525974680',
  appId: '1:363525974680:web:81a33822603f998722feed',
};

firebase.initializeApp(config);

export default firebase;
