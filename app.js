require('dotenv').config();
const express = require('express');
const { sql } = require('./utils/db');  // Certifique-se que este está configurado corretamente
const path = require('path');
const cors = require('cors');
const estabelecimentoRouters = require('./routes/estabelRouters');
const productRouters = require('./routes/productRouters');
const userRouters = require('./routes/userRouters');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.use('/api/estabelecimentos', estabelecimentoRouters);
app.use('/api/products', productRouters);
app.use('/api/users', userRouters);

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

// Rota para a página de cadastro
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastroestabelecimento.html'));
});

app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
})
app.get('/cadastrousuario', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastrousuario.html'));
})
app.get('/produtos', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'produtos.html'));
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
