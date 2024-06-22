document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const scheduleForm = document.getElementById('scheduleForm');
    const trackerForm = document.getElementById('trackerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, password: password }),
            })
            .then(response => response.json())
            .then(data => {
                const messageElement = document.getElementById('message');
                if (data.message) {
                    messageElement.textContent = data.message;
                    if (data.message === 'Logged in successfully') {
                        messageElement.style.color = 'green';
                        // Optionally, redirect to another page or update the UI
                    } else {
                        messageElement.style.color = 'red';
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, email: email, password: password }),
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                // Optionally, redirect to login page or update the UI
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }

    if (scheduleForm) {
        scheduleForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const scheduledDate = document.getElementById('scheduled_date').value;

            fetch('/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ scheduled_date: scheduledDate }),
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                // Optionally, update the UI
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }

    if (trackerForm) {
        trackerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const material = document.getElementById('material').value;
            const quantity = document.getElementById('quantity').value;

            fetch('/recycling', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ material: material, quantity: quantity }),
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                // Optionally, update the UI
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        });
    }
});
