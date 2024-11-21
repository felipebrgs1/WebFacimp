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
    res.sendFile(path.join(__dirname, 'pages', 'cadastro.html'));
});
app.get('/cadastro_usuario', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastro_usuario.html'));
})
app.get('/cadastro_produto', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastro_produto.html'));
})
app.get('/minha_conta', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'minha_conta.html'));
})
app.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'login.html'));
})

app.get('/lista_comercios/:id', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'lista_comerciosid.html'));
})
app.get('/lista_comercios', async (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'lista_comercio.html'));
})
app.get('/produto/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'listaproduto.html'));
});
app.get('/produto', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'produtos.html'));
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
