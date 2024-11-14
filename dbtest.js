const { sql } = require('./utils/db.js');  // Conectando ao Neon DB
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
async function testDatabase() {
    try {
        // 1. Criando a tabela, caso não exista
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

        console.log('Tabela "estabelecimentos" criada ou já existente.');

        // 2. Inserindo dados de exemplo
        const cnpj = '12345675000195'; // CNPJ válido
        const categoria = 'Comércio';
        const name = 'Loja Exemplo';
        const cep = '12345678';
        const rua = 'Rua Exemplo';
        const bairro = 'Bairro Exemplo';
        const numero = '12345';
        const cidade = 'Cidade Exemplo';
        const estado = 'SP';
        const telefone = '11987652321';

        await sql`
            INSERT INTO estabelecimentos (cnpj, categoria, name, cep, rua, bairro, numero, cidade, estado, telefone)
            VALUES (${cnpj}, ${categoria}, ${name}, ${cep}, ${rua}, ${bairro}, ${numero}, ${cidade}, ${estado}, ${telefone})
            RETURNING id;
        `;

        console.log('Dados inseridos com sucesso!');

        // 3. Consultando dados para verificar a inserção
        const result = await sql`SELECT * FROM estabelecimentos`;

        console.log('Dados inseridos na tabela "estabelecimentos":');
        console.log(result.rows);  // Exibe os dados inseridos

    } catch (err) {
        console.error('Erro ao executar operações no banco de dados:', err);
    } finally {
        await process.exit();
    }
}


const fetchPost = async () => {
    const post = await sql`SELECT * FROM estabelecimentos`;
    console.log(post);
}

fetchPost().then(() => process.exit());
