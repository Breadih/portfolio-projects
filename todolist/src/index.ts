declare const axios: {
    post: <T = any>(url: string, data?: any) => Promise<{ data: T }>
  };
  
console.log(window.location.href)

const CUrl = window.location.href 


interface RobloxUser {
    requestedUsername: string;
    hasVerifiedBadge: boolean;
    id: number;
    name: string;
    displayName: string;
  }
  
  interface RobloxUserResponse {
    data: RobloxUser[];
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const taskList = document.getElementById('taskList') as HTMLUListElement;
  
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
  
      axios.post<RobloxUserResponse>(
        '/api/getRobloxUser',
        RequestForm
      )
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
  
    function renderUsers(users: RobloxUser[]) {
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
