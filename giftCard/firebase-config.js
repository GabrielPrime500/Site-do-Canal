// firebase-config.js
const firebaseConfig = {
  apiKey: "AIzaSyCBBtyl8IzOXCSzevKTu_jFEGRZ6BI77XQ",
  authDomain: "monitor-prime.firebaseapp.com",
  projectId: "monitor-prime",
  storageBucket: "monitor-prime.firebasestorage.app",
  messagingSenderId: "776677628623",
  appId: "1:776677628623:web:038cbee4cb6cd7de0f35ba",
  measurementId: "G-6PHJR21FXB"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();