document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const scheduleForm = document.getElementById('scheduleForm');
    const trackerForm = document.getElementById('trackerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Handle login functionality
            alert('Login form submitted!');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Handle registration functionality
            alert('Registration form submitted!');
        });
    }

    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Handle scheduling functionality
            alert('Schedule form submitted!');
        });
    }

    if (trackerForm) {
        trackerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // Handle recycling tracking functionality
            alert('Tracker form submitted!');
        });
    }
});
