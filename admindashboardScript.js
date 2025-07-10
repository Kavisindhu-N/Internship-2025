// Prevent access
const role = localStorage.getItem("role");
if (role !== "admin") {
    alert("Unauthorized access.");
    window.location.href = "login.html";
}

const adminName = document.getElementById('adminName');
const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("userTableBody");

// Load data
const localAdminData = JSON.parse(localStorage.getItem('adminCredentials'));
const localUserData = JSON.parse(localStorage.getItem("users")) || [];
let filteredUsers = [...localUserData]; 

// Show Admin Name
if (localAdminData) {
    adminName.textContent = `Welcome, ${localAdminData.name || "Admin"}!`;
}

// Logout
document.getElementById('logoutButton').addEventListener('click', () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("role");
    alert("You have been logged out.");
    window.location.href = "login.html";
});

// Search functionality
searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredUsers = localUserData.filter(user =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    );
    renderUsers(filteredUsers);
});

// Render users
function renderUsers(users) {
    tableBody.innerHTML = "";

    if (users.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">No users found</td></tr>`;
        return;
    }

    users.forEach((user, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.empId}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button class="btn btn-sm text-danger border-0 bg-transparent remove-btn" data-email="${user.email}">
                    Remove
                </button>
            </td>
            <td>
                <button class="btn btn-sm text-success border-0 bg-transparent promote-btn ms-2" data-email="${user.email}">
                    Promote
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });

    attachRemoveEvents();
    attachPromoteEvents();
}

// Remove user functionality
function attachRemoveEvents() {
    const removeButtons = document.querySelectorAll(".remove-btn");

    removeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const emailToRemove = btn.getAttribute("data-email");

            const updatedUsers = localUserData.filter(user => user.email !== emailToRemove);
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            // Remove if currently logged in
            const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            if (loggedInUser && loggedInUser.email === emailToRemove) {
                localStorage.removeItem("loggedInUser");
                localStorage.removeItem("role");
                window.location.href = "login.html";
            }

            alert("User removed successfully.");
            location.reload();
        });
    });
}

// Promote user functionality
function attachPromoteEvents() {
    const promoteButtons = document.querySelectorAll(".promote-btn");

    promoteButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const emailToPromote = btn.getAttribute("data-email");

            const userToPromote = localUserData.find(user => user.email === emailToPromote);
            if (!userToPromote) return alert("User not found.");

            // Set new admin credentials
            localStorage.setItem("adminCredentials", JSON.stringify({
                email: userToPromote.email,
                password: userToPromote.password,
                name: userToPromote.name
            }));

            // Remove from user list
            const updatedUsers = localUserData.filter(user => user.email !== emailToPromote);
            localStorage.setItem("users", JSON.stringify(updatedUsers));

            alert(`${userToPromote.name} has been promoted to Admin.`);
            location.reload();
        });
    });
}

// Initial render
renderUsers(filteredUsers);
