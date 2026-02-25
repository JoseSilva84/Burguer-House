import crypto from 'node:crypto';
import User from '../models/User.js';
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    // log incoming body for debugging
    console.log('createUser body:', req.body);

    const { name, email, password, adress } = req.body;
    if (!name || !email || !adress || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const userToCreate = {
            id: crypto.randomUUID(),
            name,
            email,
            adress,
            password
        };

        const user = await User.create(userToCreate);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
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

// simples login usando nome + senha (sem hash para este protótipo)
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(401).json({ error: "Usuário não encontrado" });
    }

    const match = await user.checkPassword(password);
    if (!match) {
        return res.status(401).json({ error: "Senha inválida" });
    }

    //gera o token
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({
        token,
        user: { id: user.id, name: user.name }
    });
};