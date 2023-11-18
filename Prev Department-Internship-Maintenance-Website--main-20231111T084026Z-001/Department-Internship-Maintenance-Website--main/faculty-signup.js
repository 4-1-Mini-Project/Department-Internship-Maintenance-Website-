const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID'
};

firebase.initializeApp(firebaseConfig);

// Function to handle faculty signup
const facultySignupForm = document.getElementById('faculty-signup-form');

facultySignupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Create a new user account using Firebase Authentication
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // User account created successfully
      const user = userCredential.user;
      alert('Account created successfully! You can now log in.');
      // Redirect to the login page
      window.location.href = 'faculty-login.html';
    })
    .catch((error) => {
      // Handle signup errors
      const errorMessage = error.message;
      alert(`Signup failed: ${errorMessage}`);
    });
});
