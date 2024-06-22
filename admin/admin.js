document.addEventListener("DOMContentLoaded", function() {
    const activitiesContainer = document.querySelector('.report-body .items');
    const recentActivitiesHeader = document.querySelector('.recent-activities');
    const usersContainer = document.querySelector('.users-container');

    function fetchRecyclingActivities() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch('https://trashwell-1.onrender.com/api/admin/recycling', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Expected an array');

            activitiesContainer.innerHTML = data.map(entry => `
                <div class="item1">
                    <h3 class="t-op-nextlvl">Recycling</h3>
                    <h3 class="t-op-nextlvl">${entry.date}</h3>
                    <h3 class="t-op-nextlvl">${entry.User.firstname} ${entry.User.lastname}</h3>
                    <h3 class="t-op-nextlvl label-tag">${entry.status || 'Pending'}</h3>
                </div>
            `).join('');
            recentActivitiesHeader.textContent = 'Recycling Activities';
        })
        .catch(error => {
            console.error('Error fetching recycling activities:', error);
            alert('Error fetching recycling activities. Please try again.');
        });
    }

    function fetchScheduleActivities() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch('https://trashwell-1.onrender.com/api/admin/schedules', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Expected an array');

            activitiesContainer.innerHTML = data.map(collection => `
                <div class="item1">
                    <h3 class="t-op-nextlvl">Scheduled Collection</h3>
                    <h3 class="t-op-nextlvl">${collection.date}</h3>
                    <h3 class="t-op-nextlvl">${collection.User.firstname} ${collection.User.lastname}</h3>
                    <h3 class="t-op-nextlvl label-tag">${collection.status || 'Pending'}</h3>
                </div>
            `).join('');
            recentActivitiesHeader.textContent = 'Schedule Activities';
        })
        .catch(error => {
            console.error('Error fetching schedule activities:', error);
            alert('Error fetching schedule activities. Please try again.');
        });
    }

    function fetchAllUsers() {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch('https://trashwell-1.onrender.com/api/admin/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (!Array.isArray(data)) throw new Error('Expected an array');

            usersContainer.innerHTML = data.map(user => `
                <div class="item1">
                    <h3 class="t-op-nextlvl">User</h3>
                    <h3 class="t-op-nextlvl">${user.firstname} ${user.lastname}</h3>
                    <h3 class="t-op-nextlvl">${user.email}</h3>
                    <h3 class="t-op-nextlvl">${user.address}</h3>
                    <h3 class="t-op-nextlvl label-tag">${user.role}</h3>
                </div>
            `).join('');
            recentActivitiesHeader.textContent = 'User Details';
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Error fetching users. Please try again.');
        });
    }

    function setupProfileSidebar() {
        const profileLink = document.querySelector('.nav-option.option4');
        const sidebar = document.getElementById('sidebar');
        const closeSidebar = document.getElementById('close-sidebar');
        const overlay = document.getElementById('overlay');
        const userProfile = document.getElementById('userProfile');

        profileLink.addEventListener('click', (event) => {
            event.preventDefault();
            sidebar.classList.toggle('active');
            overlay.style.display = 'block';
        });

        closeSidebar.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        });

        const token = sessionStorage.getItem('authToken');
        if (!token) {
            window.location.href = 'login.html';
            return;
        }

        fetch('https://trashwell-1.onrender.com/api/auth/details', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(response => {
            if (!response.ok) throw new Error('User not found!');
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error('Error:', data.error);
                alert('Error fetching user data. Please try again.');
                sessionStorage.removeItem('authToken');
                window.location.href = 'login.html';
            } else {
                userProfile.innerHTML = `
                    <p><strong>Name:</strong> ${data.firstname} ${data.lastname}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Address:</strong> ${data.address}</p>
                `;
            }
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
            alert('Error fetching user data. Please try again.');
        });
    }

    document.querySelector('.nav-option.option2').addEventListener('click', fetchRecyclingActivities);
    document.querySelector('.nav-option.option3').addEventListener('click', fetchScheduleActivities);
    document.querySelector('.nav-option.option5').addEventListener('click', fetchAllUsers);

    document.getElementById('logout').addEventListener('click', function() {
        sessionStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });

    fetchRecyclingActivities();
    setupProfileSidebar();
});

document.querySelector(".menuicn").addEventListener("click", () => {
    document.querySelector(".navcontainer").classList.toggle("navclose");
});
