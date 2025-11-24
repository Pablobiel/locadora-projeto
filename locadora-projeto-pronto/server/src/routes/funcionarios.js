
const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM funcionarios ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar funcionários' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, idade, endereco, telefone, salario } = req.body;
    const [result] = await db.query(
      'INSERT INTO funcionarios (nome, idade, endereco, telefone, salario) VALUES (?,?,?,?,?)',
      [nome, idade, endereco, telefone, salario]
    );
    res.status(201).json({ id: result.insertId, nome, idade, endereco, telefone, salario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar funcionário' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, endereco, telefone, salario } = req.body;
    await db.query(
      'UPDATE funcionarios SET nome=?, idade=?, endereco=?, telefone=?, salario=? WHERE id=?',
      [nome, idade, endereco, telefone, salario, id]
    );
    res.json({ id: Number(id), nome, idade, endereco, telefone, salario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar funcionário' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM funcionarios WHERE id=?', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar funcionário' });
  }
});

module.exports = router;
