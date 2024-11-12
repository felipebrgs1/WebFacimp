const { client } = require('../utils/db');



exports.createEstabelecimento = async (req, res) => {
    const { cnpj, categoria, name, cep, rua, bairro, numero, cidade, estado, telefone } = req.body;
    try {
        const query = `
      INSERT INTO estabelecimentos (cnpj, categoria, name, cep, rua, bairro, numero, cidade, estado, telefone)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
    `;
        const values = [cnpj, categoria, name, cep, rua, bairro, numero, cidade, estado, telefone];
        const result = await client.query(query, values);
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Erro ao criar estabelecimento:', err);
        res.status(500).send('Erro ao criar estabelecimento');
    }
};

exports.getEstabelecimentos = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM estabelecimentos');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar estabelecimentos:', err);
        res.status(500).send('Erro ao listar estabelecimentos');
    }
};

// Funções para outras rotas (get, update, delete) podem ser adicionadas aqui
