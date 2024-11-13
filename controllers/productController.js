const { client } = require('../utils/db');

exports.createProduct = async (req, res) => {
    const { name, category, price, stock, estabelecimento_id } = req.body;
    try {
        const query = `
      INSERT INTO products (name, category, price, stock, estabelecimento_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;
        const values = [name, category, price, stock, estabelecimento_id];
        const result = await client.query(query, values);
        res.status(201).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Erro ao criar produto:', err);
        res.status(500).send('Erro ao criar produto');
    }
};

exports.getProducts = async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Erro ao listar produtos:', err);
        res.status(500).send('Erro ao listar produtos');
    }
};
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, stock, estabelecimento_id } = req.body;
    try {
        const query = `
      UPDATE products
      SET name = $1, category = $2, price = $3, stock = $4, estabelecimento_id = $5
      WHERE id = $6
    `;
        const values = [name, category, price, stock, estabelecimento_id, id];
        await client.query(query, values);
        res.status(200).send('Produto atualizado com sucesso');
    } catch (err) {
        console.error('Erro ao atualizar produto:', err);
        res.status(500).send('Erro ao atualizar produto');
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await client.query('DELETE FROM products WHERE id = $1', [id]);
        res.status(200).send('Produto deletado com sucesso');
    } catch (err) {
        console.error('Erro ao deletar produto:', err);
        res.status(500).send('Erro ao deletar produtos');
    }
}