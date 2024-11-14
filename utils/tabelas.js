const { sql } = require("./db.js");
async function createTables() {
    try {
        console.log("Conectando ao banco de dados...");

        // Criação da tabela 'estabelecimentos'
        await sql`
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
        `;
        console.log("Tabela 'estabelecimentos' criada com sucesso");

        // Criação da tabela 'products'
        await sql`
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
        `;
        console.log("Tabela 'products' criada com sucesso");

        // Criação da tabela 'userFisico'
        await sql`
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
        `;
        console.log("Tabela 'userFisico' criada com sucesso");

    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }
}

// Executa a criação das tabelas
createTables();