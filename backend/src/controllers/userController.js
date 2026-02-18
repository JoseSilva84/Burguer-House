import User from '../models/User.js';

export const createUser = async (req, res) => {
    
    const user = await User.create(req.body);
    res.status(200).json(user);
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