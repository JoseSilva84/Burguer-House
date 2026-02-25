import express from 'express';
import { createUser, deleteUser, getAllUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/todos', getAllUser);

router.post('/cadastro', createUser);

// rota de login simples (nome + senha)
router.post('/login', loginUser);

router.delete('/deletar', deleteUser);

export default router;