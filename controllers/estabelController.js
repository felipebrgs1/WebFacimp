const { sql } = require('../utils/db');

exports.cadastrarComercio = async (req, res) => {
    const { nome, cnpj, categoria, cep, rua, bairro, numero, semnumero, complemento, cidade, estado, telefone } = req.body;

    try {
        if (!nome || !cnpj || !categoria || !cep || !rua || !bairro || !numero || !cidade || !estado || !telefone) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const result = await sql`
            INSERT INTO estabelecimentos (name, cnpj, category, cep, rua, bairro, numero,semnumero ,complemento, cidade, estado, telefone)
            VALUES (${nome}, ${cnpj}, ${categoria}, ${cep}, ${rua}, ${bairro}, ${numero}, ${semnumero},${complemento}, ${cidade}, ${estado}, ${telefone})
        `;

        res.status(201).json({ message: "Comércio cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao cadastrar comércio:", error);
        res.status(500).json({ message: "Erro interno ao cadastrar comércio." });
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