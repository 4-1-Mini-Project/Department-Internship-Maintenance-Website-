//Searching the table
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

// Sorting | Ordering data of HTML table
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



// 3. Converting HTML table to PDF

const pdf_btn = document.querySelector('#toPDF');

function generatePDF() {

    var sTable = document.getElementById('myTable').innerHTML;

        var style = "<style>";
        style = style + "table {width: 100%;font: 17px Calibri;}";
        style = style + "table, th, td {border: solid 1px #DDD; border-collapse: collapse;";
        style = style + "padding: 2px 3px;text-align: center;}";
        style = style + "</style>";

        // CREATE A WINDOW OBJECT.
        var win = window.open('', '', 'height=700,width=700');

        win.document.write('<html><head>');
        win.document.write('<title>Profile</title>');   // <title> FOR PDF HEADER.
        win.document.write(style);          // ADD STYLE INSIDE THE HEAD TAG.
        win.document.write('</head>');
        win.document.write('<body>');
        win.document.write(sTable);         // THE TABLE CONTENTS INSIDE THE BODY TAG.
        win.document.write('</body></html>');

        win.document.close(); 	// CLOSE THE CURRENT WINDOW.

        win.print();    // PRINT THE CONTENTS.
  }
  
  pdf_btn.addEventListener('click', generatePDF);

// Converting HTML table to EXCEL File

const excel_btn = document.querySelector('#toEXCEL');
const my_table = document.querySelector('#myTable');
const toExcel = function (table) {
    $(table).table2excel({
		exclude: ".no-export",
		filename: "download",
		fileext: ".xls",
		exclude_links: true,
		exclude_inputs: true
	});
}

excel_btn.onclick = () => {
    const excel = toExcel(my_table);
}


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
const dataList = document.getElementById('internship-details-list');

// Function to fetch students data
document.addEventListener('DOMContentLoaded', (e) => {
        db.collection('internships').get()
        .then((querySnapshot) => {
                
                const dataList = document.getElementById('internship-details-list');
                
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
            });
            }, (error) => {
                console.error("Error fetching data:", error);
        });
    }

);


// Event listener for sign out

function signOut() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        alert("Successfully signed out");
    }).catch((error) => {
        // An error happened.
        alert("Error signing out:", error);
    });
}
