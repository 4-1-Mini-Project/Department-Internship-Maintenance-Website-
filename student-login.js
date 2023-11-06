// Initialize Firebase with your Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmpwwd-pActSCa32M2WT2WGTqkndSP6_E",
  authDomain: "dept-internship-maintenance.firebaseapp.com",
  projectId: "dept-internship-maintenance",
  storageBucket: "dept-internship-maintenance.appspot.com",
  messagingSenderId: "133911448147",
  appId: "1:133911448147:web:2a1708e751ce16c34c14a6",
  measurementId: "G-9YRFBK03HZ"
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

// Import Firebase Authentication and initialize Firebase (make sure you've already set up Firebase in your projec
