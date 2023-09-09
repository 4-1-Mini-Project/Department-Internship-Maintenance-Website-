// Import Firebase
import firebase from 'firebase/app';
import 'firebase/auth';

// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

firebase.initializeApp(firebaseConfig);

// Function to handle student login
const studentLoginForm = document.getElementById('student-login-form');

studentLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Sign in the user with Firebase Authentication
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User is signed in, redirect to the student dashboard
      window.location.href = 'student-dashboard.html';
    })
    .catch((error) => {
      // Handle login errors
      const errorMessage = error.message;
      alert(`Login failed: ${errorMessage}`);
    });
});
