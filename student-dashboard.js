const search = document.querySelector('.input-group input'),
    table_headings = document.querySelectorAll('thead th'),
    table = document.getElementById("myTable");
    table_rows = table.getElementsByTagName("tr");

function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        var display = "none";
  
        // Loop through all table cells in the current row
        for (j = 0; j < tr[i].cells.length; j++) {
          td = tr[i].cells[j];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              display = "";
              break; // Break the inner loop if a match is found in any cell
            }
          }
        }
        
        // Set the display property for the current row based on the match status
        tr[i].style.display = display; 
    }
}

// 2. Sorting | Ordering data of HTML table
console.log(table_headings);
console.log(table_rows);
table_headings.forEach((head, i) => {
    let sort_asc = true;
    head.onclick = () => {
        table_headings.forEach(head => head.classList.remove('active'));
        head.classList.add('active');

        document.querySelectorAll('td').forEach(td => td.classList.remove('active'));
        for (let j = 1; j < table_rows.length; j++) {
            table_rows[j].querySelectorAll('td')[i].classList.add('active');
        }

        head.classList.toggle('asc', sort_asc);
        sort_asc = head.classList.contains('asc') ? false : true;

        sortTable(i, sort_asc);
    }
});

function sortTable(column, sort_asc) {
    [...table_rows].slice(1).sort((a, b) => {
        let first_row = a.querySelectorAll('td')[column].textContent.toLowerCase(),
            second_row = b.querySelectorAll('td')[column].textContent.toLowerCase();

        return sort_asc ? (first_row < second_row ? 1 : -1) : (first_row < second_row ? -1 : 1);
    })
    .map(sorted_row => document.querySelector('tbody').appendChild(sorted_row));
}


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
const loadData = document.getElementById('loadData');
let currentUserEmail = null;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUserEmail = user.email;
        console.log("Updated currentUserEmail:", currentUserEmail);

        // Now you can perform actions that depend on currentUserEmail
        // For example, call a function or execute code here
        handleUserEmail(currentUserEmail);
    } else {
        console.log("User not logged in");
    }
});

function handleUserEmail(email) {
    // Do something with the user's email
    console.log("Handling user email:", email);
    loadData.addEventListener('click', function (){
        console.log(email);
        const dataList = document.getElementById('internship-details-list');
        dataList.innerHTML = "";
    db.collection("internships").where("email", "==", email)
    .get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                const data = doc.data();
                const name = data.name;
                const roll = data.rollNo;
                const year = data.year;
                const phone = data.phone;
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
                    <td>${phone}</td>
                    <td>${year}</td>
                    <td>${branch}</td>
                    <td>${company}</td>
                    <td>${stipend}</td>
                    <td>${duration}</td>
                    <td>${location}</td>
                `;
                dataList.appendChild(newRow);
            });
            }, (error) => {
                console.error("Error fetching data:", error);
        });
    })
    // Continue with other actions that depend on the user's email

    dataForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(email);
        const name = document.getElementById('firstname').value + ' ' + document.getElementById('lastname').value;
        const roll = document.getElementById('rollno').value;
        const phone = document.getElementById('phone').value;
        const year = document.getElementById('year').value;
        const branch = document.getElementById('branch').value;
        const company = document.getElementById('company').value;
        const stipend = document.getElementById('stipend').value;
        const duration = document.getElementById('doj').value + ' to ' + document.getElementById('doe').value;
        const location = document.getElementById('location').value;
      
        // Add data to Firestore
        db.collection("internships").add({
              email: email, 
              name: name, 
              phone: phone,
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
                alert("Form details saved successfully!");
              dataForm.reset();
          })
          .catch((error) => {
              console.error("Error adding document: ", error);
              alert("Error saving form details!");
          });
      });
          
}

// This will log the initial value of currentUserEmail, which is null
console.log("Initial currentUserEmail:", currentUserEmail);
// Event listener for the form submission

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Successfully signed out");
    }).catch((error) => {
        // An error happened.
        alert("Error signing out:", error);
    });
}
