
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clientes ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar clientes' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, idade, cnh, endereco, telefone } = req.body;
    const [result] = await db.query(
      'INSERT INTO clientes (nome, idade, cnh, endereco, telefone) VALUES (?,?,?,?,?)',
      [nome, idade, cnh, endereco, telefone]
    );
    res.status(201).json({ id: result.insertId, nome, idade, cnh, endereco, telefone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, cnh, endereco, telefone } = req.body;
    await db.query(
      'UPDATE clientes SET nome=?, idade=?, cnh=?, endereco=?, telefone=? WHERE id=?',
      [nome, idade, cnh, endereco, telefone, id]
    );
    res.json({ id: Number(id), nome, idade, cnh, endereco, telefone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar cliente' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM clientes WHERE id=?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar cliente' });
  }
});

module.exports = router;
