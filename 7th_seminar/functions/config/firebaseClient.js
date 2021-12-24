const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'wesopt29-34a25.firebaseapp.com',
  projectId: 'wesopt29-34a25',
  storageBucket: 'wesopt29-34a25.appspot.com',
  messagingSenderId: '880194519781',
  appId: '1:880194519781:web:90f88d0e1ded437f3a8a0c',
  measurementId: 'G-TPYVFY1RYG',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = { firebaseApp, firebaseAuth, firebaseConfig };
