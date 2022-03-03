import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Capacitor } from '@capacitor/core';
import { initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { getAuth } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyCQZRrqAk9TaOPZfq2-38Ozvp2AKzYEHfs",
  authDomain: "mydojobackend.firebaseapp.com",
  projectId: "mydojobackend",
  storageBucket: "mydojobackend.appspot.com",
  messagingSenderId: "447780716609",
  appId: "1:447780716609:web:6d930a89d4754b1a0c46c0",
  measurementId: "G-F4X0DY4YBN",
  databaseURL: ""
};

function whichAuth() {
  let auth
  if (Capacitor.isNativePlatform()) {
    auth = initializeAuth(app, {
      persistence: indexedDBLocalPersistence
    })
  } else {
    auth = getAuth()
  }
  return auth
}

export const app = initializeApp(firebaseConfig);
export const auth = whichAuth()
