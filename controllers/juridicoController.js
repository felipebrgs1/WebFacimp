const { sql } = require('../utils/db');

exports.cadastroUserJuridico = async (req, res) => {
    const { nome, cnpj, categoria, cep, rua, bairro, numero, semnumero, complemento, cidade, estado, telefone } = req.body;

    try {
        // Verificando se todos os campos obrigatórios estão presentes
        if (!nome || !cnpj || !categoria || !cep || !rua || !bairro || !numero || !cidade || !estado || !telefone) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        // Verificando se o campo `numero` está vazio e se o campo `semnumero` deve ser verdadeiro
        const semnumero = !numero || numero.trim() === '' ? true : semnumero;

        // Inserindo os dados na tabela 'estabelecimentos'
        const result = await sql`
            INSERT INTO estabelecimentos (name, cnpj, category, cep, rua, bairro, numero, semnumero, complemento, cidade, estado, telefone)
            VALUES (${nome}, ${cnpj}, ${categoria}, ${cep}, ${rua}, ${bairro}, ${numero}, ${semnumero}, ${complemento}, ${cidade}, ${estado}, ${telefone})
        `;

        // Retornando sucesso
        res.status(201).json({ message: "usuario juridico cadastrado com sucesso!" });
    } catch (error) {
        // Tratamento de erro
        console.error("Erro ao cadastrar usuario:", error);
        res.status(500).json({ message: "Erro interno ao cadastrar usuario." });
    }
};

exports.getJuridico = async (req, res) => {
    try {
        const result = await sql`SELECT * FROM userJuridico`;
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao buscar usuario:', err);
        res.status(500).send('Erro ao buscar usuario');
    }
};
