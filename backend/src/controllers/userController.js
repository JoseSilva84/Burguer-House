export const createUser = (req, res) => {
    
    res.status(200).json({ message: "Usuário criado com sucesso"})
};

export const getAllUser = (req, res) => {

    res.status(200).json({ message: "Usuário trazido com sucesso"})
};

export const deleteUser = (req, res) => {

    res.status(200).json({ message: "Usuário deletado com sucesso"})
};