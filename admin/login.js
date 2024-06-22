document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        fetch('https://trashwell-1.onrender.com/api/adminauth/login', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => { throw new Error(data.error); });
            }
            return response.json();
        })
        .then(data => {
            sessionStorage.setItem('authToken', data.token);
            window.location.href = 'auth.html';
        })
        .catch(error => {
            console.error('Error logging in:', error);
            errorMessage.textContent = error.message;
        });
    });
});
