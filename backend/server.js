import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import Sequelize from 'sequelize';
import config from './src/config/database.js';
import User from './src/models/User.js';
import useRoutes from './src/routes/routes.js';

const sequelize = new Sequelize(config);
User.init(sequelize);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use('/usuarios', useRoutes);

sequelize
        .authenticate()
        .then( () => {
            console.log("Conexão com o banco de dados com sucesso.");
        })
        .catch((error) => {
            console.error("Erro ao conectar ao banco de dados:", error);
        });

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});