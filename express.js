import express from 'express';

const app = express();
const port =3000;
const users = [];

// Add the express.json() middleware to parse JSON request bodies. This is correct.
app.use(express.json());

// GET route for the root path. This is a nice welcome message.
app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to my page" });
});

// GET route for the /users path
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// POST route for creating a new user
app.post('/users', (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({ message: "User ID and name are required" });
  }

  const userExists = users.some(user => user.id === id);
  if (userExists) {
    // 409 Conflict
    // is a more appropriate status code for a resource that already exists.
    return res.status(409).json({ message: 'User with this ID already exists' });
  }

  const newUser = { id, name };
  users.push(newUser);

  // --- Response ---
  // 201 Created is the correct status for a successful creation.
  // It's a best practice to return the newly created resource in the response body.
  res.status(201).json(newUser);
});

// DELETE route for deleting a user by ID
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  else {
    users.splice(userIndex, 1);
    res.status(200).send("deleted!");
  }
});

// Start the server
app.listen(port, () => console.log(`✅ Backend running on http://localhost:${port}`));