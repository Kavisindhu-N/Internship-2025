
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
const signup = document.getElementById("signupForm");
const forgot = document.getElementById("forgotForm");
const loginButton = document.getElementById('loginButton')
const signupButton = document.getElementById('signupButton')

//Display toggle
function showForm(form) {
    login.classList.add("d-none");
    signup.classList.add("d-none");
    forgot.classList.add("d-none");
    if (form === "login") login.classList.remove("d-none");
    else if (form === "signup") signup.classList.remove("d-none");
    else if (form === "forgot") forgot.classList.remove("d-none");
}


//admin Data
const adminData = {
    email: "admin@gmail.com",
    password: "admin123"
};
localStorage.setItem("adminCredentials", JSON.stringify(adminData));


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
        showForm('signup')
        return;
    }
    if (foundUser.password !== passwordInput) {
        alert("Incorrect password. Please try again.");
        return;
    }
    alert("User login successful!");
    localStorage.setItem("role", "user");
    localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
    location.href = "userDashboard.html";
});



//Sign up Button action
signupButton.addEventListener('click', e => {
    e.preventDefault();
    const signupName = document.getElementById('signupName').value.trim();
    const signupEmail = document.getElementById('signupEmail').value.trim();
    const signupPassword = document.getElementById('signupPassword').value.trim();
    const signupConfirmPassword = document.getElementById('signupConfirmPassword').value.trim();
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
        alert('Please fill all the details');
    } else if (signupPassword.length < 8) {
        alert('Password must be at least 8 characters');
    } else if (signupPassword !== signupConfirmPassword) {
        alert('Password does not match');
    } else {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const emailExists = users.some(user => user.email === signupEmail);
        if (emailExists) {
            alert('Email already registered. Please Login');
            showForm('login')
            return;
        }
        let newIdNumber = users.length + 1;
        let empId = `EMP${newIdNumber.toString().padStart(3, '0')}`;
        const newUser = {
            empId: empId,
            name: signupName,
            email: signupEmail,
            password: signupPassword
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registeration successfull, Please login to continue')
        showForm('login')
    }
});


//Change Password
const changePassword = document.getElementById('changePassword');

changePassword.addEventListener('click', (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value.trim();
    const newPassword = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 1. Email not registered
    const userIndex = users.findIndex(user => user.email === email);
    if (userIndex === -1) {
        alert("This email is not registered. Please sign up first.");
        showForm('signup');
        return;
    }

    // 2. Password match check
    if (!newPassword || !confirmPassword) {
        alert("Please enter both password fields.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    // 3. Same password as before
    if (users[userIndex].password === newPassword) {
        alert("New password cannot be the same as the old password.");
        return;
    }

    // 4. Success - update password
    users[userIndex].password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful. Please login.");
    showForm('login');
});
