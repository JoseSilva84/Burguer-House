import User from '../models/User.js';
import crypto from 'node:crypto';

export const createUser = async (req, res) => {
    try {
        const userToCreate = {
            id: crypto.randomUUID(),
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            adress: req.body.adress
        }
        
            const user = await User.create(userToCreate);
            
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

export const getAllUser = async (req, res) => {
    
    const user = await User.findAll();
    res.status(200).json(user);
};

export const deleteUser = async (req, res) => {
    const { id } = req.body;
    
    if (!id) {
        return res.status(400).json({ error: "ID é obrigatório" });
    }
    
    const result = await User.destroy({ where: { id } });
    
    if (result === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
    }
    
    res.status(200).json({ message: "Usuário deletado com sucesso" });
};