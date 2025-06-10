import { Card } from '../common/types/Card';

const express = require('express');
const pool = require('./db');

const app = express();

module.exports = app.get('/getcard/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing card ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM flashcards WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.get('/getlist', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM flashcards');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.get('/getlist/deck/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing deck ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM flashcards WHERE deck = $1', [id]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});
 
module.exports = app.post('/addcard', async (req, res) => {
  const card: Card = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO flashcards (question, answer, deck) VALUES ($1, $2, $3) RETURNING *',
      [card.question, card.answer, card.deck]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.post('/updatecard', async (req, res) => {
  const card: Card = req.body;
  if (!card.id) {
    return res.status(400).json({ error: 'Missing card ID' });
  }

  try {
    const result = await pool.query(
      'UPDATE flashcards SET question = $1, answer = $2, deck = $3 WHERE id = $4 RETURNING *',
      [card.question, card.answer, card.deck, card.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = app.delete('/deletecard/:id', async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: 'Missing card ID' });
  }

  try {
    const result = await pool.query(
      'DELETE FROM flashcards WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Card not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});