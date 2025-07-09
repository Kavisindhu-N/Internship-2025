
//Prevent access
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const role = localStorage.getItem("role");
if (!loggedInUser || role !== "user") {
    alert("Unauthorized access. Please login.");
    window.location.href = "login.html";
}


document.getElementById("welcomeMessage").textContent = `Welcome, ${loggedInUser.name}!`;

//Logout functionality
document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    alert("You have been logged out.");
    window.location.href = "login.html";
});

const users = JSON.parse(localStorage.getItem("users")) || [];
const tableBody = document.getElementById("userTableBody");
const searchInput = document.getElementById("searchInput");
const pagination = document.getElementById("pagination");

let filteredUsers = [...users];
let currentPage = 1;
const rowsPerPage = 5;

function renderTable(data, page = 1) {
    tableBody.innerHTML = "";
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageUsers = data.slice(start, end);

    if (pageUsers.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger">No users found</td></tr>`;
        pagination.innerHTML = "";
        return;
    }

    pageUsers.forEach((user, index) => {
        const row = `
          <tr>
            <td>${start + index + 1}</td>
            <td>${user.empId}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
    });

    renderPagination(data.length, page);
}

function renderPagination(totalItems, currentPage) {
    const totalPages = Math.ceil(totalItems / rowsPerPage);
    pagination.innerHTML = "";

    // Previous Button
    const prevLi = document.createElement("li");
    prevLi.className = `page-item ${currentPage === 1 ? "disabled" : ""}`;
    prevLi.innerHTML = `<a class="page-link" href="#">Previous</a>`;
    prevLi.addEventListener("click", e => {
        e.preventDefault();
        if (currentPage > 1) {
            renderTable(filteredUsers, currentPage - 1);
        }
    });
    pagination.appendChild(prevLi);

    // Next Button
    const nextLi = document.createElement("li");
    nextLi.className = `page-item ${currentPage === totalPages ? "disabled" : ""}`;
    nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`;
    nextLi.addEventListener("click", e => {
        e.preventDefault();
        if (currentPage < totalPages) {
            renderTable(filteredUsers, currentPage + 1);
        }
    });
    pagination.appendChild(nextLi);
}


// Search option
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    renderTable(filteredUsers, 1);
});

// Initial load
renderTable(filteredUsers, 1);


//Employee ID change
document.getElementById("changeEmpIdBtn").addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("changeEmpIdModal"));
    modal.show();
});

document.getElementById("saveEmpIdBtn").addEventListener("click", () => {
    const newEmpId = document.getElementById("newEmpId").value.trim();

    if (loggedInUser.empIdChanged) {
        alert("You are allowed to change Employee ID only once.");
        return;
    } else if (!newEmpId) {
        alert("Please enter a new Employee ID.");
        return;
    } else if (loggedInUser.empId === newEmpId) {
        alert("New Employee ID cannot be the same as the current one.");
        return;
    } else {
        const allUsers = JSON.parse(localStorage.getItem("users")) || [];
        const idExists = allUsers.some(u => u.empId === newEmpId);
        if (idExists) {
            alert("This Employee ID is already taken. Please choose another.");
            return;
        }
    }

    // Update empId
    const updatedUsers = allUsers.map(u => {
        if (u.email === loggedInUser.email) {
            u.empId = newEmpId;
            u.empIdChanged = true;
            return u;
        }
        return u;
    });

    loggedInUser.empId = newEmpId;
    loggedInUser.empIdChanged = true;

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    alert("Employee ID updated successfully!");
    const modal = bootstrap.Modal.getInstance(document.getElementById("changeEmpIdModal"));
    modal.hide();
    location.reload();
});
