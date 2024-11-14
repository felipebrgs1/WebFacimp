const { sql } = require('../utils/db');

exports.createEstabelecimento = async (req, res) => {
    const { cnpj, categoria, name, cep, rua, bairro, numero, cidade, estado, telefone } = req.body;
    try {
        const result = await sql`
            INSERT INTO estabelecimentos (cnpj, categoria, name, cep, rua, bairro, numero, cidade, estado, telefone)
            VALUES (${cnpj}, ${categoria}, ${name}, ${cep}, ${rua}, ${bairro}, ${numero}, ${cidade}, ${estado}, ${telefone})
            RETURNING id
        `;
        res.status(201).json({ id: result[0].id });
    } catch (err) {
        console.error('Erro ao criar estabelecimento:', err);
        res.status(500).send('Erro ao criar estabelecimento');
    }
};

exports.getEstabelecimentos = async (req, res) => {
    try {
        const result = await sql`SELECT * FROM estabelecimentos`;
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao listar estabelecimentos:', err);
        res.status(500).send('Erro ao listar estabelecimentos');
    }
};
exports.getEstabelecimentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql`SELECT * FROM estabelecimentos WHERE id = ${id}`;

        if (result.length === 0) {
            return res.status(404).send('Estabelecimento não encontrado');
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar estabelecimento:', err);
        res.status(500).send('Erro ao buscar estabelecimento');
    }
};