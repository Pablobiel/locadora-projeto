
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM aluguel ORDER BY id_aluguel DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar aluguéis' });
  }
});

router.post('/', async (req, res) => {
  const conn = await db.getConnection();
  try {
    const { id_cliente, id_funcionario, id_carro, horas } = req.body;
    await conn.beginTransaction();

    const [[cliente]] = await conn.query('SELECT id, nome FROM clientes WHERE id=?', [id_cliente]);
    const [[funcionario]] = await conn.query('SELECT id, nome FROM funcionarios WHERE id=?', [id_funcionario]);
    const [[carro]] = await conn.query('SELECT id, nome, valor_hora FROM carros WHERE id=?', [id_carro]);

    if (!cliente || !funcionario || !carro) {
      throw new Error('IDs inválidos de cliente/funcionário/carro');
    }

    const valor_hora_total = Number(horas) * Number(carro.valor_hora);

    const [result] = await conn.query(
      `INSERT INTO aluguel (id_cliente, nome_cliente, id_funcionario, nome_funcionario, id_carro, nome_carro, horas, valor_hora_total)
       VALUES (?,?,?,?,?,?,?,?)`,
      [cliente.id, cliente.nome, funcionario.id, funcionario.nome, carro.id, carro.nome, horas, valor_hora_total]
    );

    await conn.commit();
    res.status(201).json({
      id_aluguel: result.insertId,
      id_cliente: cliente.id,
      nome_cliente: cliente.nome,
      id_funcionario: funcionario.id,
      nome_funcionario: funcionario.nome,
      id_carro: carro.id,
      nome_carro: carro.nome,
      horas,
      valor_hora_total
    });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(400).json({ error: err.message || 'Erro ao criar aluguel' });
  } finally {
    conn.release();
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM aluguel WHERE id_aluguel=?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar aluguel' });
  }
});

module.exports = router;
