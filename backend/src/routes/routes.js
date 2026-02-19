import express from 'express';
import { createUser, deleteUser, getAllUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/todos', getAllUser);

router.post('/cadastro', createUser);

router.delete('/deletar', deleteUser);

export default router;