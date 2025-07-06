// DOM Elements
const usersGrid = document.getElementById('users-grid');
const refreshBtn = document.getElementById('refresh-btn');
const totalUsersElement = document.getElementById('total-users');

// Utility Functions
function showLoading() {
  usersGrid.innerHTML = `
    <div class="loading">
      <i class="fas fa-spinner"></i>
      <p>Loading users...</p>
    </div>
  `;
}

function showEmptyState() {
  usersGrid.innerHTML = `
    <div class="empty-state">
      <i class="fas fa-users"></i>
      <h3>No Users Found</h3>
      <p>There are no users in the system yet. Create your first user to get started!</p>
    </div>
  `;
  totalUsersElement.textContent = '0';
}

function createUserCard(user) {
  const userCard = document.createElement('div');
  userCard.className = 'user-card';
  
  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  userCard.innerHTML = `
    <div class="user-avatar">${initials}</div>
    <div class="user-info">
      <h3>${user.name}</h3>
      <div class="user-id">ID: ${user.id}</div>
    </div>
    <div class="user-actions">
      <button class="action-btn edit" onclick="editUser('${user.id}')" title="Edit User">
        <i class="fas fa-edit"></i> Edit
      </button>
      <button class="action-btn delete" onclick="deleteUser('${user.id}')" title="Delete User">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
  `;
  return userCard;
}

// API Functions
async function loadUsers() {
  try {
    showLoading();
    const res = await fetch('http://localhost:3000/api/users');
    
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const users = await res.json();
    
    // Update stats
    totalUsersElement.textContent = users.length;
    
    if (users.length === 0) {
      showEmptyState();
      return;
    }
    
    // Clear and populate grid
    usersGrid.innerHTML = '';
    users.forEach((user) => {
      const userCard = createUserCard(user);
      usersGrid.appendChild(userCard);
    });
    
  } catch (err) {
    console.error('Error while fetching users:', err);
    usersGrid.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error Loading Users</h3>
        <p>Failed to load users. Please try again.</p>
      </div>
    `;
  }
}

async function deleteUser(userId) {
  if (!confirm('Are you sure you want to delete this user?')) {
    return;
  }
  
  try {
    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'DELETE'
    });
    
    if (!res.ok) {
      throw new Error('Failed to delete user');
    }
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #d1fae5;
      color: #065f46;
      padding: 15px 20px;
      border-radius: 8px;
      border: 1px solid #a7f3d0;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> User deleted successfully!';
    document.body.appendChild(successMsg);
    
    setTimeout(() => successMsg.remove(), 3000);
    
    await loadUsers();
    
  } catch (err) {
    console.error('Failed to delete user:', err);
    alert('Failed to delete user');
  }
}

async function editUser(userId) {
  const newName = prompt('Enter new name for the user:');
  
  if (!newName || newName.trim() === '') {
    return;
  }
  
  try {
    const res = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: newName.trim() })
    });
    
    if (!res.ok) {
      throw new Error('Failed to update user');
    }
    
    // Show success message
    const successMsg = document.createElement('div');
    successMsg.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #d1fae5;
      color: #065f46;
      padding: 15px 20px;
      border-radius: 8px;
      border: 1px solid #a7f3d0;
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 8px;
    `;
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> User updated successfully!';
    document.body.appendChild(successMsg);
    
    setTimeout(() => successMsg.remove(), 3000);
    
    await loadUsers();
    
  } catch (err) {
    console.error('Failed to update user:', err);
    alert('Failed to update user');
  }
}

// Event Listeners
refreshBtn.addEventListener('click', loadUsers);

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
});