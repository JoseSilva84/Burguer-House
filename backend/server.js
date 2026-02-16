import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Seja bem-vindo à burgueria!');
});

app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`);
});