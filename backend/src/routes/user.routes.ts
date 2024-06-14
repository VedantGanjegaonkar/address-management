import { Router } from 'express';
import { createUserController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/user.controller';

const router = Router();

router.post('/users', createUserController);
router.get('/users/:userId', getUserByIdController);
router.put('/users/:userId', updateUserController);
router.delete('/users/:userId', deleteUserController);

export default router;
