const { client } = require('./utils/db');

// Função para testar o banco de dados
async function testarBanco() {
    try {
        // Fazendo a consulta assíncrona ao banco de dados
        const result = await client.query('SELECT * FROM estabelecimentos');

        // Exibindo o resultado
        console.log(result.rows);
    } catch (error) {
        // Tratamento de erro caso a consulta falhe
        console.error('Erro ao consultar o banco de dados:', error);
    } finally {
        // Fechando a conexão com o banco de dados
        await client.end();
    }
}

// Chama a função de teste
testarBanco();
