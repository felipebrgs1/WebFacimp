const { Client } = require('pg'); // Usando client em vez de Client diretamente
const env = require('dotenv').config();
// Criação do client de conexões usando variáveis de ambiente
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

client.connect();
async function createTables() {
    try {

        console.log("Conectado ao banco de dados");

        // Criação da tabela 'estabelecimentos' primeiro
        await client.query(`
            CREATE TABLE IF NOT EXISTS estabelecimentos (
                id SERIAL PRIMARY KEY,
                cnpj CHAR(14) UNIQUE NOT NULL CHECK (cnpj ~ '^[0-9]{14}$'),
                categoria VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                cep CHAR(8) CHECK (cep ~ '^[0-9]{8}$'),
                rua VARCHAR(255) NOT NULL,
                bairro VARCHAR(255) NOT NULL,
                numero CHAR(5) CHECK (numero ~ '^[0-9]{5}$'),
                semnumero BOOLEAN DEFAULT false,
                complemento VARCHAR(255),
                cidade VARCHAR(255) NOT NULL,
                estado CHAR(2) CHECK (estado ~ '^[A-Z]{2}$'),
                telefone CHAR(11) CHECK (telefone ~ '^[0-9]{11}$'),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Tabela 'estabelecimentos' criada com sucesso");

        // Criação da tabela 'products'
        await client.query(`
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                category VARCHAR(255) NOT NULL,
                price NUMERIC(10, 2) NOT NULL,
                stock INT DEFAULT 0,
                estabelecimento_id INT REFERENCES estabelecimentos(id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Tabela 'products' criada com sucesso");

        // Criação da tabela 'userFisico'
        await client.query(`
            CREATE TABLE IF NOT EXISTS userFisico (
                id SERIAL PRIMARY KEY,
                cpf CHAR(11) UNIQUE NOT NULL CHECK (cpf ~ '^[0-9]{11}$'),
                cargo VARCHAR(255) NOT NULL,
                name VARCHAR(255) NOT NULL,
                cep CHAR(8) CHECK (cep ~ '^[0-9]{8}$'),
                rua VARCHAR(255) NOT NULL,
                bairro VARCHAR(255) NOT NULL,
                numero CHAR(5) CHECK (numero ~ '^[0-9]{5}$'),
                semnumero BOOLEAN DEFAULT false,
                complemento VARCHAR(255),
                cidade VARCHAR(255) NOT NULL,
                estado CHAR(2) CHECK (estado ~ '^[A-Z]{2}$'),
                telefone CHAR(11) CHECK (telefone ~ '^[0-9]{11}$'),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);
        console.log("Tabela 'userFisico' criada com sucesso");

        // Criação da tabela 'user' (com aspas duplas para evitar conflito de palavra reservada)
        await client.query(`
            CREATE TABLE IF NOT EXISTS "user" (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                forname VARCHAR(255) NOT NULL,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
            CREATE INDEX IF NOT EXISTS idx_user_email ON "user" (email);
        `);
        console.log("Tabela 'user' criada com sucesso e índice 'idx_user_email' criado");

    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }
}

// Executa a criação das tabelas
createTables();
module.exports = { client };
