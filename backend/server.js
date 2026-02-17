import express from 'express';
import dotenv from 'dotenv';
import useRoutes from './routes/routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/usuarios', useRoutes);

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});