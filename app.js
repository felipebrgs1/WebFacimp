require('dotenv').config();
const express = require('express');
const { sql } = require('./utils/db');  // Certifique-se de que está configurado corretamente
const path = require('path');
const cors = require('cors');
const estabelecimentoRouters = require('./routes/estabelRouters');
const productRouters = require('./routes/productRouters');
const userRouters = require('./routes/userRouters');

const app = express();

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
    res.sendFile(path.join(__dirname, 'pages', 'cadastro.html'));
});

// Exporte o app para que a Vercel possa gerenciar o servidor
module.exports = app;
