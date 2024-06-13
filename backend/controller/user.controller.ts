import { Request, Response } from 'express';
import { UserModel, IUser } from '../models/user.model';
import { log } from 'console';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    console.log("this is req.body :"+req.body)
    const newUser = new UserModel(req.body);
    
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.body
      const updatedUser = await UserModel.findOneAndUpdate(
        { userId: userId},
        req.body,
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
      return res.json(updatedUser);
    } catch (err) {
      return res.status(400).json({ error: 'Failed to update user' });
    }
  };

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const {userId} = req.body
    const deletedUser = await UserModel.findOneAndDelete({ userId: userId });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'User deleted successfully' });
  } catch (err) {
    return res.status(400).json({ error: 'Failed to delete user' });
  }
};