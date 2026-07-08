import express from 'express';
import { updateUser, deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.put('/update', authenticateToken, updateUser);
router.delete('/delete', authenticateToken, deleteUser);

export default router;
