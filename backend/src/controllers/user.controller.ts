import { Request, Response } from 'express';
import { createUser, getUserById, updateUser, deleteUser } from '../services/user.service';
import { log } from 'console';

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
    // console.log(error);
    log(error);
    
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(Number(req.params.userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUser(Number(req.params.userId), req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUserController = async (req: Request, res: Response) => {
  try {
    const user = await deleteUser(Number(req.params.userId));
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

export { createUserController, getUserByIdController, updateUserController, deleteUserController };
