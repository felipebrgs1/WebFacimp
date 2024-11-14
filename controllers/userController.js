// controllers/userFisicoController.js
const { sql } = require('../utils/db');

exports.createUserFisico = async (req, res) => {
    const { cpf, cargo, name, cep, rua, bairro, numero, cidade, estado, telefone } = req.body;
    try {
        const result = await sql`
            INSERT INTO userFisico (cpf, cargo, name, cep, rua, bairro, numero, cidade, estado, telefone)
            VALUES (${cpf}, ${cargo}, ${name}, ${cep}, ${rua}, ${bairro}, ${numero}, ${cidade}, ${estado}, ${telefone})
            RETURNING id
        `;
        res.status(201).json({ id: result[0].id });
    } catch (err) {
        console.error('Erro ao criar usuário físico:', err);
        res.status(500).send('Erro ao criar usuário físico');
    }
};

exports.getUsersFisico = async (req, res) => {
    try {
        const result = await sql`SELECT * FROM userFisico`;
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao listar usuários físicos:', err);
        res.status(500).send('Erro ao listar usuários físicos');
    }
};