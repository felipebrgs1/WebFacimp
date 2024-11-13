require('dotenv').config();
const express = require('express');
const { client } = require('./utils/db');
const path = require('path');
const cors = require('cors');
const estabelecimentoRouters = require('./routes/estabelecimentoRouters');
const productRouters = require('./routes/productRouters');
const userRouters = require('./routes/userRouters');


const app = express();
const port = 5000;


app.use(cors());

app.use(express.json());

app.set('view engine', 'ejs');

// Rotas da API
app.use('/api/estabelecimentos', estabelecimentoRouters);
app.use('/api/products', productRouters);
app.use('/api/users', userRouters);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'home.html'));
});

// Rota para a página "sobre"
app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'cadastro.html'));
});


// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

