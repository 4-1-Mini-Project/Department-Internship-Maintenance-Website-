const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});

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
const studentLoginForm = document.getElementById('sign-in-form');



studentLoginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('sign-in-email').value;
  const password = document.getElementById('sign-in-password').value;
  console.log(email)
  // Sign in the user with Firebase Authentication
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User is signed in, redirect to the student dashboard
      window.location.href = 'student-view.html';
    })
    .catch((error) => {
      // Handle login errors
      const errorMessage = error.message;
      alert(`Login failed: ${errorMessage}`);
    });
});

const studentSignupForm = document.getElementById('sign-up-form');

studentSignupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('sign-up-email').value;
  const password = document.getElementById('sign-up-password').value;

  // Create a new user account using Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User account created successfully
      var user = userCredential.user;
      alert('Account created successfully! You can now log in.');
      // Redirect to the login page
      window.location.href = 'student-view.html';
    })
    .catch((error) => {
      // Handle signup errors
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(`Signup failed: ${errorMessage}`);
    });
});
// Import Firebase Authentication and initialize Firebase (make sure you've already set up Firebase in your projec
