const signup = document.getElementById("signupForm");
const signupButton = document.getElementById('signupButton');

signupButton.addEventListener('click', e => {
    e.preventDefault();

    const signupName = document.getElementById('signupName').value.trim();
    const signupEmail = document.getElementById('signupEmail').value.trim();
    const signupPassword = document.getElementById('signupPassword').value;
    const signupConfirmPassword = document.getElementById('signupConfirmPassword').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
        alert('Please fill all the details');
        return;
    }


    if (!emailRegex.test(signupEmail)) {
        alert('Please enter a valid email address');
        return;
    }


    let users = JSON.parse(localStorage.getItem('users')) || [];
    const emailExists = users.some(user => user.email === signupEmail);
    if (emailExists) {
        alert('Email already registered. Please Login');
        window.location.href = 'login.html';
        return;
    }


    if (!passwordRegex.test(signupPassword)) {
        alert('Password must be at least 8 characters and include uppercase, lowercase, number, and special character');
        return;
    }


    if (signupPassword !== signupConfirmPassword) {
        alert('Password does not match');
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
    localStorage.setItem("role", "user");
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));


    document.getElementById("signupName").value = "";
    document.getElementById("signupEmail").value = "";
    document.getElementById("signupPassword").value = "";
    document.getElementById("signupConfirmPassword").value = "";

    alert('Registration successfull');
    window.location.href = 'userDashboard.html';
});
