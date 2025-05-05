"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
console.log(window.location.href);
const CUrl = window.location.href;
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const taskList = document.getElementById('taskList');
    searchInput.addEventListener('input', () => __awaiter(void 0, void 0, void 0, function* () {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm.length === 0) {
            taskList.innerHTML = `<li><i class="fi fi-rs-triangle-warning"></i> Search!</li>`;
            return;
        }
        const RequestForm = {
            usernames: [searchTerm],
            excludeBannedUsers: true
        };
        try {
            // No import needed, Axios is available globally from the CDN
            const response = yield axios.post(`/api/getRobloxUser`, {
                usernames: [searchTerm],
                excludeBannedUsers: true
            });
            const users = response.data.data;
            if (!users || users.length === 0) {
                taskList.innerHTML = `<li><i class="fi fi-rs-triangle-warning"></i> No users found!</li>`;
                return;
            }
            renderUsers(users);
        }
        catch (error) {
            console.error('Error fetching users:', error);
            taskList.innerHTML = `<li><i class="fi fi-rs-triangle-warning"></i> Something went wrong!</li>`;
        }
    }));
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
