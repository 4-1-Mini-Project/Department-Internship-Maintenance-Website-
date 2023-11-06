// Initialize Firebase 
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

// Function to handle student signup
const studentSignupForm = document.getElementById('student-signup-form');

studentSignupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create a new user account using Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User account created successfully
      var user = userCredential.user;
      alert('Account created successfully! You can now log in.');
      // Redirect to the login page
      window.location.href = 'student-login.html';
    })
    .catch((error) => {
      // Handle signup errors
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(`Signup failed: ${errorMessage}`);
    });
});
