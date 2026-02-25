import crypto from 'node:crypto';
import User from '../models/User.js';

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

    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado" });
        }

        const passwordMatch = await user.checkPassword(password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Senha inválida" });
        }

        res.status(200).json({
            message: "Login realizado com sucesso",
            user: { id: user.id, name: user.name, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};