// Import Firebase
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

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

// Function to handle submitting internship details
const internshipDetailsForm = document.getElementById('internship-details-form');
const internshipDetailsList = document.getElementById('internship-details-list');

// Check if the user is authenticated
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    const userId = user.uid;
    const db = firebase.firestore();

    // Function to add internship details to Firestore
    const addInternshipDetails = (details) => {
      db.collection('internshipDetails')
        .doc(userId)
        .set(details)
        .then(() => {
          alert('Internship details submitted successfully!');
          loadInternshipDetails();
        })
        .catch((error) => {
          console.error('Error adding internship details: ', error);
        });
    };

    // Function to load existing internship details from Firestore
    const loadInternshipDetails = () => {
      db.collection('internshipDetails')
        .doc(userId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            const data = doc.data();
            // Display the data in the table
            // You'll need to format and append the data to the table rows
          } else {
            console.log('No internship details found for this user.');
          }
        })
        .catch((error) => {
          console.error('Error getting internship details: ', error);
        });
    };

    // Handle form submission
    internshipDetailsForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentName = document.getElementById('student-name').value;
      const year = document.getElementById('year').value;
      const rollNo = document.getElementById('roll-no').value;
      const companyName = document.getElementById('company-name').value;
      const role = document.getElementById('role').value;
      const stipend = document.getElementById('stipend').value;
      const duration = document.getElementById('duration').value;
      const location = document.getElementById('location').value;

      const internshipDetails = {
        studentName,
        year,
        rollNo,
        companyName,
        role,
        stipend,
        duration,
        location
      };

      addInternshipDetails(internshipDetails);
    });

    // Load existing internship details when the page loads
    loadInternshipDetails();
  } else {
    // User is not signed in, redirect to the login page
    window.location.href = 'student-login.html';
  }
});
