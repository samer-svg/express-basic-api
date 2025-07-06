export const users= [];

//get all users
export const getAllUsers = (req, res, next) => {
  const limit = req.query.limit;
  if (limit > users.length) {
    const error = new Error('you hit the limit no more users');
    error.status = 400;
    return next(error);
  }
  if (!isNaN(limit) && limit > 0) {
    // Get users based on the limit
    return res.status(200).json(users.slice(0, limit));
  }
  // Get all users if no valid limit is provided
  res.status(200).json(users);
}

//get users by id
export const  getUsersById = (req, res, next) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  if (!user) {
    const error = new Error(`post with ${id} not exist`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(user);
}

//add now users
export const postUsers = (req, res, next) => {
  const { id, name } = req.body;
  if ( !id &&!name) {
    const error = new Error(`user's name must be defined`);
    error.status = 400;
    return next(error);
  }

  // --- Creation ---
  users.push({name , id});

  res.status(201).json('created!');
}

//update the user by id 
export const putUser = (req, res, next) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  if (!user) {
    const error = new Error(`user not found`);
    error.status = 404;
    return next(error);
  }
  user.name = req.body.name;
  res.status(200).json('updated!');
}

//delete user by id 
export const deleteUser =  (req, res, next) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex === -1) {
    const error = new Error(`user not found`);
    error.status = 404; // 404 Not Found is more appropriate here.
    return next(error);
  }

  users.splice(userIndex, 1);
  // 204 No Content is the standard response for a successful deletion with no body.
  res.sendStatus(204);
}