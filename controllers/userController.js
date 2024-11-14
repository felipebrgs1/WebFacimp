const { sql } = require('../utils/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
exports.createUserFisico = async (req, res) => {
    const { cpf, cargo, email, name, password, cep, rua, bairro, numero, cidade, estado, telefone } = req.body;

    // Validação da senha
    if (password.length < 8) {
        return res.status(400).send('A senha deve ter pelo menos 8 caracteres');
    }

    try {
        // Criptografando a senha
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await sql`
            INSERT INTO userFisico (cpf, cargo,email, name, password, cep, rua, bairro, numero, cidade, estado, telefone)
            VALUES (${cpf}, ${cargo},${email}, ${name}, ${hashedPassword}, ${cep}, ${rua}, ${bairro}, ${numero}, ${cidade}, ${estado}, ${telefone})
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



exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await sql`
            SELECT * FROM userFisico WHERE email = ${email}
        `;

        if (result.length === 0) {
            return res.status(400).send('Usuário não encontrado');
        }

        const user = result[0];

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).send('Senha incorreta');
        }

        // Gerar token JWT
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (err) {
        console.error('Erro ao autenticar usuário:', err);
        res.status(500).send('Erro ao autenticar usuário');
    }
};