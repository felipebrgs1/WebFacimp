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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});
app.use(express.static('pages')); // Servir arquivos estáticos da pasta 'public'

app.get('/cadastro_comercio', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastro_comercio.html'));
})
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastro_comercio.html'));
});
app.get('/cadastrousuario', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastrousuario.html'));
})
app.get('/cadastroproduto', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastroproduto.html'));
})
app.get('/minha_conta', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'minha_conta.html'));
})
app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
})

app.get('/lista_comercios', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'lista_comercios.html'));
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
