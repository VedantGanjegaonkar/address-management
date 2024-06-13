import express from 'express';
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controller/user.controller';

const router = express.Router();

// Get all users
router.get('/', getAllUsers);

// Create a new user
router.post('/', createUser);

// Update a user
router.put('/:userId', updateUser);

// Delete a user
router.delete('/:userId', deleteUser);

export default router;