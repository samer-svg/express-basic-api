const btn = document.getElementById('btn');
let output= document.querySelector('.output');
const btnPost = document.getElementById('submit-btn');
const form = document.querySelector('.form');

async function showUsers() {
  try {
  const res = await fetch('http://localhost:3000/api/users');
  if (!res.ok) {
    throw new Error('failed to fetch');
  }
  const users = await res.json();
  output.innerHTML=''
  users.forEach((user) => {
    const userEl = document.createElement('div');
    userEl.textContent=`${user.id} - ${user.name}`;
    output.appendChild(userEl);
  })
  }
  catch(err) {
    console.log('error while fetching users',err);
  }
}

const createPost = async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get('name');
  const id = formData.get('id');
  try {
    const res = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify({name , id})
    })
    if (!res.ok) {
      throw new Error('failed to create a new post');
    }
    const newPost= await res.json();
    const postEl = document.createElement('div');
    postEl.textContent= `${newPost.name} - ${newPost.id}`;
    output.appendChild(postEl);
    showUsers();
  }catch(err) {
    console.error('failed to create post',err)
  }
} 

btn.addEventListener('click',showUsers)
btnPost.addEventListener('click',createPost)