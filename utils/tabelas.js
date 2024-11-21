const { sql } = require("./db.js");
async function createTables() {
    try {
        console.log("Conectando ao banco de dados...");

        // Criação da tabela 'estabelecimentos'
        await sql`
            CREATE TABLE IF NOT EXISTS estabelecimentos (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                cnpj CHAR(14) NOT NULL CHECK (cnpj ~ '^[0-9]{14}$'),
                category VARCHAR(255) NOT NULL,
                cep CHAR(9) CHECK (cep ~ '^[0-9]{5}-?[0-9]{3}$'),
                rua VARCHAR(255) NOT NULL,
                bairro VARCHAR(255) NOT NULL,
                numero CHAR(5) , 
                semnumero BOOLEAN DEFAULT false,
                complemento VARCHAR(255),
                cidade VARCHAR(255) NOT NULL,
                estado CHAR(2) CHECK (estado ~ '^[a-zA-Z]{2}$'),
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
                first_name VARCHAR(50) NOT NULL,        
                last_name VARCHAR(50) NOT NULL,        
                username VARCHAR(50) NOT NULL UNIQUE,  
                email VARCHAR(100) NOT NULL UNIQUE,    
                password TEXT NOT NULL,       
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `;
        console.log("Tabela 'userFisico' criada com sucesso");

        // Criação da tabela 'userJuridico'
        await sql`
            CREATE TABLE IF NOT EXISTS userJuridico (
            id SERIAL PRIMARY KEY,  -- Chave primária auto-incrementada
            nome_comercio VARCHAR(255) NOT NULL,
            cnpj CHAR(14) UNIQUE NOT NULL CHECK (cnpj ~ '^[0-9]{14}$'),
            cargo VARCHAR(100) NOT NULL,
            cep VARCHAR(10),
            rua VARCHAR(255),
            bairro VARCHAR(255),
            numero VARCHAR(5),
            complemento VARCHAR(255),
            cidade VARCHAR(255),
            estado VARCHAR(100),
            telefone VARCHAR(20),
            sem_numero BOOLEAN DEFAULT FALSE
        );  
        `;
        console.log("Tabela 'userJuridico' criada com sucesso");

    } catch (error) {
        console.error("Erro ao criar tabelas:", error);
    }

}

// Executa a criação das tabelas
createTables();