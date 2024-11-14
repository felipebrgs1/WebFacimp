const { neon } = require("@neondatabase/serverless");
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL);

const handler = async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        const version = result[0]?.version || 'Versão não encontrada';
        res.status(200).send(version);
    } catch (error) {
        console.error("Erro na requisição:", error);
        res.status(500).send("Erro ao obter versão do banco de dados.");
    }
};

module.exports = { sql, handler };
