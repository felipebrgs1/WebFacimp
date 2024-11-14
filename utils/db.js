const http = require("http");
const { neon } = require("@neondatabase/serverless");
require('dotenv').config();

const sql = neon(process.env.DATABASE_URL); // Usa a função neon para criar a conexão com o banco

const requestHandler = async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        const version = result[0]?.version || 'Versão não encontrada';
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(version);
    } catch (error) {
        console.error("Erro na requisição:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Erro ao obter versão do banco de dados.");
    }
};

http.createServer(requestHandler).listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});


module.exports = { sql };