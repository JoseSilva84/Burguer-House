import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Seja bem-vindo à burgueria!');
});

app.post('/', (req, res) => {
    res.send('Seja bem-vindo à burgueria!');
});

app.put('/', (req, res) => {
    res.send('Seja bem-vindo à burgueria!');
});

app.delete('/', (req, res) => {
    res.send('Seja bem-vindo à burgueria!');
});

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});