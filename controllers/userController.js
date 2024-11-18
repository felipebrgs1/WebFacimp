const bcrypt = require("bcrypt");
const { sql } = require('../utils/db');


exports.createUserFisico = async (req, res) => {
    const { firstName, lastName, username, email, password, confirmPassword } = req.body;

    try {
        // Valida entrada
        if (!firstName || !lastName || !username || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "As senhas não coincidem." });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insere no banco
        await sql`
            INSERT INTO userfisico (first_Name, last_Name, username, email, password)
            VALUES (${firstName}, ${lastName}, ${username}, ${email}, ${hashedPassword})
        `;

        res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro ao registrar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};


exports.loginUser = async (req, res) => {
    const { email, senha } = req.body;

    try {
        // Valida entrada
        if (!email || !senha) {
            return res.status(400).json({ message: "Email e senha são obrigatórios." });
        }

        // Busca usuário no banco
        const result = await sql`SELECT password FROM userFisico WHERE email = ${email}`;
        if (result.length === 0) {
            return res.status(401).json({ message: "Usuário não encontrado." });
        }

        const hashedPassword = result[0].password;

        // Compara senha
        const isMatch = await bcrypt.compare(senha, hashedPassword);
        if (!isMatch) {
            return res.status(401).json({ message: "Credenciais inválidas." });
        }

        // Login bem-sucedido
        res.status(200).json({ message: "Login bem-sucedido!" });
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
};