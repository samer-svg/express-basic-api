import express from 'express';
import {
  users,
  getAllUsers,
  getUsersById,
  postUsers,
  putUser,
  deleteUser
} from '../controllers/controllers.js'

const router = express.Router();

router.get('/', getAllUsers);

router.get('/:id', getUsersById);

router.post('/', postUsers);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

export default router;