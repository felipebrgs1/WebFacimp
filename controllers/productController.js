const { sql } = require('../utils/db');



exports.createProduct = async (req, res) => {
    const { name, category, price, stock, estabelecimento_id } = req.body;
    try {
        const result = await sql`
            INSERT INTO products (name, category, price, stock, estabelecimento_id)
            VALUES (${name}, ${category}, ${price}, ${stock}, ${estabelecimento_id})
            RETURNING id
        `;
        res.status(201).json({ id: result[0].id });
    } catch (err) {
        console.error('Erro ao criar produto:', err);
        res.status(500).send('Erro ao criar produto');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const result = await sql`SELECT * FROM products`;
        res.status(200).json(result);
    } catch (err) {
        console.error('Erro ao buscar produtos:', err);
        res.status(500).send('Erro ao buscar produtos');
    }
};

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock, estabelecimento_id } = req.body;
    try {
        await sql`
            UPDATE products
            SET name = ${name}, category = ${category}, price = ${price}, stock = ${stock}, estabelecimento_id = ${estabelecimento_id}
            WHERE id = ${id}
        `;
        res.status(200).send('Produto atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
    }
};

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await sql`DELETE FROM products WHERE id = ${id}`;
        res.status(200).send('Produto deletado com sucesso');
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).send('Erro ao deletar produto');
    }
};
exports.productbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await sql`SELECT * FROM products WHERE estabelecimento_id = ${id}`;
        if (result.length === 0) {
            return res.status(404).send('Produto nao encontrado');
        }
        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Erro ao buscar produto:', err);
        res.status(500).send('Erro ao buscar produto');
    }
};