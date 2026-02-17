import express from 'express';
import { createUser, getAllUser, deleteUser } from '../controllers/userController';

const router = express.Router();

router.get('/cadastro', getAllUser);

router.post('/todos', createUser);

router.delete('/deletar', deleteUser);

export default router;