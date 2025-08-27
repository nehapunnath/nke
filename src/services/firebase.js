const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBLPEqiQloMQaXk6MfYesWrosCiakSmb0c",
  authDomain: "nke-infinity-tech-solutions.firebaseapp.com",
  projectId: "nke-infinity-tech-solutions",
  storageBucket: "nke-infinity-tech-solutions.firebasestorage.app",
  messagingSenderId: "649295322913",
  appId: "1:649295322913:web:fe5b8449783a4a1f03e860"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

module.exports = { auth, app };