
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM carros ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar carros' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, modelo, marca, valor_hora } = req.body;
    const [result] = await db.query(
      'INSERT INTO carros (nome, modelo, marca, valor_hora) VALUES (?,?,?,?)',
      [nome, modelo, marca, valor_hora]
    );
    res.status(201).json({ id: result.insertId, nome, modelo, marca, valor_hora });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar carro' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, modelo, marca, valor_hora } = req.body;
    await db.query(
      'UPDATE carros SET nome=?, modelo=?, marca=?, valor_hora=? WHERE id=?',
      [nome, modelo, marca, valor_hora, id]
    );
    res.json({ id: Number(id), nome, modelo, marca, valor_hora });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar carro' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM carros WHERE id=?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar carro' });
  }
});

module.exports = router;
