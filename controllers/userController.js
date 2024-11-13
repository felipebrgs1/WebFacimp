const { client } = require('../utils/db');

exports.createUser = async (req, res) => {
    const { name, forname, username, email, password } = req.body;
    try {
        const query = `
      INSERT INTO "user" (name, forname, username, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
        const values = [name, forname, username, email, password];
        const result = await client.query(query, values);
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Erro ao criar usuário:', err);
        res.status(500).send('Erro ao criar usuário');
    }
};

exports.getUsers = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM "user"');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar usuários:', err);
        res.status(500).send('Erro ao listar usuários');
    }
};
