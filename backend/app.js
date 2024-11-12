require('dotenv').config();
const express = require('express');
const { client } = require('./utils/db');
const estabelecimentoRouters = require('./routes/estabelecimentoRouters');
const productRouters = require('./routes/productRouters');
const userRouters = require('./routes/userRouters');


const app = express();
const port = 5000;

app.use(express.json());



// Rotas da API
app.use('/api/estabelecimentos', estabelecimentoRouters);
app.use('/api/products', productRouters);
app.use('/api/users', userRouters);

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

