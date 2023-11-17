document.addEventListener("DOMContentLoaded", function () {
    // Get all menu items
    var menuItems = document.querySelectorAll('.menu-item');

    // Add click event listener to each menu item
    menuItems.forEach(function (menuItem) {
        menuItem.addEventListener('click', function () {
            var targetId = menuItem.getAttribute('data-target');
            var targetElement = document.getElementById(targetId);
            // Toggle the visibility of the target element
            if (targetElement.style.display === 'flex') {
                targetElement.style.display = 'none';
            } else {
                targetElement.style.display = 'flex';
            }
            if (targetId === 'item-one') {
                var  temp = document.getElementById('item-two');
            }
            else {
                var  temp = document.getElementById('item-one');
            }
            temp.style.display = 'none';
            
        });
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
const user = firebase.auth().currentUser;
console.log(user);
let currentUserEmail = null; 
if (user !== null) {
  currentUserEmail =  user.email;
  console.log(currentUserEmail)
} else {
    console.log('ws');
  // No user is signed in.
}
console.log(currentUserEmail);
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




// Liste
// Event listener for the form submission

// Function to fetch user-specific data


document.addEventListener('DOMContentLoaded', (e) => {
    const email = getUserEmail();
    console.log(email);
    db.collection("internships").where("email", "==", email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                const data = doc.data();
                console.log(data);
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
                    
                    <td>${roll}</td>
                    <td>${name}</td>
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


