import { Deck } from '../common/types/Deck';

const express = require('express');
const pool = require('./db');

const app = express();

module.exports = app.get('/getdeck/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing deck ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM decks WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.get('/getlist', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM decks');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.post('/adddeck', async (req, res) => {
  const deck: Deck = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO decks (name) VALUES ($1) RETURNING *',
      [deck.name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.post('/updatedeck', async (req, res) => {
  const deck: Deck = req.body;
  if (!deck.id) {
    return res.status(400).json({ error: 'Missing deck ID' });
  }

  try {
    const result = await pool.query(
      'UPDATE decks SET name = $1 WHERE id = $2 RETURNING *',
      [deck.name, deck.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.delete('/deletedeck/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing deck ID' });
  }

  try {
    const result = await pool.query('DELETE FROM decks WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Deck not found' });
    }
    res.json({ message: 'Deck deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});