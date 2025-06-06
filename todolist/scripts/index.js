"use strict";
console.log(window.location.href);
const CUrl = window.location.href;
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const taskList = document.getElementById('taskList');
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm.length === 0) {
            taskList.innerHTML = `<li><i class="fi fi-rs-triangle-warning"></i> Search!</li>`;
            return;
        }
        const RequestForm = {
            usernames: [searchTerm],
            excludeBannedUsers: true
        };
        axios.post('/api/getRobloxUser', RequestForm)
            .then(response => {
            const users = response.data.data;
            if (!users || users.length === 0) {
                taskList.innerHTML = `<li><i class="fi fi-rs-triangle-warning"></i> No users found!</li>`;
                return;
            }
            renderUsers(users);
        })
            .catch(error => {
            console.error('Error fetching users:', error);
            taskList.innerHTML = `<li><i class="fi fi-rs-triangle-warning"></i> Something went wrong!</li>`;
        })
            .finally(() => {
            // Optional: Add any cleanup code here if needed
        });
    });
    function renderUsers(users) {
        taskList.innerHTML = ''; // Clear the list
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
          <strong>${user.displayName}</strong><br>
          <small>@${user.name}</small> ${user.hasVerifiedBadge ? '✅' : ''}
        `;
            taskList.appendChild(li);
        });
    }
});
