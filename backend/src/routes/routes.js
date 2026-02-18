import express from 'express';
import { createUser, deleteUser, getAllUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/cadastro', getAllUser);

router.post('/todos', createUser);

router.delete('/deletar', deleteUser);

export default router;