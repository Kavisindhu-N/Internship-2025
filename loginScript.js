
//Redirection
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const role = localStorage.getItem("role");
if (role) {
    if (role === "admin") {
        window.location.href = "adminDashboard.html";
    } else if (role === "user") {
        window.location.href = "userDashboard.html";
    }
}

const login = document.getElementById("loginForm");
const forgot = document.getElementById("forgotForm");
const loginButton = document.getElementById('loginButton')


//Display toggle
function showForm(form) {
    login.classList.add("d-none");
    forgot.classList.add("d-none");

    if (form === "login") {
        login.classList.remove("d-none")
    } else {
        forgot.classList.remove("d-none");
    }
}



// Set default admin data only if not already in localStorage
if (!localStorage.getItem("adminCredentials")) {
    const adminData = {
        email: "admin@gmail.com",
        password: "admin123"
    };
    localStorage.setItem("adminCredentials", JSON.stringify(adminData));
}



//Login submit action
loginButton.addEventListener('click', e => {
    e.preventDefault();
    const emailInput = document.getElementById("loginEmail").value.trim();
    const passwordInput = document.getElementById("loginPassword").value.trim();
    const storedAdmin = JSON.parse(localStorage.getItem("adminCredentials"));
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    if (!emailInput || !passwordInput) {
        alert("Please enter both email and password.");
        return;
    }
    if (emailInput === storedAdmin.email && passwordInput === storedAdmin.password) {
        localStorage.setItem("role", "admin");
        alert("Admin login successful!");
        window.location.href = "adminDashboard.html";
        return;
    }
    const foundUser = existingUsers.find(user => user.email === emailInput);
    if (!foundUser) {
        alert("Email not found. Please register first.");
        window.location.href = 'register.html'
        return;
    }
    if (foundUser.password !== passwordInput) {
        alert("Incorrect password. Please try again.");
        return;
    }
    alert("User login successful!");
    localStorage.setItem("role", "user");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    document.getElementById("loginEmail").value = "";
    document.getElementById("loginPassword").value = "";
    location.href = "userDashboard.html";
});



//Change Password
const changePassword = document.getElementById('changePassword');

changePassword.addEventListener('click', e => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value.trim();
    const newPassword = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    // Email not registered
    const userIndex = users.findIndex(user => user.email === email);
    if (!email || !newPassword || !confirmPassword) {
        alert("Please enter all the fields.");
        return;
    }
    if (userIndex === -1) {
        alert("This email is not registered. Please register first.");
        window.location.href = 'register.html';
        return;
    }


    if (!passwordRegex.test(newPassword)) {
        alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
        return;
    }


    if (newPassword !== confirmPassword) {
        alert('Password does not match');
        return;
    }

    // Same password as before
    if (users[userIndex].password === newPassword) {
        alert("New password cannot be the same as the old password.");
        return;
    }

    // Success - update password
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful. Please login.");
    showForm('login');
});
