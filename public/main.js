const btn = document.getElementById('btn');
const output = document.querySelector('.output');
const btnPost = document.getElementById('submit-btn');
const form = document.querySelector('.form');
const clearBtn = document.getElementById('clear-btn');

function showMessage(message, type = 'success') {
  const messageDiv = document.createElement('div');
  messageDiv.className = `${type}-message`;
  messageDiv.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    ${message}
  `;
  
  const formSection = document.querySelector('.form-section');
  formSection.insertBefore(messageDiv, formSection.firstChild);
  
  setTimeout(() => {
    messageDiv.remove();
  }, 2000);
}

function showLoading() {
  output.innerHTML = `
    <div class="loading">
      <i class="fas fa-spinner"></i>
      <p>Loading users...</p>
    </div>
  `;
}

function showEmptyState() {
  output.innerHTML = `
    <div class="empty-state">
      <i class="fas fa-users"></i>
      <p>No users found. Create your first user to get started!</p>
    </div>
  `;
}

function createUserCard(user) {
  const userCard = document.createElement('div');
  userCard.className = 'user-card';
  userCard.innerHTML = `
    <div class="user-info">
      <div class="user-name">${user.name}</div>
      <div class="user-id">ID: ${user.id}</div>
    </div>
    <div class="user-actions">
      <button class="action-btn edit" onclick="editUser('${user.id}')" title="Edit User">
        <i class="fas fa-edit"></i>
      </button>
      <button class="action-btn delete" onclick="deleteUser('${user.id}')" title="Delete User">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;
  return userCard;
}

async function showUsers() {
  try {
    showLoading();
    const res = await fetch('http://localhost:3000/api/users');
    
    if (!res.ok) {
      throw new Error('Failed to fetch users');
    }
    
    const users = await res.json();
    output.innerHTML = '';
    
    if (users.length === 0) {
      showEmptyState();
      return;
    }
    
    users.forEach((user) => {
      const userCard = createUserCard(user);
      output.appendChild(userCard);
    });
    
  } catch (err) {
    console.error('Error while fetching users:', err);
    output.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        Failed to load users. Please try again.
      </div>
    `;
  }
}

async function createUser(e) {
  e.preventDefault();
  
  const formData = new FormData(form);
  const name = formData.get('name').trim();
  const id = formData.get('id').trim();
  
  if (!name || !id) {
    showMessage('Please fill in all fields', 'error');
    return;
  }
  
  try {
    btnPost.disabled = true;
    btnPost.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...';
    
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, id })
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.msg || 'Failed to create user');
    }
    
    const result = await res.json();
    showMessage('User created successfully!', 'success');
    
    form.reset();
    
    await showUsers();
    
  } catch (err) {
    console.error('Failed to create user:', err);
    showMessage(err.message || 'Failed to create user', 'error');
  } finally {
    btnPost.disabled = false;
    btnPost.innerHTML = '<i class="fas fa-plus"></i> Add User';
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
    
    showMessage('User deleted successfully!', 'success');
    await showUsers();
    
  } catch (err) {
    console.error('Failed to delete user:', err);
    showMessage('Failed to delete user', 'error');
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
    
    showMessage('User updated successfully!', 'success');
    await showUsers();
    
  } catch (err) {
    console.error('Failed to update user:', err);
    showMessage('Failed to update user', 'error');
  }
}

function clearUserList() {
  output.innerHTML = '';
  showEmptyState();
}

btn.addEventListener('click', showUsers);
form.addEventListener('submit', createUser);
clearBtn.addEventListener('click', clearUserList);

document.addEventListener('DOMContentLoaded', () => {
  showUsers();
});

async function addSampleData() {
  const sampleUsers = [
    { id: 'user1', name: 'John Doe' },
    { id: 'user2', name: 'Jane Smith' },
    { id: 'user3', name: 'Bob Johnson' }
  ];
  
  for (const user of sampleUsers) {
    try {
      await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
    } catch (err) {
      console.log('Sample user already exists or error occurred');
    }
  }
  
  await showUsers();
}