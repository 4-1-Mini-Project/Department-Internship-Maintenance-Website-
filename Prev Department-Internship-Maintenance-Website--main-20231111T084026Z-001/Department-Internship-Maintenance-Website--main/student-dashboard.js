const menuItems = document.querySelectorAll('.menu-item');
        const imageContainers = document.querySelectorAll('.image-container');

        menuItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-target');
                const imageContainer = document.getElementById(targetId);
                const currentlyDisplayed = imageContainer.style.display;

                // Hide all image containers
                imageContainers.forEach(container => {
                    container.style.display = 'none';
                });

                // Show the selected image container if it's not currently displayed
                if (currentlyDisplayed !== 'block') {
                    imageContainer.style.display = 'block';
                }
            });
        });
 
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
const db = firebase.firestore();
const auth = firebase.auth();

const dataForm = document.getElementById('internship-details-form');
const dataTable = document.getElementById('data-table');
const dataList = document.getElementById('internship-details-list');
const loadData = document.getElementById('loadData');
let currentUserEmail = null;

// Listen for authentication state changes
auth.onAuthStateChanged((user) => {
  if (user) {
      currentUserEmail = user.email;
      // Fetch and display user-specific data
      //fetchUserData(currentUserEmail);
  } else {
      currentUserEmail = null;
      // Handle when the user is not logged in
  }

});
// Event listener for the form submission
dataForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('student-name').value;
  const roll = document.getElementById('roll-no').value;
  const year = document.getElementById('year').value;
  const branch = document.getElementById('branch').value;
  const company = document.getElementById('company-name').value;
  const stipend = document.getElementById('stipend').value;
  const duration = document.getElementById('duration').value;
  const location = document.getElementById('location').value;
  const email = currentUserEmail;

  // Add data to Firestore
  db.collection("internships").add({
        email: email, 
        name: name, 
        rollNo: roll,
        year: year, 
        branch: branch, 
        company: company, 
        stipend: stipend, 
        duration: duration, 
        location: location 
    })
    .then(() => {
          // Clear the form
          console.log("Document successfully written!");
        dataForm.reset();
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
});

// Function to fetch user-specific data
document.addEventListener('DOMContentLoaded', (e) => {
    
    const loadData = document.getElementById('loadData');

    loadData.addEventListener('click', (e) => {
        e.preventDefault();
        const email = currentUserEmail;
        db.collection("internships").where("email", "==", email)
            .onSnapshot((querySnapshot) => {
                const dataTable = document.getElementById('data-table');
                const dataList = document.getElementById('internship-details-list');
                dataTable.innerHTML = "<thead><tr><th>Student Name</th><th>Roll No</th><th>Year</th><th>Branch</th><th>Company Name</th><th>Role</th><th>Stipend</th><th>Duration</th><th>Location</th></tr></thead>";
                dataList.innerHTML = ""; // Clear the list
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                
                const name = data.name;
                const roll = data.rollNo;
                const year = data.year;
                const branch = data.branch;
                const company = data.company;
                const stipend = data.stipend;
                const duration = data.duration;
                const location = data.location;

                // Add data to the table
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${name}</td>
                    <td>${roll}</td>
                    <td>${year}</td>
                    <td>${branch}</td>
                    <td>${company}</td>
                    <td>${stipend}</td>
                    <td>${duration}</td>
                    <td>${location}</td>
                `;
                dataList.appendChild(newRow);
                console.log(dataList)
            });
            }, (error) => {
                console.error("Error fetching data:", error);
        });
    }

);
});
